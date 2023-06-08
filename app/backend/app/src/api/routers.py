from fastapi import APIRouter

from src.api.endpoints import model, objects, files, add


api_router = APIRouter()
api_router.include_router(model.router, prefix="/model", tags=["model"])
api_router.include_router(objects.router, prefix="/objects", tags=["objects"])
api_router.include_router(files.router, prefix="/files", tags=["files"])
api_router.include_router(add.router, prefix="/add", tags=["add"])
