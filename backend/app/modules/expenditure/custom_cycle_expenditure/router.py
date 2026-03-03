from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from datetime import date
from app.core.database import get_db
from app.modules.expenditure import schemas
from . import service

router = APIRouter(
    prefix="/custom_cycle_expenditure",
    tags=["Custom Cycle Expenditure"]
)

@router.get("/{user_id}", response_model=List[schemas.ExpenditureResponse])
def read_custom_expenses(
    user_id: str, 
    start_date: date = Query(..., description="Tanggal mulai siklus (Format: YYYY-MM-DD)"),
    end_date: date = Query(..., description="Tanggal akhir siklus (Format: YYYY-MM-DD)"),
    db: Session = Depends(get_db)
):
    return service.service(
        db=db, 
        user_id=user_id, 
        start_date=start_date, 
        end_date=end_date
    )