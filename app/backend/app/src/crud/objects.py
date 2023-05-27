import asyncio

from fastapi import HTTPException
from sqlalchemy import select, outerjoin
from src.schema.objects import MKDShort, MKD, MKDDetail
from src.schema.objects import Overhaul as OverhaulSchema
from src.schema.objects import Incident as IncidentSchema
from src.schema.objects import Coordinate as CoordinateSchema
from src.schema.objects import PredictResult as PredictResultSchema
from src.db.session import *
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import parse_obj_as


async def get(
    limit: int, offset: int, session: AsyncSession
) -> list[PredictResultSchema]:
    stmt = select(PredictResult).limit(limit).offset(offset)
    result = await session.execute(stmt)
    result = result.all()
    return [PredictResultSchema.from_orm(res[0]) for res in result]


async def get_object_by_id(session: AsyncSession, id: int) -> MKDDetail:
    unom = await get_unom_by_id(id=id, session=session)
    if not unom:
        raise HTTPException(status_code=404, detail=f"Object with id={id} not exists")
    result = await asyncio.gather(
        *[
            get_object_by_unom(unom, session),
            get_overhaul_works(unom, session),
            get_mkd_incidents(unom, session),
            get_mkd_coordinates(unom, session),
        ]
    )
    mkd, works, incidents, coordinates = result
    return MKDDetail(
        mkd=mkd, overhauls=works, incidents=incidents, coordinates=coordinates
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
