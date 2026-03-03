from sqlalchemy.orm import Session
from datetime import date, datetime
import calendar
from . import schemas, models

def create_or_update_setting(db: Session, setting_analysis: schemas.AnalysisSettingCreate):

    # jika analysis setting mati maka set menjadi null
    if not setting_analysis.is_active:

        save_month = None
        save_year = None
        save_type = "non_active"
        start_date = None
        end_date = None
        save_created_at = None

    else:

        py_month = setting_analysis.month_index + 1
        save_month = setting_analysis.month_index
        save_year = setting_analysis.year
        save_type = setting_analysis.analysis_type
        start_date = date(save_year, py_month, 1)
        last_day = calendar.monthrange(save_year, py_month)[1]
        end_date = date(save_year, py_month, last_day)
        save_created_at = datetime.now()
    
    # satu user satu setting analysis
    existing_setting = db.query(models.AnalysisSetting).filter(
        models.AnalysisSetting.user_id == setting_analysis.user_id
    ).first()

    # jika ada di database sudah ada, update datanya
    if existing_setting:

        existing_setting.label_month = save_month
        existing_setting.label_year = save_year
        existing_setting.is_active = setting_analysis.is_active
        existing_setting.is_recurring = setting_analysis.is_recurring
        existing_setting.analysis_type = save_type
        existing_setting.start_date = start_date
        existing_setting.end_date = end_date
        existing_setting.created_at = save_created_at

        db.commit()
        db.refresh(existing_setting)

        return existing_setting
    
    # jika user ini belum pernah bikin setting sama sekali, buat baru
    else:

        new_setting = models.AnalysisSetting(
            user_id=setting_analysis.user_id,
            label_month=save_month,
            label_year=save_year,
            is_active=setting_analysis.is_active,
            is_recurring=setting_analysis.is_recurring,
            analysis_type=save_type,
            start_date=start_date,
            end_date=end_date,
            created_at=save_created_at
        )

        db.add(new_setting)
        db.commit()
        db.refresh(new_setting)

        return new_setting

# ambil setting aktif user (buat load data pas buka aplikasi)
def get_active_settings(db: Session, user_id: str):

    return db.query(models.AnalysisSetting).filter(
        models.AnalysisSetting.user_id == user_id,
        models.AnalysisSetting.is_active == True
    ).order_by(models.AnalysisSetting.created_at.desc()).first()
