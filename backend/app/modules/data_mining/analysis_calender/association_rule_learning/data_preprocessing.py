import pandas as pd
import re

def data_preprocessing(df: pd.DataFrame) -> pd.DataFrame:
    """
    1. Standarisasi Teks (Lowercase)
    2. Symbol Removal (Membersihkan karakter non-alfanumerik)
    """

    print("\n" + "="*50)
    print("   DATA PREPROCESSING")
    print("="*50)

    if df.empty:
        print("DEBUG: DataFrame kosong, tidak ada data untuk diproses.")
        return df

    target_columns = ["Jenis Pengeluaran", "Label", "Kategori"]

    def clean_text(text):
        if pd.isna(text):
            return ""
        text = str(text)
        text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
        return text.strip().title()
    
    count_processed = 0
    for col in target_columns:
        if col in df.columns:
            df[col] = df[col].apply(clean_text)
            count_processed += 1
        else:
            print(f"WARNING: Kolom '{col}' tidak ditemukan dalam dataset.")
    
    # Debugging
    print(f"DEBUG: Hasil Data Setelah Preprocessing ({len(df)} baris):")
    
    print("-" * 80)
    print(df.to_string(index=True)) 
    print("-" * 80)
    
    return df
