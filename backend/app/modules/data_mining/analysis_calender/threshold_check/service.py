from sqlalchemy.orm import Session
from sqlalchemy import func, distinct
from app.modules.expenditure.models import Expenditure
from app.modules.analysis_setting.models import AnalysisSetting
from app.modules.data_mining.models import DataMiningCreate

THRESHOLD_LIMIT = 20

def threshold_check(db: Session, context: AnalysisSetting):
    """
    - Menghitung progress mining dengan logika Transaction Aggregation.
    - Progress dihitung berdasarkan jumlah HARI UNIK yang memiliki transaksi 'Keinginan'.
    """

    # Jika hasil sudah ada, hiraukan apakah setting aktif/mati. Tujuannya agar user tetap bisa lihat hasil masa lalu.
    existing_result = db.query(DataMiningCreate).filter(
        DataMiningCreate.setting_id == context.id
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
    """
    Logika Transaction Aggregation, contoh:
    - Beli 5 barang di tgl 1 Maret -> Dihitung 1.
    - Beli 2 barang di tgl 2 Maret -> Dihitung 1.
    - Beli 3 barang di tgl 3 Maret -> Dihitung 1.
    - Total = 3 Hari.
    """

    count = db.query(func.count(distinct(Expenditure.date))).filter(
        Expenditure.user_id == context.user_id,
        Expenditure.category == 'Keinginan',   
        Expenditure.date >= context.start_date,
        Expenditure.date <= context.end_date
    ).scalar()

    # Progress Bar
    is_ready = count >= THRESHOLD_LIMIT
    percentage = min((count / THRESHOLD_LIMIT) * 100, 100)

    # Menentukan Status Akhir
    if is_ready:
        status = "ready_to_mine"        
        message = "Data transaksi cukup! Analisis AI siap dijalankan."
    else:
        status = "progress"             
        remaining = THRESHOLD_LIMIT - count
        message = f"AI akan aktif setelah terkumpul {remaining} data transaksi harian lagi. Pastikan mencatat pengeluaran 'Keinginan' di tanggal yang berbeda."
    
    return {
        "status": status,
        "currentCount": count,
        "threshold": THRESHOLD_LIMIT,
        "percentage": percentage,
        "isReady": is_ready,
        "message": message,
        "result_id": None
    }
