from sqlalchemy.ext.asyncio import AsyncSession
from src.service.upkeep.model.prediction import predict_by_house_and_inc
from src.service.upkeep.utils import mkd_df, incidents_df, df_to_db
from src.schema.models import PredictionModels


async def predict(session: AsyncSession, model: PredictionModels):
    # create DataFrame from database with every MKD
    df_1 = await mkd_df(session)
    # create DataFrame from database with every Incident
    df_2 = await incidents_df(session)
    # predict
    df_prediction = predict_by_house_and_inc(df_1, df_2)
    # store to db
    await df_to_db(df_prediction, model, session)
