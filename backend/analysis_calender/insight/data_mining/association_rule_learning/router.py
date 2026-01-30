from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from analysis_calender.insight.data_mining.analysis_context.service import get_active_context
from analysis_calender.insight.data_mining.association_rule_learning.wishlist_filter import wishlist_filter
from analysis_calender.insight.data_mining.association_rule_learning.data_preprocessing import data_preprocessing
from analysis_calender.insight.data_mining.association_rule_learning.metadata_extraction import metadata_extraction
from analysis_calender.insight.data_mining.association_rule_learning.transaction_aggregation import transaction_aggregation

router = APIRouter(
    prefix="/insight/mining",
    tags=["Data Mining Execution"]
)

@router.post("/execute/{user_id}")
def execute_mining(
    user_id: str,
    month: int,
    year: int,
    db: Session = Depends(get_db)
):
    # 1. Ambil Context
    context = get_active_context(db, user_id, month, year)
    
    # 2. Jalankan Tahap 1: Filter Dataset
    df = wishlist_filter(db, context)

    metadata_json = []
    transaction_json = []

    # 3. Preprocessing data
    if not df.empty:
        df = data_preprocessing(df)
        metadata_df = metadata_extraction(df)
        
        if not metadata_df.empty:
            metadata_json = metadata_df.to_dict(orient="records")

        algo_input_list, grouped_df = transaction_aggregation(df)

        if not grouped_df.empty:
            grouped_df['Tanggal'] = grouped_df['Tanggal'].astype(str)
            transaction_json = grouped_df.to_dict(orient="records")
    else:
        print("DEBUG ROUTER: Data kosong, melewati preprocessing.")

    return {
        "status": "success",
        "message": f"Pipeline Mining berjalan. Ditemukan {len(metadata_json)} label unik.",
        "data": {
            "total_transactions": len(df),
            "metadata_result": metadata_json,
            "aggregation_result": transaction_json
        }
    }