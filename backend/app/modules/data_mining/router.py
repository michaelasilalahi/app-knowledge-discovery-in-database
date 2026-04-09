from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.modules.data_mining.models import DataMiningCreate
from app.modules.data_mining.analysis_calender.analysis_context.service import analysis_context
from app.modules.data_mining.analysis_custom.analysis_context.service import analysis_context_custom

router = APIRouter(
    prefix="/data_mining",
    tags=["Data Mining Result Fetching"]
)

@router.get("/analysis_calender/{user_id}")
def get_data_mining_analysis_calender(
    user_id: str, 
    month: int, 
    year: int, 
    db: Session = Depends(get_db)
):
    try:
        context = analysis_context(db, user_id, month, year)
    except HTTPException:
        return {"status": "empty", "data": []}
    
    if not context:
        return {"status": "empty", "data": []}
    
    results = db.query(DataMiningCreate).filter(
        DataMiningCreate.setting_id == context.id,
        DataMiningCreate.start_date == context.start_date,
        DataMiningCreate.end_date == context.end_date
    ).all()
    
    if not results:
        return {"status": "not_found", "message": "Analisis belum dijalankan atau tidak ditemukan pola.", "data": []}
    
    return {"status": "success", "message": "Data insight kalender ditemukan", "data": results}
   

@router.get("/analysis_custom/{user_id}")
def get_data_mining_analysis_custom(
    user_id: str, 
    month: int, 
    year: int, 
    db: Session = Depends(get_db)
):
    try:
        context = analysis_context_custom(db, user_id, month, year)
    except HTTPException:
        return {"status": "empty", "data": []}
    
    if not context:
        return {"status": "empty", "data": []}
    
    results = db.query(DataMiningCreate).filter(
        DataMiningCreate.setting_id == context.id,
        DataMiningCreate.start_date == context.start_date,
        DataMiningCreate.end_date == context.end_date
    ).all()

    if not results:
        return {
            "status": "not_found", 
            "message": "Analisis kustom belum dijalankan atau tidak ditemukan pola.",
            "data": []
        }

    return {
        "status": "success",
        "message": "Data insight kustom ditemukan",
        "data": results
    }