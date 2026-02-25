from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from . import service
from .. import schemas

router = APIRouter(
    prefix="/calender_cycle_expenditure",
    tags=["Calender Cycle Expenditure"]
)

# POST: data pengeluaran
@router.post("/", response_model=schemas.ExpenditureResponse)
def calender_cycle_expenditure_endpoint(expense: schemas.ExpenditureCreate, db: Session = Depends(get_db)):

    return service.calender_cycle_expenses(db=db, expense_data=expense)

# GET: data pengeluaran
@router.get("/{user_id}", response_model=List[schemas.ExpenditureResponse])
def read_expenses_endpoint(user_id: str, db: Session = Depends(get_db)):

    return service.get_expenditure_by_user(db=db, user_id=user_id)

# GET: data pengeluaran hari ini
@router.get("/today/{user_id}", response_model=List[schemas.ExpenditureResponse])
def read_today_expenses(user_id: str, db: Session = Depends(get_db)):

    return service.get_todays_expenditure(db=db, user_id=user_id)
