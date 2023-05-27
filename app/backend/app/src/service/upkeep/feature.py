from sqlalchemy.ext.asyncio import AsyncSession
from src.schema.models import PredictionModels
from src.service.upkeep.model.prediction import predict_num_inc_model
from src.service.upkeep.model.model_training import train_num_inc_model
from src.service.upkeep.utils import mkd_df, incidents_df, df_to_db
import warnings

warnings.simplefilter("ignore")


async def train_and_predict(session: AsyncSession, model: PredictionModels):
    # create DataFrame from database with every MKD
    df_1 = await mkd_df(session)
    # create DataFrame from database with every Incident
    df_2 = await incidents_df(session)
    # train and predict
    train_num_inc_model(df_1, df_2)
    df_cap = predict_num_inc_model(df_1)
    # store result to database
    await df_to_db(df_cap, model, session)
