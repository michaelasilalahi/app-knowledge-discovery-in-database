from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from . import service, schemas

router = APIRouter(
    prefix="/progress_bar",
    tags=["Progress Bar"]
)

@router.get("/progress/{user_id}", response_model=schemas.ProgressBarResponse)
def get_progress_bar(
    user_id: str, 
    month: int,
    year: int,
    db: Session = Depends(get_db)
):
    
    try:
        # Coba ambil progress bar
        return service.get_data_mining_progress(
            db=db, 
            user_id=user_id,
            month=month,
            year=year
        )
    except HTTPException as e:
        # Jika analysis_context melempar 404 (karena is_recurring false / tidak ada setting)
        # Tangkap errornya, dan kembalikan status "disabled" ke Frontend!
        return {
            "percentage": 0,
            "isReady": False,
            "message": "Analisis bulan ini belum diaktifkan", 
            "currentCount": 0,
            "threshold": 20, 
            "status": "disabled",
            "result_id": None
        }