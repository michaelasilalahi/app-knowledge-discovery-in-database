from sqlalchemy.orm import Session
from app.modules.expenditure.models import Expenditure
from app.modules.expenditure import schemas

def create_expenditure(db: Session, expenditure_data: schemas.ExpenditureCreate):
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

def delete_expenditure(db: Session, expenditure_id: int):
    db_expenditure = db.query(Expenditure).filter(Expenditure.id == expenditure_id).first()
    if db_expenditure:
        db.delete(db_expenditure)
        db.commit()
        return True
    return False