from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends
from starlette import status

from src.api import deps
from src.schema.objects import OverhaulCreate, IncidentCreate
from src.crud.objects import insert_overhaul, insert_incident


router = APIRouter()


@router.post("/work")
async def add_work(work: OverhaulCreate, session: AsyncSession = Depends(deps.get_db)):
    """
    Add overhaul work
    """
    await insert_overhaul(work=work, session=session)
    return status.HTTP_201_CREATED


@router.post("/incident")
async def add_incident(incident: IncidentCreate, session: AsyncSession = Depends(deps.get_db)):
    """
    Add incident
    """
    await insert_incident(incident=incident, session=session)
    return status.HTTP_201_CREATED
