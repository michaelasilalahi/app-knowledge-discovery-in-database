from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import date
import calendar
from app.modules.analysis_setting.models import AnalysisSetting

def analysis_context(
        db: Session, 
        user_id: str, 
        month: int, 
        year: int 
) -> AnalysisSetting:
    
    print(f"DEBUG DB: Analysis Context Kalender: {user_id}, Permintaan Frontend -> Bulan: {month}, Tahun: {year}")

    setting = db.query(AnalysisSetting).filter(
        AnalysisSetting.user_id == user_id,
        AnalysisSetting.analysis_type == 'calendar',
        AnalysisSetting.is_active == True
    ).first()

    # jika tidak ada setting sama sekali atau status aktif = false
    if not setting:
        raise HTTPException(
            status_code=404, 
            detail="Setting analisis kalender tidak ditemukan atau sudah dinonaktifkan."
        )
    
    if not setting.is_recurring:
        # jika is_recurring == false (hanya berlaku 1 siklus)
        # bandingkan permintaan frontend langsung dengan properti start_date di database
        if setting.start_date and setting.start_date.month == month and setting.start_date.year == year:
            
            last_day = calendar.monthrange(year, month)[1]
            setting.start_date = date(year, month, 1)
            setting.end_date = date(year, month, last_day)
            
            return setting
        else:
            raise HTTPException(
                status_code=404, 
                detail="Siklus kalender ini tidak berulang (recurring = false) dan hanya aktif di bulan pembuatannya."
            )  
    else:
        if not setting.start_date:
            raise HTTPException(
                status_code=404, 
                detail="Data tanggal mulai tidak valid. Silakan simpan ulang pengaturan Anda."
            )
        # jika is_recurring == true (perulangan aktif)
        # memastikan frontend tidak meminta bulan sebelum siklus dimulai
        requested_approx_date = date(year, month, 1)
        original_approx_date = date(setting.start_date.year, setting.start_date.month, 1)
        
        if requested_approx_date < original_approx_date:
            raise HTTPException(
                status_code=404, 
                detail="Siklus kalender belum dimulai pada periode ini."
            )

        last_day = calendar.monthrange(year, month)[1]
        new_start_date = date(year, month, 1)
        new_end_date = date(year, month, last_day)
        
        setting.start_date = new_start_date
        setting.end_date = new_end_date
        
        return setting