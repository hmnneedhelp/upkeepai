from sqlalchemy.ext.asyncio import AsyncSession
from src.schema.models import PredictionModels
from src.service.upkeep import incidents
from src.service.upkeep import feature

async def model_manager(model: PredictionModels, session: AsyncSession):
    """
    Start train and predict for model passed in.
    :param model:
    :param session:
    :return:
    """
    if model.value == "incident":
        await incidents.predict(session=session)

    elif model.value == "feature":
        await feature.train_and_predict(session=session)
