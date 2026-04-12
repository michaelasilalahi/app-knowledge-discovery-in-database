# GET: data pengeluaran
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from . import service
from . import schemas

router = APIRouter(
    prefix="/expenditure",
    tags=["Core Expenditure"]
)

@router.post("/", response_model=schemas.ExpenditureResponse)
def create_expenditure_endpoint(expense: schemas.ExpenditureCreate, db: Session = Depends(get_db)):
    return service.create_expenditure(db=db, expenditure_data=expense)

@router.delete("/{expense_id}")
def delete_expenditure_endpoint(expense_id: int, db: Session = Depends(get_db)):
    success = service.delete_expenditure(db=db, expenditure_id=expense_id)
    if not success:
        raise HTTPException(status_code=404, detail="Data pengeluaran tidak ditemukan")
    return {"message": "Pengeluaran berhasil dihapus"}