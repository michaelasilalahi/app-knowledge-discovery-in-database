import pandas as pd
from mlxtend.preprocessing import TransactionEncoder

def oneHot_encoding(
    transaction_list: list, 
    df_reference: pd.DataFrame, 
    date_col: str = "Tanggal"
) ->pd.DataFrame:
    
    """
        One-Hot Encoding:
        Mengubah List of Lists menjadi Matriks Biner (0 dan 1)/(True or False).
    """

    print("\n" + "="*50)
    print("   ONE-HOT ENCODING (BINARY MATRIX)")
    print("="*50)

    if not transaction_list:
        print("DEBUG: Transaction List kosong. Tidak bisa encoding.")
        return pd.DataFrame()

    try:
        # 1. Inisialisasi & Fitting Encoder
        te = TransactionEncoder()

        # 2. Transformasi data menjadi array True/False
        te_ary = te.fit(transaction_list).transform(transaction_list)

        # 3. Buat dataframe
        df_encoded = pd.DataFrame(te_ary, columns=te.columns_)

        # 4. Kembalikan kolom tanggal
        if not df_reference.empty and date_col in df_reference.columns:
            df_reference = df_reference.reset_index(drop=True)
            df_encoded.insert(0, date_col, df_reference[date_col])
        else:
            print(f"WARNING: Kolom '{date_col}' tidak ditemukan di referensi. Matriks tanpa tanggal.")
        
        # Debug
        print(f"DEBUG: Berhasil encoding ke dimensi: {df_encoded.shape} (Baris, Kolom)")

        print("-" * 100)

        cols_to_show = [date_col] + list(df_encoded.columns[1:6]) 
        if len(df_encoded.columns) > 6:
            print(f"Preview (Menampilkan sebagian kolom):\n")
        
        print(df_encoded[cols_to_show].head().to_string(index=False))
        print("-" * 100)

        return df_encoded

    except Exception as e:
        print(f"ERROR One-Hot Encoding: {e}")
        return pd.DataFrame()