from sqlalchemy.orm import Session
from datetime import date, datetime
import calendar
from . import schemas, models

def get_month_number(month_name: str) -> int:
    month_dict = {
        "Januari": 1, "Februari": 2, "Maret": 3, "April": 4,
        "Mei": 5, "Juni": 6, "Juli": 7, "Agustus": 8,
        "September": 9, "Oktober": 10, "November": 11, "Desember": 12
    }
    return month_dict.get(month_name, datetime.now().month)

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

        save_month = setting_analysis.label_month
        save_year = setting_analysis.label_year
        save_type = setting_analysis.analysis_type
        save_created_at = datetime.now()
        py_month = get_month_number(setting_analysis.label_month)
        start_day = int(setting_analysis.label_day) if setting_analysis.label_day else 1
        max_days_current = calendar.monthrange(save_year, py_month)[1]
        actual_start_day = min(start_day, max_days_current)
        start_date = date(save_year, py_month, actual_start_day)
        
        if actual_start_day == 1:
            # Jika mulai tgl 1, end_date adalah hari terakhir di bulan yang sama (contoh: 1 Jan s/d 31 Jan)
            end_date = date(save_year, py_month, max_days_current)
        else:
            # Jika mulai bukan tgl 1, lompat ke bulan depannya (contoh: 5 Jan s/d 5 Feb)
            next_month = py_month + 1
            next_year = save_year
            if next_month > 12:
                next_month = 1
                next_year += 1
                
            max_days_next = calendar.monthrange(next_year, next_month)[1]
            actual_end_day = min(start_day, max_days_next)
            end_date = date(next_year, next_month, actual_end_day)
    
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
