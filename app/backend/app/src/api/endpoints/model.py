from src.service.upkeep.feature import train_and_predict
from src.service.upkeep.incidents import predict
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends
from src.api import deps
from starlette import status

router = APIRouter()


@router.get("/property")
async def predict_prop(session: AsyncSession = Depends(deps.get_db)):
    """
    Predict based on object properties
    """
    await train_and_predict(session=session)
    return status.HTTP_200_OK


@router.get('/incident')
async def predict_inc(session: AsyncSession = Depends(deps.get_db)):
    """
    Predict based on object incidents
    """
    await predict(session=session)
    return status.HTTP_200_OK