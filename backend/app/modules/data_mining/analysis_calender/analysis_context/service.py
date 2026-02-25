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

    print(f"DEBUG DB: Analysis Context: {user_id}, Bulan: {month}, Tahun: {year}")

    context = db.query(AnalysisSetting).filter(
        AnalysisSetting.user_id == user_id,
        AnalysisSetting.label_month == month,
        AnalysisSetting.label_year == year,
    ).first()

    # Jika setting ditemukan (Entah itu Aktif atau Mati), kembalikan langsung.
    if context:
        print(f"DEBUG DB: Ketemu! ID Setting: {context.id}, Aktif: {context.is_active}")
        return context
    
    # Hitung mundur satu bulan kebelakang
    prev_month = month - 1
    prev_year = year

    # Handle pergantian tahun (Januari -> Desember tahun lalu)
    if prev_month == 0: 
        prev_month = 12
        prev_year = year - 1

    # Cari setting bulan lalu
    prev_setting = db.query(AnalysisSetting).filter(
        AnalysisSetting.user_id == user_id,
        AnalysisSetting.label_month == prev_month,
        AnalysisSetting.label_year == prev_year,
        AnalysisSetting.is_recurring == True, 
        AnalysisSetting.is_active == True 
    ).first()

    # Jika bulan lalu Rutin & Aktif -> Otomatis buatkan untuk bulan ini
    if prev_setting:
        print(f"DEBUG: Auto-create setting rutin untuk {month}/{year}")
        
        # Hitung tanggal awal (tgl 1) dan akhir (tgl 28/30/31) bulan ini
        last_day = calendar.monthrange(year, month)[1]
        new_start_date = date(year, month, 1)
        new_end_date = date(year, month, last_day)

        # Buat object baru
        new_recurring_setting = AnalysisSetting(
            user_id=user_id,
            label_month=month,
            label_year=year,
            is_active=True,        
            is_recurring=True,      
            analysis_type=prev_setting.analysis_type, 
            start_date=new_start_date,
            end_date=new_end_date
        )
        
        # Simpan ke Database
        db.add(new_recurring_setting)
        db.commit()
        db.refresh(new_recurring_setting)
        
        # Kembalikan setting baru ini
        return new_recurring_setting

    # Jika benar-benar tidak ada data (Bukan Rutin, Belum dibuat) Baru kita lempar 404.
    raise HTTPException(
        status_code=404, 
        detail="Setting analisis belum diaktifkan untuk periode ini."
    )