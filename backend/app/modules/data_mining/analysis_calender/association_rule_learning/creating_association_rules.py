import pandas as pd
import numpy as np
from mlxtend.frequent_patterns import association_rules

def create_association_rules(
    df_freq_itemsets: pd.DataFrame, 
    min_confidence: float = 0.5, 
    metric_type: str = "confidence"
) -> pd.DataFrame:
    
    print("\n" + "="*50)
    print(f"   CREATING ASSOCIATION RULES | Metric: {metric_type}")
    print("="*50)

    if df_freq_itemsets.empty:
        return pd.DataFrame()
    
    try:
        rules = association_rules(
            df_freq_itemsets, 
            metric=metric_type, 
            min_threshold=min_confidence
        )

        # mengurutkan berdasarkan lift tertinggi, lalu confidence tertinggi
        rules = rules.sort_values(by=["lift", "confidence"], ascending=[False, False]).reset_index(drop=True)

        rules['pair_key'] = rules.apply(
            lambda x: frozenset(x['antecedents']).union(frozenset(x['consequents'])), 
            axis=1
        )

        initial_count = len(rules)
        rules = rules.drop_duplicates(subset=['pair_key'], keep='first')
        final_count = len(rules)

        rules = rules.drop(columns=['pair_key'])
        
        print(f"DEBUG: Menghapus {initial_count - final_count} aturan bolak-balik (redundant).")

        rules["antecedents"] = rules["antecedents"].apply(lambda x: ', '.join(list(x)))
        rules["consequents"] = rules["consequents"].apply(lambda x: ', '.join(list(x)))

        rules = rules.rename(columns={
            "antecedent support": "antecedent_support",
            "consequent support": "consequent_support"
        })

        rules["conviction"] = rules["conviction"].replace([float('inf'), -float('inf')], 999.0)

        rules["rule_name"] = rules.apply(
            lambda x: f"{{{x['antecedents']}}} {{{x['consequents']}}}", 
            axis=1
        )

        return rules

    except Exception as e:
        print(f"Error Association Rule Learning: {e}")
        return pd.DataFrame()