from sqlalchemy.orm import Session
from expenses.expenses import Expenses
from ..data_mining.threshold_check.service import check_mining_eligibility
from ..data_mining.analysis_context.service import get_active_context

THRESHOLD = 30

def get_data_mining_progress(db: Session, user_id: str, month: int, year: int):
    """
    Service untuk Progress Bar UI.
    Hanya bertugas menghubungkan UI dengan logika Data Mining.
    """
    # 1. Ambil Konteks (Start/End Date)
    context = get_active_context(db, user_id, month, year)

    # 2. Panggil Logic Threshold Check yang sudah ada
    return check_mining_eligibility(db, context)
