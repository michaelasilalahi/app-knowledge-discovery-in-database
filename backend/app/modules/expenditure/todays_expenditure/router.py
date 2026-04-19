from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from datetime import date
from app.core.database import get_db
from . import service
from app.modules.expenditure import schemas

router = APIRouter(
    prefix="/todays_expenditure",
    tags=["Today's Expenditure"]
)

@router.get("/{user_id}", response_model=List[schemas.ExpenditureResponse])
def get_todays_expenditure_endpoint(
    user_id: str,
    db: Session = Depends(get_db),
    client_date: date = Query(..., description="Tanggal lokal dari HP pengguna format YYYY-MM-DD")
):
    return service.get_todays_expenditure(db=db, user_id=user_id, client_date=client_date)
