import pandas as pd
from mlxtend.frequent_patterns import fpgrowth

def frequent_pattern_mining(
    df_encoded: pd.DataFrame, 
    min_support: float = 0.2, 
    date_col: str = "Tanggal"
) -> pd.DataFrame:
    
    """
        Frequent Pattern Mining (FP-Growth):
        Mencari itemset (kombinasi barang) yang sering muncul.
    """

    print("\n" + "="*50)
    print(f"   FREQUENT PATTERN MINING (FP-GROWTH)")
    print("="*50)

    # 1. Persiapkan data (Hapus kolom Tanggal karena algoritma hanya butuh True/False item)
    if date_col in df_encoded.columns:
        df_mining = df_encoded.drop(columns=[date_col])
    else:
        df_mining = df_encoded.copy()
    
    try:
        frequent_itemsets = fpgrowth(
            df_mining, 
            min_support=min_support, 
            use_colnames=True
        )

        if frequent_itemsets.empty:
            print(f"WARNING: Tidak ditemukan pola dengan support {min_support}. Coba turunkan min_support.")
            return pd.DataFrame()
        
        # capitalize setiap item
        frequent_itemsets['itemsets'] = frequent_itemsets['itemsets'].apply(
            lambda itemset: frozenset([str(item).title() for item in itemset])
        )
        
        # hitung panjang itemset (berapa banyak barang dalam kombinasi)
        frequent_itemsets["length"] = frequent_itemsets["itemsets"].apply(lambda x: len(x))

        # hitung jumlah transaksi absolut (jumlah kejadian)
        total_transactions = len(df_mining)
        frequent_itemsets["absolute_count"] = (frequent_itemsets["support"] * total_transactions).astype(int)

        # sorting (urutkan mulai yang paling sering muncul)
        frequent_itemsets = frequent_itemsets.sort_values(by="support", ascending=False).reset_index(drop=True)

        # debug
        print(f"DEBUG: Ditemukan {len(frequent_itemsets)} pola itemset.")
        print("-" * 100)
        
        preview_df = frequent_itemsets.copy()
        preview_df["itemsets"] = preview_df["itemsets"].apply(lambda x: ', '.join(list(x)))
        
        print(preview_df.head().to_string(index=False))
        print("-" * 100)

        return frequent_itemsets
    
    except Exception as e:
        print(f"ERROR FP-Growth: {e}")
        return pd.DataFrame()