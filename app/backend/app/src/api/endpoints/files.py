from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends
from src.api import deps
from fastapi.responses import FileResponse
from src.api.utils import create_excel

router = APIRouter()


@router.get("/download", response_class=FileResponse)
async def file_download(session: AsyncSession = Depends(deps.get_db)):
    path = await create_excel(session=session)
    return FileResponse(
        path=path, filename="DocPredict.xlsx", media_type="multipart/form-data"
    )
