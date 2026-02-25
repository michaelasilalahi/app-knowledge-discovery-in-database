import pandas as pd

def metadata_extraction(df: pd.DataFrame) -> pd.DataFrame:
    """
        Mengambil ringkasan statistik per item (label)
            - Total Biaya (Sum)
            - Jumlah Transaksi Unik (Count)
            - Jenis Pengeluaran (Category)
    """

    print("\n" + "="*50)
    print("   METADATA EXTRACTION")
    print("="*50)

    if df.empty:
        print("DEBUG: DataFrame kosong.")
        return pd.DataFrame()
    
    # Grouping berdasarkan Label untuk mendapatkan statistik
    # Kita asumsikan satu Label punya satu Jenis Pengeluaran/Kategori yang dominan
    metadata = df.groupby('Label').agg({
        'Nominal (IDR)': 'sum',            # Total uang yang dikeluarkan untuk item ini
        'Tanggal': 'count',                # Berapa kali item ini dibeli
        'Jenis Pengeluaran': lambda x: x.mode()[0] if not x.mode().empty else x.iloc[0] # Ambil kategori terbanyak
    }).reset_index()

    # Rename kolom agar mudah dipanggil
    metadata.rename(columns={
        'Nominal (IDR)': 'Total Biaya',
        'Tanggal': 'Jumlah Unik'
    }, inplace=True)
    
    print(f"DEBUG: Metadata diekstrak untuk {len(metadata)} item unik.")
    # print(metadata.head().to_string())
    print("-" * 80)

    return metadata