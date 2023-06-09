from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
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
    # from src.service.upkeep import intersection
    # await intersection.make_intersection(session)
    return {"ping": "pong"}
