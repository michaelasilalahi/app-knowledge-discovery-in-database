from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from . import schemas, service

router = APIRouter(
    prefix="/authentication",
    tags=["Authentication"]
)


@router.post("/google-login", response_model=schemas.UsersResponse)
def google_auth(user: schemas.UsersCreate, db: Session = Depends(get_db)):

    return service.service(db=db, user_data=user)