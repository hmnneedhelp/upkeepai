from src.db.session import User as UserModel
from sqlalchemy import insert, select, delete
from src.schema.user import BaseUser, CreateUser
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import DatabaseError
from passlib.hash import pbkdf2_sha256


async def create_user(user: CreateUser, session: AsyncSession) -> BaseUser | None:
    hashed_pswd = pbkdf2_sha256.hash(user.password)
    try:
        db_user = await session.execute(
            insert(UserModel)
            .values(username=user.username, email=user.email, password=hashed_pswd)
            .returning(UserModel)
        )
        db_user = db_user.scalar_one_or_none()
        await session.commit()
    except DatabaseError:
        return None

    return BaseUser.from_orm(db_user)


async def get_user_by_email(email: str, session: AsyncSession):
    db_user = await session.execute(select(UserModel).where(email=email))
    return db_user.scalar_one_or_none()

async def delete_user_by_email(email: str, session: AsyncSession):
    deleted = await session.execute(delete(UserModel).where(email=email).returning(UserModel.id))
    deleted = deleted.scalar_one_or_none()
    await session.commit()
    return deleted
