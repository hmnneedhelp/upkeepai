import asyncio

from fastapi import HTTPException
from sqlalchemy import select, outerjoin, insert, func
from src.schema.objects import MKDShort, MKD, MKDDetail, MKDListIncident, MKDListFeature
from src.schema.objects import UnionPredict as UnionPredictSchema
from src.schema.objects import Overhaul as OverhaulSchema
from src.schema.objects import OverhaulCreate as OverhaulCreateSchema
from src.schema.objects import IncidentCreate as IncidentCreateSchema
from src.schema.objects import Incident as IncidentSchema
from src.schema.objects import Coordinate as CoordinateSchema
from src.schema.objects import Predict, PredictShort


from src.schema.models import PredictionModels
from src.db.session import *
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import DatabaseError
from pydantic import parse_obj_as


async def get_list(
    model: PredictionModels, limit: int, offset: int, session: AsyncSession
) -> list[MKDListIncident] | list[MKDListFeature] | list[UnionPredictSchema]:
    if model.value == "incident":
        table = IncidentPredict
        stmt = (
            select(Mkd.id,
                   Mkd.name,
                   table.unom,
                   Mkd.year_built,
                   Mkd.num_apartments,
                   func.count(Incident.id).label("incidents"),
                   table.num_works.label("overhauls"))
            .join(Mkd, Mkd.unom == table.unom)
            .join(Incident, Mkd.unom == Incident.unom)
            .group_by(Mkd.id, Mkd.name, table.unom, Mkd.year_built, Mkd.num_apartments, table.num_works)
            .limit(limit)
            .offset(offset)
            .order_by(table.num_works.desc())
        )
        result = await session.execute(stmt)
        result = result.all()
        return [MKDListIncident.from_orm(res) for res in result][1:]
    elif model.value == "feature":
        table = FeaturePredict
        stmt = (
            select(Mkd.id,
                   Mkd.name,
                   Mkd.year_built,
                   Mkd.num_apartments,
                   Mkd.num_floors,
                   Mkd.num_entrances,
                   Mkd.num_apartments,
                   Mkd.num_passenger_elevators,
                   SeriesOfProjects.name.label("series_of_project"),
                   WallMaterial.name.label("wall_material"),
                   RoofingMaterial.name.label("roofing_material"),
                   HousingStock.name.label("housing_stock"),
                   MkdStatus.name.label("mkd_status"),
                   table.num_works.label("overhauls"))
            # .join(FeaturePredict, Mkd.unom == FeaturePredict.unom)
            .outerjoin(SeriesOfProjects)
            .outerjoin(WallMaterial)
            .outerjoin(HousingStock)
            .outerjoin(MkdStatus)
            .limit(limit)
            .offset(offset)
            .order_by(table.num_works.desc())
        )
        result = await session.execute(stmt)
        result = result.all()
        return [MKDListFeature.from_orm(res) for res in result]
    elif model.value == "union":
        stmt = (
            select(UnionPredict.works_list,
                   UnionPredict.num_works,
                   UnionPredict.unom,
                   Mkd.name.label("name")
        ).join(Mkd, Mkd.unom == UnionPredict.unom)).order_by(UnionPredict.num_works.desc())
        result = await session.execute(stmt)
        result = result.all()
        return [UnionPredictSchema.from_orm(res) for res in result]


async def get(
    model: PredictionModels, limit: int, offset: int, session: AsyncSession
) -> list[Predict]:
    if model.value == "incident":
        table = IncidentPredict
    else:
        table = FeaturePredict
    stmt = (
        select(Mkd.id, Mkd.name, table.unom, table.num_works, table.works_list)
        .join(Mkd, Mkd.unom == table.unom)
        .limit(limit)
        .offset(offset)
        .order_by(table.num_works.desc())
    )
    result = await session.execute(stmt)
    result = result.all()
    return [Predict.from_orm(res) for res in result]


async def get_object_by_id(
    model: PredictionModels, session: AsyncSession, id: int
) -> MKDDetail:
    unom = await get_unom_by_id(id=id, session=session)
    if not unom:
        raise HTTPException(status_code=404, detail=f"Object with id={id} not exists")
    result = await asyncio.gather(
        *[
            get_object_by_unom(unom, session),
            get_overhaul_works(unom, session),
            get_mkd_incidents(unom, session),
            get_mkd_coordinates(unom, session),
            get_predicted_works(unom, model, session),
        ]
    )
    mkd, works, incidents, coordinates, predict = result
    return MKDDetail(
        mkd=mkd,
        overhauls=works,
        incidents=incidents,
        coordinates=coordinates,
        predict=predict,
    )


async def get_object_by_unom(unom: int, session: AsyncSession):
    stmt = (
        select(
            Mkd.id,
            Mkd.name,
            Mkd.living_area,
            Mkd.parent_id,
            Mkd.login,
            Mkd.form_of_ownership,
            Mkd.year_built,
            Mkd.year_reconstructed,
            Mkd.num_floors,
            Mkd.num_entrances,
            Mkd.num_apartments,
            Mkd.total_area,
            Mkd.non_living_area,
            Mkd.building_volume,
            Mkd.wear_and_tear,
            Mkd.energy_efficiency,
            Mkd.num_passenger_elevators,
            Mkd.num_freight_passenger_elevators,
            Mkd.unom,
            Mkd.num_freight_elevators,
            Mkd.reason_for_status_change,
            SeriesOfProjects.name.label("series_of_project"),
            WallMaterial.name.label("wall_material"),
            AccidentRate.name.label("accident_rate"),
            RoofCleaning.name.label("roof_cleaning"),
            RoofingMaterial.name.label("roofing_material"),
            HousingStock.name.label("housing_stock"),
            MkdStatus.name.label("mkd_status"),
            MkdManagementStatus.name.label("mkd_management_status"),
            MkdCategory.name.label("mkd_category"),
        )
        .select_from(outerjoin(Mkd, SeriesOfProjects))
        .outerjoin(WallMaterial)
        .outerjoin(AccidentRate)
        .outerjoin(RoofCleaning)
        .outerjoin(RoofingMaterial)
        .outerjoin(HousingStock)
        .outerjoin(MkdStatus)
        .outerjoin(MkdManagementStatus)
        .outerjoin(MkdCategory)
        .where(Mkd.unom == unom)
    )
    mkd = await session.execute(stmt)
    mkd = mkd.fetchone()
    return MKD.from_orm(mkd)


async def get_unom_by_id(id: int, session: AsyncSession) -> int:
    unom = await session.execute(select(Mkd.unom).where(Mkd.id == id))
    return unom.scalar_one_or_none()


async def get_overhaul_works(unom: int, session: AsyncSession):
    stmt = select(Overhaul).where(Overhaul.unom == unom)
    works = await session.execute(stmt)
    works = works.all()
    return [OverhaulSchema.from_orm(work[0]) for work in works]


async def get_mkd_incidents(unom: int, session: AsyncSession):
    stmt = (
        select(Incident).where(Incident.unom == unom).where(Incident.source != "ASUPR")
    )
    incidents = await session.execute(stmt)
    incidents = incidents.all()
    return [IncidentSchema.from_orm(incident[0]) for incident in incidents]


async def get_mkd_coordinates(unom: int, session: AsyncSession):
    stmt = select(Coordinate.latitude, Coordinate.longitude).where(
        Coordinate.unom == unom
    )
    coords = await session.execute(stmt)
    coords = coords.fetchone()
    if not coords:
        return None
    return CoordinateSchema.from_orm(coords)


async def get_predicted_works(
    unom: int, model: PredictionModels, session: AsyncSession
):
    if model.value == "incident":
        table = IncidentPredict
    else:
        table = FeaturePredict
    stmt = select(table.num_works, table.works_list).where(table.unom == unom)
    result = await session.execute(stmt)
    result = result.fetchone()
    if not result:
        return None
    a = PredictShort.from_orm(result)
    return a


async def get_objects_by_pattern(pattern: str, session: AsyncSession):
    name = ""
    for ch in pattern:
        if ch.isalnum():
            name += ch
        else:
            name += "%"
    stmt = select(
        Mkd.id,
        Mkd.name,
    ).where(Mkd.name.ilike(f"%{name}%")).limit(15)
    objects = await session.execute(stmt)
    objects = objects.all()
    return [MKDShort.from_orm(obj) for obj in objects]


async def insert_overhaul(work: OverhaulCreateSchema, session: AsyncSession):
    stmt = insert(Overhaul).values(period=work.period,
                                   name=work.name,
                                   num_entrance=work.num_entrance,
                                   elev_num=work.elev_num,
                                   plan_start=work.plan_start,
                                   plan_end=work.plan_end,
                                   fact_start=work.fact_start,
                                   fact_end=work.fact_end,
                                   unom=work.unom)
    try:
        result = await session.execute(stmt)
        # await session.commit()
    except DatabaseError as e:
        await session.rollback()
        raise HTTPException(status_code=500, detail=str(e))


async def insert_incident(incident: IncidentCreateSchema, session: AsyncSession):
    stmt = insert(Incident).values(id=incident.id,
                                   name=incident.name,
                                   source=incident.source,
                                   opened=incident.opened,
                                   closed=incident.closed,
                                   unom=incident.unom)
    try:
        result = await session.execute(stmt)
        # await session.commit()
    except DatabaseError as e:
        await session.rollback()
        raise HTTPException(status_code=500, detail=str(e))