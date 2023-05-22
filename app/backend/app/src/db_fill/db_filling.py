import pandas as pd
import numpy as np
from pandas.core.frame import DataFrame
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import insert, select
from src.db.session import (
    RoofingMaterial,
    SeriesOfProjects,
    WallMaterial,
    AccidentRate,
    RoofCleaning,
    HousingStock,
    MkdStatus,
    MkdManagementStatus,
    MkdCategory,
    Mkd,
)

file = pd.ExcelFile("/app/backend/app/src/db_fill/mkd.xlsx")
print(file.sheet_names)


async def fill_COL_781(session: AsyncSession):
    a: DataFrame = file.parse("COL_781")
    print(a.values[0])
    for value in a.values[1:]:
        print(value[0], value[1])
        await session.execute(
            insert(RoofingMaterial).values(id=value[0], name=value[1])
        )
    await session.commit()


async def fill_COL_758(session: AsyncSession):
    a: DataFrame = file.parse("COL_758")
    print(a.values[0])
    for value in a.values[1:]:
        print(value[0], value[1])
        await session.execute(
            insert(SeriesOfProjects).values(id=value[0], name=value[1])
        )
    await session.commit()


async def fill_COL_769(session: AsyncSession):
    a: DataFrame = file.parse("COL_769")
    print(a.values[0])
    for value in a.values[1:]:
        print(value[0], value[1])
        await session.execute(insert(WallMaterial).values(id=value[0], name=value[1]))
    await session.commit()


async def fill_COL_770(session: AsyncSession):
    a: DataFrame = file.parse("COL_770")
    print(a.values[0])
    for value in a.values[1:]:
        print(value[0], value[1])
        await session.execute(insert(AccidentRate).values(id=value[0], name=value[1]))
    await session.commit()


async def fill_COL_775(session: AsyncSession):
    a: DataFrame = file.parse("COL_775")
    print(a.values[0])
    for value in a.values[1:]:
        print(value[0], value[1])
        await session.execute(insert(RoofCleaning).values(id=value[0], name=value[1]))
    await session.commit()


async def fill_COL_2463(session: AsyncSession):
    a: DataFrame = file.parse("COL_2463")
    print(a.values[0])
    for value in a.values[1:]:
        print(value[0], value[1])
        await session.execute(insert(HousingStock).values(id=value[0], name=value[1]))
    await session.commit()


async def fill_COL_3163(session: AsyncSession):
    a: DataFrame = file.parse("COL_3163")
    print(a.values[0])
    for value in a.values[1:]:
        print(value[0], value[1])
        await session.execute(insert(MkdStatus).values(id=value[0], name=value[1]))
    await session.commit()


async def fill_COL_3243(session: AsyncSession):
    a: DataFrame = file.parse("COL_3243")
    print(a.values[0])
    for value in a.values[1:]:
        print(value[0], value[1])
        await session.execute(
            insert(MkdManagementStatus).values(id=value[0], name=value[1])
        )
    await session.commit()


async def fill_COL_103506(session: AsyncSession):
    a: DataFrame = file.parse("COL_103506")
    print(a.values[0])
    for value in a.values[1:]:
        print(value[0], value[1])
        await session.execute(insert(MkdCategory).values(id=value[0], name=value[1]))
    await session.commit()


async def fill_main_column(session: AsyncSession):
    a: DataFrame = file.parse("Sheet1")
    # print(type(a.values[2]))
    for value in a.values[1:2]:
        print(value[1], value[2])
        await session.execute(
            insert(Mkd).values(
                id=value[0] if not pd.isnull(value[0]) else None,
                name=value[1] if not pd.isnull(value[1]) else None,
                parent_id=value[2] if not pd.isnull(value[2]) else None,
                login=value[3] if not pd.isnull(value[3]) else None,
                # форма собственности
                form_of_ownership=value[5] if not pd.isnull(value[5]) else None,
                year_built=int(value[6]) if not pd.isnull(value[6]) else None,
                year_reconstructed=int(value[7]) if not pd.isnull(value[7]) else None,
                series_of_project_id=int(value[8]) if not pd.isnull(value[8]) else None,
                num_floors=int(value[9]) if not pd.isnull(value[9]) else None,
                num_entrances=int(value[10]) if not pd.isnull(value[10]) else None,
                num_apartments=int(value[11]) if not pd.isnull(value[11]) else None,
                total_area=float(value[12]) if not pd.isnull(value[12]) else None,
                living_area=float(value[13]) if not pd.isnull(value[13]) else None,
                non_living_area=float(value[14]) if not pd.isnull(value[14]) else None,
                building_volume=int(value[15]) if not pd.isnull(value[15]) else None,
                wear_and_tear=int(value[16]) if not pd.isnull(value[16]) else None,
                energy_efficiency=value[17] if not pd.isnull(value[17]) else None,
                wall_material_id=int(value[18]) if not pd.isnull(value[18]) else None,
                accident_rate_id=int(value[19]) if not pd.isnull(value[19]) else None,
                num_passenger_elevators=int(value[20])
                if not pd.isnull(value[20])
                else None,
                num_freight_passenger_elevators=int(value[21])
                if not pd.isnull(value[21])
                else None,
                roof_cleaning_id=int(value[22]) if not pd.isnull(value[22]) else None,
                roofing_material_id=int(value[23])
                if not pd.isnull(value[23])
                else None,
                unom=int(value[24]) if not pd.isnull(value[24]) else None,
                # Вид социального объекта
                housing_stock_id=int(value[26]) if not pd.isnull(value[26]) else None,
                mkd_status_id=int(value[27]) if not pd.isnull(value[27]) else None,
                mkd_management_status_id=int(value[28])
                if not pd.isnull(value[28])
                else None,
                num_freight_elevators=int(value[29])
                if not pd.isnull(value[29])
                else None,
                reason_for_status_change=value[30]
                if not pd.isnull(value[30])
                else None,
                mkd_category_id=int(value[31]) if not pd.isnull(value[31]) else None,
            )
        )
    await session.commit()


async def test_query(session: AsyncSession):
    stmt = select(Mkd).join(MkdStatus).limit(5)
    print(stmt)
    result = await session.execute(stmt)
    result = result.scalars().all()
    # print(result.name)
    for res in result:
        print(res.name, res.mkd_status.name)


async def fill_db(session: AsyncSession):
    # await test_query(session)
    pass
    # await fill_main_column(session)
    # await fill_COL_103506(session)
    # await fill_COL_3243(session)
    # await fill_COL_3163(session)
    # await fill_COL_2463(session)
    # await fill_COL_775(session)
    # await fill_COL_770(session)
    # await fill_COL_758(session)
    # await fill_COL_769(session)
    # await fill_COL_781(session)
