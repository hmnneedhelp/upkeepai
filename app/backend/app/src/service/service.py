from sqlalchemy.ext.asyncio import AsyncSession
from src.schema.models import PredictionModels
from src.service.upkeep import incidents, feature, union


async def model_manager(model: PredictionModels, session: AsyncSession):
    """
    Start train and predict for model passed in.
    :param model:
    :param session:
    :return:
    """
    if model.value == "incident":
        await incidents.predict(session=session, model=model)

    elif model.value == "feature":
        await feature.train_and_predict(session=session, model=model)

    elif model.value == "union":
        await union.make_union(session=session, model=model)
