from openpyxl import Workbook
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pathlib import Path
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
    stmt = select(Mkd.id,
                  Mkd.name,
                  table.unom,
                  table.works_list,
                  table.num_works).join(Mkd, Mkd.unom == table.unom).order_by(table.num_works.desc())
    labels = ("ID", "Адрес", "UNOM", "Список работ", "Кол-во работ")

    result = await session.execute(stmt)
    result = result.all()
    wb = Workbook()
    ws = wb.active
    ws.append(labels)

    for res in result:
        ws.append((res.id, res.name, res.unom, '\n'.join(res.works_list), res.num_works))
    path = Path(f"/app/backend/app/static/{model.value}_predict.xlsx")
    wb.save(path)
    return path
