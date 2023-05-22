from src.schema import user as schema
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, HTTPException
from src.api import deps
from src.crud.users import create_user, delete_user_by_email, get_user_by_email
from starlette import status

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=schema.BaseUser)
async def registration(
    user: schema.CreateUser, session: AsyncSession = Depends(deps.get_db)
):
    user = await create_user(user=user, session=session)
    if not user:
        raise HTTPException(status_code=401, detail="Sorry, this email already exists.")
    return user



# @app.post("/token", response_model=Token)
# async def login(
#     form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
# ):
#     user = authenticate_user(
#         email=form_data.username, password=form_data.password, db=db
#     )
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = security.create_access_token(
#         data={"sub": user.email, "token_type": "bearer"},
#         expires_delta=access_token_expires,
#     )
#     return {"access_token": access_token, "token_type": "bearer"}


@router.delete("/")
async def delete(
    email: str,
    session: AsyncSession = Depends(deps.get_db),
    current_user: schema.BaseUser = Depends(deps.get_current_user),
):
    user = await get_user_by_email(email=email, session=session)
    if not user:
        raise HTTPException(
            status_code=404, detail=f"User with email {email} not found"
        )
    if user.email == current_user.email:
        deleted = await delete_user_by_email(email=email, session=session)
        if deleted:
            return status.HTTP_204_NO_CONTENT
        raise HTTPException(
            status_code=404, detail=f"User with email {email} not found"
        )
    raise HTTPException(status_code=403, detail="Not authorized to delete")
