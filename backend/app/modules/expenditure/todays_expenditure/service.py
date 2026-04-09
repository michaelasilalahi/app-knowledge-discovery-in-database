from sqlalchemy.orm import Session
from datetime import date
from app.modules.expenditure.models import Expenditure

def get_todays_expenditure(db: Session, user_id: str):
    today = date.today()
    
    return db.query(Expenditure).filter(
        Expenditure.user_id == user_id,
        Expenditure.date == today
    ).order_by(Expenditure.id.desc()).all()