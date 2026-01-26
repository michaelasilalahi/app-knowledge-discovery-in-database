from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from . import schemas, service

router = APIRouter(
    prefix="/expenses",
    tags=["Expenses"]
)

# POST: Tambah Data Expenses
@router.post("/", response_model=schemas.ExpensesResponse)
def create_expenses_endpoint(expense: schemas.ExpensesCreate, db: Session = Depends(get_db)):
    return service.create_expenses(db=db, expense_data=expense)

# GET: Ambil semua data Expenses
@router.get("/{user_id}", response_model=List[schemas.ExpensesResponse])
def read_expenses_endpoint(user_id: str, db: Session = Depends(get_db)):
    return service.get_expenses_by_user(db=db, user_id=user_id)