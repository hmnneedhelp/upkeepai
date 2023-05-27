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
        stmt = select(table.unom, table.works_list, table.num_works)
        labels = ("UNOM", "Список работ", "Кол-во работ")
    else:
        table = FeaturePredict
        stmt = select(table.id, table.name, table.unom, table.predicted_num)
        labels = ("ID", "Name", "unom", "predicted_num")

    result = await session.execute(stmt)
    result = result.all()
    wb = Workbook()
    ws = wb.active
    ws.append(labels)

    if model.value == "incident":
        for res in result:
            ws.append((res.unom, '\n'.join(res.works_list), res.num_works))
    else:
        [ws.append(tuple(row)) for row in result]
    path = Path("/app/backend/app/static/DocPredict.xlsx")
    wb.save(path)
    return path
