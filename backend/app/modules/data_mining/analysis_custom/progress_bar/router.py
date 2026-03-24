from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from . import service, schemas

router = APIRouter(
    prefix="/progress_bar/analysis_custom",
    tags=["Progress Bar"]
)

@router.get("/{user_id}", response_model=schemas.ProgressBarResponse)
def get_progress_bar(
    user_id: str, 
    month: int,
    year: int,
    db: Session = Depends(get_db)
):
    
    try:
        return service.get_data_mining_progress(
            db=db, 
            user_id=user_id,
            month=month,
            year=year
        )
    except HTTPException as e:
        return {
            "percentage": 0,
            "isReady": False,
            "message": "Analisis siklus kustom belum diaktifkan", 
            "currentCount": 0,
            "threshold": 20,
            "status": "disabled",
            "result_id": None
        }