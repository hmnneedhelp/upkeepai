import pandas as pd
from pandas import DataFrame
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.db.session import Mkd, Incident
from src.service.upkeep.prediction import predict_num_inc_model
from src.service.upkeep.model_training import train_num_inc_model
import warnings

async def predict(session: AsyncSession):
    pass