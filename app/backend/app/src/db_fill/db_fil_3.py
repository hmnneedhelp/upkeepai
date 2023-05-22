import time
import asyncio
import pandas as pd
import numpy as np
from datetime import datetime
from pandas.core.frame import DataFrame
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import insert, select
from src.db.session import Incident
from sqlalchemy.exc import IntegrityError

file = pd.ExcelFile("/app/backend/app/src/db_fill/incidents.xlsx")
print(file.sheet_names)


async def fill_incidents(session: AsyncSession):
    counter = 0
    a: DataFrame = file.parse("Result 2")
    print(a.values[0])
    for value in a.values[:]:
        print(value[0], value[1])

        try:
            await session.execute(
                insert(Incident).values(
                    name=value[0],
                    source=value[1],
                    opened=datetime.fromisoformat(value[2]),
                    closed=datetime.fromisoformat(value[3]),
                    unom=int(value[6]),
                ),
            )
            await session.commit()

        except Exception:
            await session.rollback()
            counter += 1
            pass
        await asyncio.sleep(0.001)
    print("COUNTER ", counter)


async def fill_db(session: AsyncSession):
    await fill_incidents(session)
    pass
