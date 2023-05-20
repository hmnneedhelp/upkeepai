from typing import Union

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from src.schema import user as schema
from sqlalchemy.ext.asyncio import AsyncSession
from src.api.endpoints.users import router
from src.api.deps import get_db

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)


@app.get("/ping")
async def ping(session: AsyncSession = Depends(get_db)):
    from src.db_fill.db_filling import fill_db
    await fill_db(session)

    return {"ping": "pong"}


# @app.post("/auth")
# async def login():
#     ...


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
