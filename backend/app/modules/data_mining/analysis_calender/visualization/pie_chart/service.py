from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from app.modules.expenditure.models import Expenditure

def get_label_distribution_summary(db: Session, user_id: str, month: int, year: int):
    """
        Membuat ringkasan distribusi label pengeluaran berdasarkan total pengeluaran dan frekuensi.
    """

    target_month = month + 1

    results = db.query(
        Expenditure.label,
        func.sum(Expenditure.amount),
        func.count(Expenditure.id)
    ).filter(
        Expenditure.user_id == user_id,
        extract('month', Expenditure.date) == target_month,
        extract('year', Expenditure.date) == year
    ).group_by(Expenditure.label).all()

    items = []
    total_amount_all = 0
    total_count_all = 0

    for label, total_amount_val, total_count_val in results:
        label_name = label if label else "Tanpa Label"
        amount = int(total_amount_val) if total_amount_val else 0
        count = int(total_count_val) if total_count_val else 0

        items.append({
            "label": label_name,
            "amount": amount,
            "count": count
        })
        
        total_amount_all += amount
        total_count_all += count

    # Sorting berdasarkan Count (Frekuensi), dari yang tersering ke terjarang
    items.sort(key=lambda x: x["count"], reverse=True)

    return {
        "data": items,
        "total_amount": total_amount_all,
        "total_count": total_count_all
    }