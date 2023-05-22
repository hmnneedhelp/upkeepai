from openpyxl import Workbook
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.db.session import Mkd
from pathlib import Path


async def crete_excel(session: AsyncSession) -> Path:
    stmt = select(Mkd.id, Mkd.name).limit(200).offset(0)
    result = await session.execute(stmt)
    result = result.fetchall()

    wb = Workbook()
    ws = wb.active
    new = (tuple(res) for res in result)
    data = [
        ["ID", "Name"],
    ]
    data.extend(new)
    [ws.append(row) for row in data]
    path = Path("/app/backend/app/static/DocPredict.xlsx")
    wb.save(path)
    return path
