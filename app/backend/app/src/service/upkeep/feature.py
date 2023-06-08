from sqlalchemy.ext.asyncio import AsyncSession
from src.schema.models import PredictionModels
from src.service.upkeep.model.prediction import predict_num_inc_model, predict_by_house
from src.service.upkeep.model.model_training import (
    train_num_inc_model,
    train_cap_works_model,
)
from src.service.upkeep.utils import mkd_df, incidents_df, df_to_db, overhauls_df
from src.service.upkeep.model import works
import pandas as pd
import warnings

warnings.simplefilter("ignore")


async def train_and_predict(session: AsyncSession, model: PredictionModels):
    # create DataFrame from database with every MKD
    df_1 = await mkd_df(session)
    # create DataFrame from database with every Incident
    df_2 = await incidents_df(session)
    # create DataFrame from database with cap repair
    df_3 = await overhauls_df(session)
    # train and predict
    df_4 = works.df_4
    # train_num_inc_model(df_1, df_2)
    predict_num_inc_model(df_1)

    # loss, accuracy = train_cap_works_model(df_1, df_3, df_4)
    df_prediction = predict_by_house(df_1, df_3, df_4)

    # store result to database
    await df_to_db(df_prediction, model, session)
