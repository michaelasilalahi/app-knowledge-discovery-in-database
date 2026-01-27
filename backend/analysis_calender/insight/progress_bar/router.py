from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from . import service, schemas

router = APIRouter(
    prefix="/insight",
    tags=["Progress Bar"]
)

@router.get("/progress/{user_id}", response_model=schemas.ProgressBarResponse)
def get_progress_bar(
    user_id: str, 
    month: int,
    year: int,
    db: Session = Depends(get_db)
):
    return service.get_data_mining_progress(
        db=db, 
        user_id=user_id,
        month=month,
        year=year
    )