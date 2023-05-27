import pandas as pd
from pandas import DataFrame
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.db.session import Mkd, Incident
from src.service.upkeep.prediction import predict_num_inc_model
from src.service.upkeep.model_training import train_num_inc_model
import warnings

warnings.simplefilter("ignore")


async def train_and_predict(session: AsyncSession):
    # create DataFrame from database with every MKD
    df_1 = await _mkd_df(session)
    # create DataFrame from database with every Incident
    df_2 = await _incidents_df(session)
    # train and predict
    train_num_inc_model(df_1, df_2)
    df_cap = predict_num_inc_model(df_1)
    # store result to database
    await _df_to_db(df_cap, session)


async def _mkd_df(session: AsyncSession):
    df = await session.run_sync(_get_mkd)
    return df


async def _incidents_df(session: AsyncSession):
    df = await session.run_sync(_get_incidents)
    return df


async def _df_to_db(df_cap: DataFrame, session: AsyncSession):
    old_names = ["ID_object", "Address_object", "unom", "predicted_num_inc"]
    new_names = ["id", "name", "unom", "predicted_num"]

    new_col = dict(zip(old_names, new_names))
    df = df_cap[old_names]
    df = df.rename(columns=new_col)

    await session.run_sync(_store_to_database, df)


def _store_to_database(session: AsyncSession, df: DataFrame):
    connection = session.connection()
    df.to_sql("feature_predict", con=connection, if_exists="replace", index=False)
    session.commit()


def _get_mkd(session: AsyncSession):
    conn = session.connection()
    query = select(Mkd)
    return pd.read_sql_query(query, conn)


def _get_incidents(session: AsyncSession):
    conn = session.connection()
    query = select(Incident)
    return pd.read_sql_query(query, conn)
