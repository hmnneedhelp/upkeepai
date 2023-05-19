from src.schema import user as schema
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, HTTPException
from src.api import deps
from src.crud.users import create_user, delete_user_by_email, get_user_by_email
from starlette import status

router = APIRouter(prefix='/users', tags=['users'])

@router.post("/", response_model=schema.BaseUser)
async def registration(user: schema.CreateUser, session: AsyncSession = Depends(deps.get_db)):
    user = await create_user(user=user, session=session)
    if not user:
        raise HTTPException(status_code=401, detail="Sorry, this email already exists.")
    return user


@router.delete("/")
async def delete(email: str, session: AsyncSession = Depends(deps.get_db),
                 current_user: schema.BaseUser = Depends(deps.get_current_user)):
    user = await get_user_by_email(email=email, session=session)
    if not user:
        raise HTTPException(status_code=404, detail=f"User with email {email} not found")
    if user.email == current_user.email:
        deleted = await delete_user_by_email(email=email, session=session)
        if deleted:
            return status.HTTP_204_NO_CONTENT
        raise HTTPException(status_code=404, detail=f"User with email {email} not found")
    raise HTTPException(status_code=403, detail="Not authorized to delete")

