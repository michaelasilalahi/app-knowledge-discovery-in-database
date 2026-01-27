from sqlalchemy.orm import Session
from expenses.expenses import Expenses
from setting_analysis.settingAnalysis import SettingAnalysis
from data_mining_result.dataMiningResult import DataMiningResult

THRESHOLD_LIMIT = 30

def check_mining_eligibility(db: Session, context: SettingAnalysis):
    """
    Menghitung data berdasarkan start_date dan end_date dari context yang didapat.
    """

    # Jika hasil sudah ada, hiraukan apakah setting aktif/mati. Tujuannya agar user tetap bisa lihat hasil masa lalu.
    existing_result = db.query(DataMiningResult).filter(
        DataMiningResult.setting_id == context.id
    ).first()

    if existing_result:
        # Kembalikan status 'completed' agar UI menampilkan layar Hasil Analisis
        return {
            "status": "completed",      
            "message": "Analisis Selesai",
            "isReady": True,
            "result_id": existing_result.id,
            "currentCount": THRESHOLD_LIMIT,
            "threshold": THRESHOLD_LIMIT,
            "percentage": 100
        }

    # Skenario C: Analisis Dimatikan (Toggle Off)
    # Kondisi: Belum ada hasil DAN is_active == False
    if not context.is_active:
        return {
            "status": "disabled",       
            "message": "Analisis AI pada bulan ini dinonaktifkan.",
            "isReady": False,
            "result_id": None,
            "currentCount": 0, 
            "threshold": THRESHOLD_LIMIT,
            "percentage": 0
        }
    
    # Skenario A: Analisis Aktif (Hanya Bulan Tertentu)
    # Kondisi: Setting Aktif. Kita hitung jumlah datanya.
    count = db.query(Expenses).filter(
        Expenses.user_id == context.user_id,
        Expenses.category == 'Keinginan',   
        Expenses.date >= context.start_date,
        Expenses.date <= context.end_date
    ).count()

    # Hitung Matematika Progress Bar
    is_ready = count >= THRESHOLD_LIMIT
    percentage = min((count / THRESHOLD_LIMIT) * 100, 100)

    # Tentukan Status Akhir untuk Skenario A
    if is_ready:
        # Jika data >= 30: UI harus menampilkan tombol "Mulai Analisis" / Loading
        status = "ready_to_mine"        
        message = "Data cukup! Analisis AI siap dijalankan."
    else:
        # Jika data < 30: UI menampilkan Progress Bar biasa
        status = "progress"             
        remaining = THRESHOLD_LIMIT - count
        message = f"Butuh {remaining} data 'Kategori Keinginan' agar AI bisa mempelajari kebiasaan pengeluaranmu."

    return {
        "status": status,
        "currentCount": count,
        "threshold": THRESHOLD_LIMIT,
        "percentage": percentage,
        "isReady": is_ready,
        "message": message,
        "result_id": None
    }
