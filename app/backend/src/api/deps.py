from fastapi import Depends
from src.db.session import AsyncSessionFactory
from sqlalchemy.ext.asyncio import AsyncSession
from src.schema.user import BaseUser

async def get_db() -> AsyncSession:
    async with AsyncSessionFactory() as session:
        yield session


async def get_current_user(session: AsyncSession = Depends(get_db)) -> BaseUser:
    pass
