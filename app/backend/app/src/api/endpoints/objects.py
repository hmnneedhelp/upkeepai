from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, HTTPException
from src.api import deps
from src.schema.objects import MKDDetail, Predict
from src.schema.models import PredictionModels
from src.crud.objects import get as get_objects
from src.crud.objects import get_object_by_id
from src.service.service import model_manager

router = APIRouter()


@router.get("/", response_model=list[Predict])
async def object_list(
    model: PredictionModels,
    limit: int = 10,
    offset: int = 0,
    session: AsyncSession = Depends(deps.get_db),
):
    """
    Get a list of predicted objects according to the selected model:
    feature -> based on object properties,
    incident -> based on object incidents
    """
    # if offset == 0:
    #     await model_manager(model=model, session=session)
    return await get_objects(model=model, limit=limit, offset=offset, session=session)


@router.get("/{id}", response_model=MKDDetail)
async def object_profile(id: int, model: PredictionModels, session: AsyncSession = Depends(deps.get_db)):
    """
    Detailed description of some object with predicted works according to chosen model
    """
    return await get_object_by_id(id=id, model=model, session=session)
