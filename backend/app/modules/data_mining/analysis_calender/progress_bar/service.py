from sqlalchemy.orm import Session
from app.modules.data_mining.analysis_calender.threshold_check.service import threshold_check
from app.modules.data_mining.analysis_calender.analysis_context.service import analysis_context

def get_data_mining_progress(db: Session, user_id: str, month: int, year: int):

    context = analysis_context(db, user_id, month, year)

    return threshold_check(db, context)
