from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date
from app.modules.expenditure.models import Expenditure

def get_custom_needs_wants_summary(db: Session, user_id: str, start_date: date, end_date: date):
    # query menggunakan filter start_date dan end_date
    results = db.query(
        Expenditure.category,
        func.sum(Expenditure.amount),
        func.count(Expenditure.id)
    ).filter(
        Expenditure.user_id == user_id,
        Expenditure.date >= start_date,
        Expenditure.date <= end_date
    ).group_by(Expenditure.category).all()

    summary = {
        "amount_needs": 0,
        "count_needs": 0,
        "amount_wants": 0,
        "count_wants": 0,
        "total_expense": 0
    }

    for category, total_amount, total_count in results:
        amount = int(total_amount) if total_amount else 0
        count = int(total_count) if total_count else 0
        
        if category == "Kebutuhan":
            summary["amount_needs"] = amount
            summary["count_needs"] = count
        elif category == "Keinginan":
            summary["amount_wants"] = amount
            summary["count_wants"] = count
            
        summary["total_expense"] += amount

    return summary