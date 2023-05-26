from openpyxl import Workbook
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.db.session import PredictResult
from pathlib import Path


async def create_excel(session: AsyncSession) -> Path:
    """
    Create Excel document for downloading
    """
    stmt = select(PredictResult.id,
                  PredictResult.name,
                  PredictResult.unom,
                  PredictResult.predicted_num)
    result = await session.execute(stmt)
    result = result.all()
    wb = Workbook()
    ws = wb.active
    labels = ("ID", "Name", "unom", "predicted_num")
    ws.append(labels)
    [ws.append(tuple(row)) for row in result]
    path = Path("/app/backend/app/static/DocPredict.xlsx")
    wb.save(path)
    return path
