from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db

# from analysis_custom.analysis_context
from app.modules.data_mining.analysis_custom.analysis_context.service import analysis_context_custom

# reuse from analysis_calender.association_rule_learning
from app.modules.data_mining.analysis_calender.association_rule_learning.wishlist_filter import wishlist_filter
from app.modules.data_mining.analysis_calender.association_rule_learning.data_preprocessing import data_preprocessing
from app.modules.data_mining.analysis_calender.association_rule_learning.metadata_extraction import metadata_extraction
from app.modules.data_mining.analysis_calender.association_rule_learning.transaction_aggregation import transaction_aggregation
from app.modules.data_mining.analysis_calender.association_rule_learning.oneHot_encoding import oneHot_encoding
from app.modules.data_mining.analysis_calender.association_rule_learning.frequent_pattern_mining import frequent_pattern_mining
from app.modules.data_mining.analysis_calender.association_rule_learning.creating_association_rules import creating_association_rules
from app.modules.data_mining.analysis_calender.association_rule_learning.insight_enrichment import insight_enrichment

# menyimpan mining result ke database
from app.modules.data_mining.service import save_data_mining
from app.modules.data_mining.models import DataMiningCreate

router = APIRouter(
    prefix="/data_mining/analysis_custom",
    tags=["Data Mining Analysis Custom"]
)

@router.post("/execute/{user_id}")
def execute_mining_custom(
    user_id: str,
    month: int,
    year: int,
    db: Session = Depends(get_db)
):

    MIN_SUPPORT = 0.2 
    MIN_CONFIDENCE = 0.5

    try:
        # menggunakan context_custom agar start_date dan end_date akurat
        context = analysis_context_custom(db, user_id, month, year)
    except HTTPException as e:
        print(f"DEBUG: Pengaturan tidak aktif untuk user {user_id}. Mining dibatalkan.")
        return {
            "status": "empty",
            "message": "Pengaturan analisis kustom tidak ditemukan atau sedang tidak aktif.",
            "data": {"rules_count": 0, "total_transactions": 0}
        }
    
    # fungsi wishlist_filter ini sudah otomatis membaca context.start_date dan end_date yang benar
    df = wishlist_filter(db, context)
    association_rules_json = []

    if not df.empty:
        df = data_preprocessing(df)
        metadata_df = metadata_extraction(df)
        algo_input_list, grouped_df = transaction_aggregation(df)

        if not grouped_df.empty:
            binary_matrix_df = oneHot_encoding(algo_input_list, grouped_df)

            if not binary_matrix_df.empty:
                fp_growth_df = frequent_pattern_mining(
                    binary_matrix_df, 
                    min_support=MIN_SUPPORT
                )

                if not fp_growth_df.empty:
                    rules_df = creating_association_rules(
                        fp_growth_df, 
                        min_confidence=MIN_CONFIDENCE
                    )

                    if not rules_df.empty:
                        enriched_df = insight_enrichment(rules_df, metadata_df, df)
                        association_rules_json = enriched_df.to_dict(orient="records")
                        save_data_mining(
                            db=db,
                            setting_id=context.id,
                            start_date=context.start_date,
                            end_date=context.end_date,
                            rules_data=association_rules_json
                        )

    else:
        print("DEBUG ROUTER CUSTOM: Data kosong, melewati preprocessing.")

    return {
        "status": "success",
        "message": f"Pipeline Mining Custom berjalan.",
        "data": {
            "rules_count": len(association_rules_json),
            "total_transactions": len(df)
        }
    }

@router.get("/{user_id}")
def get_data_mining_analysis_custom(
    user_id: str,
    month: int,
    year: int,
    db: Session = Depends(get_db)
):
    try:
        context = analysis_context_custom(db, user_id, month, year)
    except HTTPException:
        return {"status": "empty", "data": []}

    results = db.query(DataMiningCreate).filter(
        DataMiningCreate.setting_id == context.id
    ).all()

    if not results:
        return {
            "status": "not_found", 
            "message": "Analisis belum dijalankan atau tidak ditemukan pola.",
            "data": []
        }

    return {
        "status": "success",
        "message": "Data insight ditemukan",
        "data": results
    }