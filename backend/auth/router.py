from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from . import schemas, service # Import teman se-folder

# Prefix artinya semua URL di sini otomatis depannya "/auth"
router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

# URL Akhir: /auth/google-login
@router.post("/google-login", response_model=schemas.UsersResponse)
def google_auth(user: schemas.UsersLogin, db: Session = Depends(get_db)):
    # Router tugasnya cuma satu: Panggil Service!
    return service.get_or_create_user(db=db, user_data=user)