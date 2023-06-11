import pandas as pd
from src.schema.models import PredictionModels
from src.db.session import IncidentPredict, FeaturePredict, Mkd
from sqlalchemy.ext.asyncio import AsyncSession
from src.service.upkeep.utils import df_to_db
from sqlalchemy import select


async def make_union(model: PredictionModels, session: AsyncSession):
    stmt = select(
        IncidentPredict.unom,
        IncidentPredict.works_list.label("inc_works"),
        FeaturePredict.works_list.label("feat_works"),
    ).join(FeaturePredict, FeaturePredict.unom == IncidentPredict.unom)
    works = await session.execute(stmt)
    works = works.all()
    total = []
    for work in works:
        inter = set(work.inc_works) | set(work.feat_works)
        if inter:
            total.append((work.unom, tuple(inter), len(inter)))
    total.sort(key=lambda x: len(x[1]), reverse=True)
    df_union = pd.DataFrame(total, columns=['unom', 'works_list', 'num_works'])
    await df_to_db(df_union, model=model, session=session)

