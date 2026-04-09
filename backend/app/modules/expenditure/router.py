# GET: data pengeluaran
from fastapi import APIRouter, Depends
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