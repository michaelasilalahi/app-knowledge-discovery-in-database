from sqlalchemy.orm import Session
from app.modules.data_mining.analysis_custom.threshold_check.service import threshold_check_custom
from app.modules.data_mining.analysis_custom.analysis_context.service import analysis_context_custom

def get_data_mining_progress(db: Session, user_id: str, month: int, year: int):

    context = analysis_context_custom(db, user_id, month, year)

    return threshold_check_custom(db, context)
