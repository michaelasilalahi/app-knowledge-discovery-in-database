from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.modules.data_mining.analysis_calender.analysis_context.service import analysis_context
from . import wishlist_filter, data_preprocessing, metadata_extraction, transaction_aggregation, oneHot_encoding, frequent_pattern_mining, creating_association_rules, insight_enrichment
from app.modules.data_mining.service import save_data_mining_analysis_calender

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
    MIN_SUPPORT = 0.2 
    MIN_CONFIDENCE = 0.5

    context = analysis_context(db, user_id, month, year)

    try:
        context = analysis_context(db, user_id, month, year)
        if not context:
            return {
                "status": "empty",
                "message": "Pengaturan analisis tidak aktif.",
                "data": {"rules_count": 0, "total_transactions": 0}
            }
    except HTTPException:
        print(f"DEBUG: Pengaturan tidak aktif untuk user {user_id}. Mining dibatalkan.")
        return {
            "status": "empty",
            "message": "Pengaturan analisis tidak ditemukan atau sedang tidak aktif.",
            "data": {
                "rules_count": 0,
                "total_transactions": 0
            }
        }
    
    df = wishlist_filter(db, context)
    association_rules_json = []

    if not df.empty:
        # preprocessing
        df = data_preprocessing(df)

        # metada extraction
        metadata_df = metadata_extraction(df)

        # aggregation & mining
        algo_input_list, grouped_df = transaction_aggregation(df)

        if not grouped_df.empty:
            binary_matrix_df = oneHot_encoding(algo_input_list, grouped_df)

            if not binary_matrix_df.empty:
                # frequent Pattern Mining
                fp_growth_df = frequent_pattern_mining(
                    binary_matrix_df, 
                    min_support=MIN_SUPPORT
                )

                if not fp_growth_df.empty:
                    # creating Association Rules
                    rules_df = creating_association_rules(
                        fp_growth_df, 
                        min_confidence=MIN_CONFIDENCE
                    )

                    if not rules_df.empty:
                        enriched_df = insight_enrichment(rules_df, metadata_df, df)
                        association_rules_json = enriched_df.to_dict(orient="records")
                        save_data_mining_analysis_calender(db, context.id, association_rules_json)

    else:
        print("DEBUG ROUTER: Data kosong, melewati preprocessing.")

    return {
        "status": "success",
        "message": f"Pipeline Mining berjalan.",
        "data": {
            "rules_count": len(association_rules_json),
            "total_transactions": len(df)
        }
    }