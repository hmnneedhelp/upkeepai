from src.db.session import User as UserModel
from sqlalchemy import insert, select, delete, join, outerjoin
from src.schema.objects import MKDShort, MKD, MKDDetail
from src.schema.objects import Overhaul as OverhaulSchema
from src.schema.objects import Incident as IncidentSchema
from src.schema.objects import Coordinate as CoordinateSchema
from src.db.session import *
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import parse_obj_as


async def get(limit: int, offset: int, session: AsyncSession) -> list[MKDShort]:
    stmt = select(Mkd).limit(limit).offset(offset)
    result = await session.execute(stmt)
    result = result.scalars().all()
    return parse_obj_as(list[MKDShort], result)


async def get_object_by_id(session: AsyncSession, id: int) -> MKD:
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
        .where(Mkd.id == id)
    )

    # stmt = select(Mkd.id).where(Mkd.id == id)
    mkd = await session.execute(stmt)
    mkd = mkd.fetchone()
    works = await get_overhaul_works(mkd.unom, session)
    incidents = await get_mkd_incidents(mkd.unom, session)
    coordinates = await get_mkd_coordinates(mkd.unom, session)
    M = MKD.from_orm(mkd)
    return MKDDetail(**M.dict(), overhauls=works, incidents=incidents, coordinates=coordinates)


async def get_overhaul_works(unom: int, session: AsyncSession):
    stmt = select(
        Overhaul.id,
        Overhaul.name,
        Overhaul.period,
        Overhaul.elev_num,
        Overhaul.plan_start,
        Overhaul.plan_end,
        Overhaul.fact_start,
        Overhaul.fact_end,
        Overhaul.num_entrance,
    ).where(Overhaul.unom == unom)
    works = await session.execute(stmt)
    works = works.mappings()
    result = []
    for work in works:
        result.append(OverhaulSchema.from_orm(work))
    return result


async def get_mkd_incidents(unom: int, session: AsyncSession):
    stmt = select(
        Incident.id,
        Incident.name,
        Incident.source,
        Incident.opened,
        Incident.closed,
        Incident.unom,
    ).where(Incident.unom == unom)
    incidents = await session.execute(stmt)
    incidents = incidents.mappings()
    result = []
    for incident in incidents:
        result.append(IncidentSchema.from_orm(incident))
    return result


async def get_mkd_coordinates(unom: int, session: AsyncSession):
    stmt = select(Coordinate.latitude,
                  Coordinate.longitude
                  ).where(Coordinate.unom == unom)
    coords = await session.execute(stmt)
    coords = coords.fetchone()
    if not coords:
        return None
    return CoordinateSchema.from_orm(coords)
