from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from . import service
from app.modules.expenditure import schemas

router = APIRouter(
    prefix="/todays_expenditure",
    tags=["Today's Expenditure"]
)

@router.get("/{user_id}", response_model=List[schemas.ExpenditureResponse])
def get_todays_expenditure_endpoint(user_id: str, db: Session = Depends(get_db)):
    return service.get_todays_expenditure(db=db, user_id=user_id)
