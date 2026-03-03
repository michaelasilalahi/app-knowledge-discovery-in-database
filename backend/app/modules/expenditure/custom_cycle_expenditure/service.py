from sqlalchemy.orm import Session
from datetime import date
from app.modules.expenditure.models import Expenditure

def service(db: Session, user_id: str, start_date: date, end_date: date):
    """
    - Mengambil data pengeluaran berdasarkan rentang tanggal kustom (start_date s/d end_date).
    - Diurutkan dari tanggal terbaru ke terlama.
    """
    return db.query(Expenditure).filter(
        Expenditure.user_id == user_id,
        Expenditure.date >= start_date,
        Expenditure.date <= end_date
    ).order_by(Expenditure.date.desc()).all()