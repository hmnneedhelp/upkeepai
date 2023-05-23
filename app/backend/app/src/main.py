from typing import Union

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from src.schema import user as schema
from sqlalchemy.ext.asyncio import AsyncSession
from src.api.routers import api_router
from src.api.deps import get_db


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router)


@app.get("/ping")
async def ping(session: AsyncSession = Depends(get_db)):
    # from src.db_fill.db_coords import fill_db
    # await fill_db(session)
    return {"ping": "pong"}
