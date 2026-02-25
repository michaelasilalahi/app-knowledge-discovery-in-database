from sqlalchemy.orm import Session
from datetime import date
from app.modules.expenditure.models import Expenditure
from app.modules.expenditure import schemas

def calender_cycle_expenditure(db: Session, expenditure_data: schemas.ExpenditureCreate):
    
    db_expenditure = Expenditure(
        user_id=expenditure_data.user_id,
        date=expenditure_data.date,
        type_of_expenditure=expenditure_data.type_of_expenditure,
        label=expenditure_data.label,
        category=expenditure_data.category,
        amount=expenditure_data.amount,
    )

    db.add(db_expenditure)
    db.commit()
    db.refresh(db_expenditure)

    return db_expenditure

def get_expenditure_by_user(db: Session, user_id: str):

    return db.query(Expenditure).filter(Expenditure.user_id == user_id).all()

def get_todays_expenditure(db: Session, user_id: str):

    today = date.today()
    
    return db.query(Expenditure).filter(
        Expenditure.user_id == user_id,
        Expenditure.date == today
    ).order_by(Expenditure.id.desc()).all()
