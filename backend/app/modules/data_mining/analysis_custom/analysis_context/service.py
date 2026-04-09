from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import date
import calendar
from app.modules.analysis_setting.models import AnalysisSetting

def analysis_context_custom(
        db: Session, 
        user_id: str, 
        month: int,
        year: int 
) -> AnalysisSetting:

    print(f"DEBUG DB: Analysis Context Custom: {user_id}, Permintaan Frontend -> Bulan: {month}, Tahun: {year}")

    setting = db.query(AnalysisSetting).filter(
        AnalysisSetting.user_id == user_id,
        AnalysisSetting.analysis_type == 'custom',
        AnalysisSetting.is_active == True
    ).first()

    # jika tidak ada setting sama sekali atau status aktif = false
    if not setting:
        raise HTTPException(
            status_code=404, 
            detail="Setting analisis kustom tidak ditemukan atau sudah dinonaktifkan."
        )

    if not setting.is_recurring:
        # jika is_recurring == false (hanya berlaku 1 siklus)
        # bandingkan permintaan frontend langsung dengan properti start_date di database
        if setting.start_date.month == month and setting.start_date.year == year:
            return setting
        else:
            raise HTTPException(
                status_code=404, 
                detail="Siklus kustom ini tidak berulang (recurring = false) dan hanya aktif di bulan pembuatannya."
            )  
    else:
        # jika is_recurring == true (perulangan aktif)
        # memastikan frontend tidak meminta bulan sebelum siklus dimulai
        requested_approx_date = date(year, month, 1)
        original_approx_date = date(setting.start_date.year, setting.start_date.month, 1)
        
        if requested_approx_date < original_approx_date:
            raise HTTPException(
                status_code=404, 
                detail="Siklus kustom belum dimulai pada periode ini."
            )

        # lakukan pergeseran tanggal otomatis
        start_day = setting.start_date.day
        
        # buat start_date baru
        max_days_current = calendar.monthrange(year, month)[1]
        actual_start_day = min(start_day, max_days_current)
        new_start_date = date(year, month, actual_start_day)
        
        # buat end_date baru di bulan depannya
        next_month = month + 1
        next_year = year
        if next_month > 12:
            next_month = 1
            next_year += 1
            
        max_days_next = calendar.monthrange(next_year, next_month)[1]
        actual_end_day = min(start_day, max_days_next)
        new_end_date = date(next_year, next_month, actual_end_day)

        setting.start_date = new_start_date
        setting.end_date = new_end_date
        
        return setting