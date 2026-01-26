from sqlalchemy.orm import Session
from .expenses import Expenses
from . import schemas

# Simpan data Expenses
def create_expenses(db: Session, expense_data: schemas.ExpensesCreate):
    db_expense = Expenses(
        user_id=expense_data.user_id,
        date=expense_data.date,
        type_of_expenditure=expense_data.type_of_expenditure,
        label=expense_data.label,
        category=expense_data.category,
        amount=expense_data.amount,
    )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

# Ambil semua data Expenses
def get_expenses_by_user(db: Session, user_id: str):
    return db.query(Expenses).filter(Expenses.user_id == user_id).all()
