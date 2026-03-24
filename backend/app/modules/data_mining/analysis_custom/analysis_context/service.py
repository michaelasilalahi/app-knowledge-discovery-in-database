from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import date
import calendar
from app.modules.analysis_setting.models import AnalysisSetting

def get_month_name(month_number: int) -> str:
    month_dict = {
        1: "Januari", 2: "Februari", 3: "Maret", 4: "April",
        5: "Mei", 6: "Juni", 7: "Juli", 8: "Agustus",
        9: "September", 10: "Oktober", 11: "November", 12: "Desember"
    }
    return month_dict.get(month_number, "Januari")

def analysis_context_custom(
        db: Session, 
        user_id: str, 
        month: int,
        year: int 
) -> AnalysisSetting:

    print(f"DEBUG DB: Analysis Context Custom: {user_id}, Bulan: {month}, Tahun: {year}")

    str_month = get_month_name(month)

    context = db.query(AnalysisSetting).filter(
        AnalysisSetting.user_id == user_id,
        AnalysisSetting.label_month == str_month,
        AnalysisSetting.label_year == year,
        AnalysisSetting.analysis_type == 'custom'
    ).first()

    # Jika setting ditemukan di bulan yang dicari, kembalikan langsung.
    if context:
        print(f"DEBUG DB: Ketemu! ID Setting: {context.id}, Aktif: {context.is_active}")
        return context
    
    # Hitung mundur satu bulan kebelakang untuk mengecek status is_recurring
    prev_month = month - 1
    prev_year = year

    if prev_month == 0: 
        prev_month = 12
        prev_year = year - 1

    str_prev_month = get_month_name(prev_month)

    # Cari setting bulan lalu
    prev_setting = db.query(AnalysisSetting).filter(
        AnalysisSetting.user_id == user_id,
        AnalysisSetting.label_month == str_prev_month,
        AnalysisSetting.label_year == prev_year,
        AnalysisSetting.analysis_type == 'custom',
        AnalysisSetting.is_recurring == True, 
        AnalysisSetting.is_active == True 
    ).first()

    # Jika bulan lalu Rutin & Aktif -> Otomatis UPDATE untuk bulan ini
    if prev_setting:
        print(f"DEBUG: Auto-update setting rutin KUSTOM untuk {str_month}/{year}")
        
        # Ambil tanggal langganan user (misal: user selalu analisis dari tanggal 5)
        start_day = prev_setting.start_date.day if prev_setting.start_date else 1
        
        # Tentukan start_date bulan ini (misal: 5 Maret)
        max_days_current = calendar.monthrange(year, month)[1]
        actual_start_day = min(start_day, max_days_current)
        new_start_date = date(year, month, actual_start_day)
        
        # Tentukan end_date di bulan depannya (misal: 5 April)
        next_month = month + 1
        next_year = year
        if next_month > 12:
            next_month = 1
            next_year += 1
            
        max_days_next = calendar.monthrange(next_year, next_month)[1]
        actual_end_day = min(start_day, max_days_next)
        new_end_date = date(next_year, next_month, actual_end_day)

        prev_setting.label_month = str_month
        prev_setting.label_year = year
        prev_setting.start_date = new_start_date
        prev_setting.end_date = new_end_date
        
        db.commit()
        db.refresh(prev_setting)
        
        return prev_setting

    # Jika benar-benar tidak ada data (Bukan Rutin, atau belum pernah dibuat)
    raise HTTPException(
        status_code=404, 
        detail="Setting analisis kustom belum diaktifkan untuk periode ini."
    )