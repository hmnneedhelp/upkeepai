from fastapi import APIRouter

from src.api.endpoints import users, objects, files


api_router = APIRouter()
# api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(objects.router, prefix="/objects", tags=["objects"])
api_router.include_router(files.router, prefix="/files", tags=["files"])