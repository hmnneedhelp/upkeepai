import asyncio
import pandas as pd
from pathlib import Path
from datetime import datetime
from pandas.core.frame import DataFrame
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import insert
from src.db.session import Incident, Overhaul
from sqlalchemy.exc import IntegrityError

expected_incident_titles = ['Наименование', 'Источник', 'Дата создания во внешней системе', 'Дата закрытия', 'Округ', 'Адрес', 'unom', 'Дата и время завершения события во']
expected_cap_works_titles = ['global_id', 'PERIOD', 'WORK_NAME', 'NUM_ENTRANCE', 'ElevatorNumber', 'PLAN_DATE_START', 'PLAN_DATE_END', 'FACT_DATE_START', 'FACT_DATE_END', 'AdmArea', 'District', 'Address', 'UNOM']


async def fill_db(path: Path, session: AsyncSession):
    file = pd.ExcelFile(path)
    sheet = file.sheet_names[0]
    df: DataFrame = file.parse(sheet)
    titles = list(df)
    if len(titles) == 8 and titles == expected_incident_titles:
        await fill_incidents(df=df, session=session)
    elif len(titles) == 13 and titles == expected_cap_works_titles:
        await fill_overhaul(df=df, session=session)
    else:
        raise ValueError


async def fill_incidents(df: DataFrame, session: AsyncSession):
    for value in df.values:
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
            # await session.commit()
        except IntegrityError:
            await session.rollback()
        except Exception:
            await session.rollback()
            raise Exception
        await asyncio.sleep(0.001)


async def fill_overhaul(df: DataFrame, session: AsyncSession):
    for value in df.values:
        await session.execute(
            insert(Overhaul).values(
                id=value[0],
                period=value[1],
                name=value[2],
                num_entrance=int(value[3]) if not pd.isnull(value[3]) else None,
                elev_num=str(value[4]) if not pd.isnull(value[4]) else None,
                plan_start=datetime.strptime(value[5], "%d.%m.%Y"),
                plan_end=datetime.strptime(value[6], "%d.%m.%Y"),
                fact_start=datetime.strptime(value[7], "%d.%m.%Y"),
                fact_end=datetime.strptime(value[8], "%d.%m.%Y"),
                unom=value[12],
            ),
        )
    try:
        ...
        # await session.commit()
    except IntegrityError:
        await session.rollback()
