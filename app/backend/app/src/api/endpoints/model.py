from src.service.incidents import train_and_predict
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends
from src.api import deps
from starlette import status

router = APIRouter()


@router.get("/train")
async def train_n_predict(session: AsyncSession = Depends(deps.get_db)):
    """
    Retrain the model
    """
    await train_and_predict(session=session)
    return status.HTTP_200_OK
