from sqlalchemy.orm import Session
from datetime import date
import calendar
from . import schemas
from .settingAnalysis import SettingAnalysis

def create_or_update_setting(db: Session, setting_analysis: schemas.SettingAnalysisCreate):
    
    #  1. Hitung start date dan end date otomatis
    py_month = setting_analysis.month_index + 1
    
    # Hari pertama bulan selalu tanggal 1
    start_date = date(setting_analysis.year, py_month, 1)

    # Hari terakhir bulan itu (misalkan Feb kabisat = 29, atau Jan = 31)
    last_day = calendar.monthrange(setting_analysis.year, py_month)[1]
    end_date = date(setting_analysis.year, py_month, last_day)

    # 2. Cek apakah setting sudah ada
    existing_setting = db.query(SettingAnalysis).filter(
        SettingAnalysis.user_id == setting_analysis.user_id,
        SettingAnalysis.label_month == setting_analysis.month_index,
        SettingAnalysis.label_year == setting_analysis.year,
        SettingAnalysis.analysis_type == setting_analysis.analysis_type
    ).first()

    if existing_setting:
        # Update data lama
        existing_setting.is_active = setting_analysis.is_active
        existing_setting.is_recurring = setting_analysis.is_recurring
        existing_setting.start_date = start_date
        existing_setting.end_date = end_date

        db.commit()
        db.refresh(existing_setting)
        return existing_setting
    else:
        # Create data baru
        new_setting = SettingAnalysis(
            user_id=setting_analysis.user_id,
            label_month=setting_analysis.month_index,
            label_year=setting_analysis.year,
            is_active=setting_analysis.is_active,
            is_recurring=setting_analysis.is_recurring,
            analysis_type=setting_analysis.analysis_type,
            start_date=start_date,
            end_date=end_date
        )

        db.add(new_setting)
        db.commit()
        db.refresh(new_setting)
        return new_setting

# Ambil setting aktif user (buat load data pas buka aplikasi)
def get_active_settings(db: Session, user_id: str):
    return db.query(SettingAnalysis).filter(
        SettingAnalysis.user_id == user_id,
        SettingAnalysis.is_active == True
    ).order_by(SettingAnalysis.created_at.desc()).first()
