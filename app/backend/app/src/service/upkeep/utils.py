import pandas as pd
from pandas import DataFrame
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.db.session import Mkd, Incident, Overhaul
from src.schema.models import PredictionModels
from sqlalchemy.types import String, ARRAY


async def mkd_df(session: AsyncSession):
    df = await session.run_sync(_get_mkd)
    return df


async def incidents_df(session: AsyncSession):
    df = await session.run_sync(_get_incidents)
    return df


async def overhauls_df(session: AsyncSession):
    df = await session.run_sync(_get_overhauls)
    return df


async def df_to_db(df_cap: DataFrame, model: PredictionModels, session: AsyncSession):
    await session.run_sync(_store_to_database, df_cap, model)


def _store_to_database(session: AsyncSession, df: DataFrame, model: PredictionModels):
    connection = session.connection()
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


def _get_overhauls(session: AsyncSession):
    conn = session.connection()
    query = select(Overhaul)
    return pd.read_sql_query(query, conn)
