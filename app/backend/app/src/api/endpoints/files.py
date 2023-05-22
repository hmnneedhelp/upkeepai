from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends
from src.api import deps
from fastapi.responses import FileResponse
router = APIRouter()

@router.get("/download", response_class=FileResponse)
async def file_download(session: AsyncSession = Depends(deps.get_db)):
    from src.api.utils import crete_excel

    path = await crete_excel(session=session)
    return FileResponse(
        path=path, filename="DocPredict.xlsx", media_type="multipart/form-data"
    )
