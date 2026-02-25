from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.modules.data_mining.models import DataMiningCreate
from app.modules.data_mining.analysis_calender.analysis_context.service import analysis_context

router = APIRouter(
    prefix="/data_mining_analysis_calender",
    tags=["Data Mining Analysis Calender"]
)

@router.get("/{user_id}")
def get_data_mining_analysis_calender(
    user_id: str,
    month: int,
    year: int,
    db: Session = Depends(get_db)
):

    # cari context (setting id) untuk bulan tersebut
    try:

        context = analysis_context(db, user_id, month, year)

    except HTTPException:

        return {"status": "empty", "data": []}

    if not context:

        return {"status": "empty", "data": []}

    # ambil hasil dari tabel data_mining_result berdasarkan setting_id
    results = db.query(DataMiningCreate).filter(
        DataMiningCreate.setting_id == context.id
    ).all()

    if not results:

        return {
            "status": "not_found", 
            "message": "Analisis belum dijalankan atau tidak ditemukan pola.",
            "data": []
        }

    # return data ke Frontend
    return {
        "status": "success",
        "message": "Data insight ditemukan",
        "data": results
    }