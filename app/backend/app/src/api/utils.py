from openpyxl import Workbook, load_workbook
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pathlib import Path
from fastapi import UploadFile, HTTPException
from src.db_fill.db_fil_3 import fill_db
from src.schema.models import PredictionModels
from src.db.session import *


async def create_excel(model: PredictionModels, session: AsyncSession) -> Path:
    """
    Create Excel document for downloading
    """
    if model.value == "incident":
        table = IncidentPredict
    else:
        table = FeaturePredict
    stmt = (
        select(Mkd.id, Mkd.name, table.unom, table.works_list, table.num_works)
        .join(Mkd, Mkd.unom == table.unom)
        .order_by(table.num_works.desc())
    )
    labels = ("ID", "Адрес", "UNOM", "Список работ", "Кол-во работ")

    result = await session.execute(stmt)
    result = result.all()
    wb = Workbook()
    ws = wb.active
    ws.append(labels)

    for res in result:
        ws.append(
            (res.id, res.name, res.unom, "\n".join(res.works_list), res.num_works)
        )
    path = Path(f"/app/backend/app/static/{model.value}_predict.xlsx")
    wb.save(path)
    return path


async def parse_file(file: UploadFile, session: AsyncSession):
    file = await file.read()
    path = Path(f"/app/backend/app/static/upload.xlsx")
    try:
        with open(path, 'wb') as f:
            f.write(file)
    except IOError:
        raise HTTPException(status_code=400, detail="Writing file failed")

    try:
        await fill_db(path=path, session=session)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid columns")
    except Exception:
        raise HTTPException(status_code=400, detail="Data was not inserted")
