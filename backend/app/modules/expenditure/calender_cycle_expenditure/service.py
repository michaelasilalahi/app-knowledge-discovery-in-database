from sqlalchemy.orm import Session
from app.modules.expenditure.models import Expenditure

def get_all_expenditure_by_user(db: Session, user_id: str):
    return db.query(Expenditure).filter(
        Expenditure.user_id == user_id
    ).order_by(Expenditure.date.desc()).all()