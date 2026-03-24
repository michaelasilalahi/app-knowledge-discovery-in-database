from sqlalchemy.orm import Session
from sqlalchemy import func, distinct
from app.modules.expenditure.models import Expenditure
from app.modules.analysis_setting.models import AnalysisSetting
from app.modules.data_mining.models import DataMiningCreate

THRESHOLD_LIMIT = 20

def threshold_check_custom(db: Session, context: AnalysisSetting):
    existing_result = db.query(DataMiningCreate).filter(
        DataMiningCreate.setting_id == context.id
    ).first()

    if existing_result:
        return {
            "status": "completed",      
            "message": "Analisis Kustom Selesai",
            "isReady": True,
            "result_id": existing_result.id,
            "currentCount": THRESHOLD_LIMIT,
            "threshold": THRESHOLD_LIMIT,
            "percentage": 100
        }

    if not context.is_active or context.analysis_type != 'custom':
        return {
            "status": "disabled",       
            "message": "Analisis Kustom dinonaktifkan.",
            "isReady": False,
            "result_id": None,
            "currentCount": 0, 
            "threshold": THRESHOLD_LIMIT,
            "percentage": 0
        }
    
    # Hitung jumlah hari unik transaksi keinginan
    count = db.query(func.count(distinct(Expenditure.date))).filter(
        Expenditure.user_id == context.user_id,
        Expenditure.category == 'Keinginan',   
        Expenditure.date >= context.start_date,
        Expenditure.date <= context.end_date
    ).scalar()

    is_ready = count >= THRESHOLD_LIMIT
    percentage = min((count / THRESHOLD_LIMIT) * 100, 100)

    if is_ready:
        status = "ready_to_mine"        
        message = "Data siklus kustom cukup! Analisis AI siap dijalankan."
    else:
        status = "progress"             
        remaining = THRESHOLD_LIMIT - count
        message = f"AI akan aktif setelah terkumpul {remaining} data transaksi harian lagi dalam siklus ini."
    
    return {
        "status": status,
        "currentCount": count,
        "threshold": THRESHOLD_LIMIT,
        "percentage": percentage,
        "isReady": is_ready,
        "message": message,
        "result_id": None
    }