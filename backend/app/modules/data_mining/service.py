from sqlalchemy.orm import Session
from app.modules.data_mining.models import DataMiningCreate

def save_data_mining_analysis_calender(
        db: Session, 
        setting_id: int, 
        rules_data: list
):
    
    if not rules_data:

        print("DEBUG SAVE DATA MINING ANALYSIS CALENDER \n data rules kosong, tidak ada yang disimpan.")
        return
    
    print(f"DEBUG SAVE DATA MINING ANALYSIS CALENDER: Menyimpan {len(rules_data)} rules untuk Setting ID: {setting_id}")

    try:

        # hapus data lama
        db.query(DataMiningCreate).filter(
            DataMiningCreate.setting_id == setting_id
        ).delete()

        db_objects = []

        for row in rules_data:

            history_data = row.get('related_transactions', [])

            new_rule = DataMiningCreate(
                setting_id=setting_id,
                antecedents=row['antecedents'],
                consequents=row['consequents'],
                antecedent_support=row['antecedent_support'],
                consequent_support=row['consequent_support'],
                support=row['support'],
                confidence=row['confidence'],
                lift=row['lift'],
                leverage=row['leverage'],
                conviction=row['conviction'],
                rule_name=row['rule_name'],
                insight_enrichment=row['insight_enrichment'],
                related_transactions=history_data
            )

            db_objects.append(new_rule)

        db.add_all(db_objects)
        db.commit()

        print("DEBUG SAVE DATA MINING ANALYSIS CALENDER \n berhasil commit ke database.")

    except Exception as e:
        
        db.rollback()

        print(f"ERROR SAVE DATA MINING ANALYSIS CALENDER \n gagal menyimpan mining result. {e}")
        raise e