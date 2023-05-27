import pandas as pd
from pandas import DataFrame
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.db.session import Mkd, Incident
from src.schema.models import PredictionModels

# from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.types import String, ARRAY


async def mkd_df(session: AsyncSession):
    df = await session.run_sync(_get_mkd)
    return df


async def incidents_df(session: AsyncSession):
    df = await session.run_sync(_get_incidents)
    return df


async def df_to_db(df_cap: DataFrame, model: PredictionModels, session: AsyncSession):
    if model.value == "feature":
        old_names = ["ID_object", "Address_object", "unom", "predicted_num_inc"]
        new_names = ["id", "name", "unom", "predicted_num"]

        new_col = dict(zip(old_names, new_names))
        df = df_cap[old_names]
        df = df.rename(columns=new_col)

        await session.run_sync(_store_to_database, df, model)
    else:
        await session.run_sync(_store_to_database, df_cap, model)


def _store_to_database(session: AsyncSession, df: DataFrame, model: PredictionModels):
    connection = session.connection()
    if model.value == "feature":
        df.to_sql(
            f"{model.value}_predict", con=connection, if_exists="replace", index=False
        )
    else:
        df.to_sql(
            f"{model.value}_predict",
            con=connection,
            if_exists="replace",
            index=True,
            dtype={
                "works_list": ARRAY(String),
            },
        )
    session.commit()


def _get_mkd(session: AsyncSession):
    conn = session.connection()
    query = select(Mkd)
    return pd.read_sql_query(query, conn)


def _get_incidents(session: AsyncSession):
    conn = session.connection()
    query = select(Incident)
    return pd.read_sql_query(query, conn)
