from sqlalchemy.orm import Session
from datetime import date
from app.modules.expenditure.models import Expenditure

def get_todays_expenditure(db: Session, user_id: str, client_date: date):

    return db.query(Expenditure).filter(
        Expenditure.user_id == user_id,
        Expenditure.date == client_date
    ).order_by(Expenditure.id.desc()).all()