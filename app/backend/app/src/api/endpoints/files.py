from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, UploadFile
from starlette import status

from src.api import deps
from fastapi.responses import FileResponse
from src.api.utils import create_excel, parse_file
from src.schema.models import PredictionModels

router = APIRouter()


@router.get("/download", response_class=FileResponse)
async def file_download(
        model: PredictionModels, session: AsyncSession = Depends(deps.get_db)
):
    path = await create_excel(model=model, session=session)
    return FileResponse(
        path=path,
        filename=f"{model.value}_predict.xlsx",
        media_type="multipart/form-data",
    )


@router.post("/upload")
async def file_upload(file: UploadFile, session: AsyncSession = Depends(deps.get_db)):
    """
    File should be valid xlsx.
    Columns required: Incidents('Наименование', 'Источник', 'Дата создания во внешней системе', 'Дата закрытия', 'Округ', 'Адрес', 'unom', 'Дата и время завершения события во']),
    Cap_rem(['global_id', 'PERIOD', 'WORK_NAME', 'NUM_ENTRANCE', 'ElevatorNumber', 'PLAN_DATE_START', 'PLAN_DATE_END', 'FACT_DATE_START', 'FACT_DATE_END', 'AdmArea', 'District', 'Address', 'UNOM'])
    """
    await parse_file(file=file, session=session)
    return status.HTTP_201_CREATED
