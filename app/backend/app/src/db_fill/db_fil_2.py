import pandas as pd
import numpy as np
from datetime import datetime
from pandas.core.frame import DataFrame
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import insert, select, join
from src.db.session import Overhaul, Mkd

file = pd.ExcelFile("/app/backend/app/src/db_fill/overhaul.xlsx")
print(file.sheet_names)


async def fill_overhaul(session: AsyncSession):
    a: DataFrame = file.parse("Лист3")
    print(a.values[0])
    for value in a.values[0:20]:
        print(value[0], value[1])
        await session.execute(
            insert(Overhaul).values(
                id=value[0],
                period=value[1],
                name=value[2],
                num_entrance=int(value[3]) if not pd.isnull(value[3]) else None,
                elev_num=value[4] if not pd.isnull(value[4]) else None,
                plan_start=datetime.strptime(value[5], "%d.%m.%Y"),
                plan_end=datetime.strptime(value[6], "%d.%m.%Y"),
                fact_start=datetime.strptime(value[7], "%d.%m.%Y"),
                fact_end=datetime.strptime(value[8], "%d.%m.%Y"),
                unom=value[12],
            ),
        )
    await session.commit()


async def query_test(session: AsyncSession):
    stmt = select(Overhaul.name).where(Overhaul.unom == 11466)
    result = await session.execute(stmt)
    result = result.scalars().all()
    print(result)
    print("HEY")


async def fill_db(session: AsyncSession):
    await query_test(session)
    pass
