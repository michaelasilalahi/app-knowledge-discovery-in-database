import pandas as pd

def metadata_extraction(df: pd.DataFrame) -> pd.DataFrame:
    """
    Ekstraksi metadata dari DataFrame.
    Membuat kamus/referensi yang menghubungkan 'Label' (General) dengan detail transaksi.

    Output Columns:
    1. Label
    2. Jenis Pengeluaran (List Unik)
    3. Jumlah Unik (Count)
    4. Total Biaya (Sum Nominal)
    5. List Tanggal (Tanggal transaksi terjadi)
    """

    print("\n" + "="*50)
    print("   METADATA EXTRACTION")
    print("="*50)

    if df.empty:
        print("DEBUG: DataFrame kosong, tidak ada metadata yang diekstrak.")
        return pd.DataFrame()
    
    required_columns = {'Label', 'Jenis Pengeluaran', 'Nominal (IDR)', 'Tanggal'}
    missing_columns = required_columns - set(df.columns)

    if missing_columns:
        print(f"ERROR CRITICAL: Kolom berikut hilang dari dataset: {missing_columns}")
        return pd.DataFrame()
    
    # Kelompokkan berdasarkan Label
    df_metadata = df.groupby('Label').agg({
        'Jenis Pengeluaran': lambda x: sorted(list(set(x))),
        'Nominal (IDR)': 'sum',               
        'Tanggal': lambda x: sorted(list(set(x))) 
    }).reset_index()

    # Rename 
    df_metadata.rename(columns={
        'Nominal (IDR)': 'Total Biaya',
        'Tanggal': 'List Tanggal'
    }, inplace=True)

    # Tambahkan Kolom
    df_metadata['Jumlah Unik'] = df_metadata['Jenis Pengeluaran'].apply(len)

    df_metadata = df_metadata[['Label', 'Jenis Pengeluaran', 'Jumlah Unik', 'Total Biaya', 'List Tanggal']]

    # Debug Print
    print(f"DEBUG: Berhasil mengekstrak {len(df_metadata)} Label unik.")
    print("-" * 100)
    
    # Buat copy untuk display agar tidak merusak data asli
    df_display = df_metadata.copy()

    # Format Rupiah
    df_display['Total Biaya'] = df_display['Total Biaya'].apply(lambda x: f"Rp {x:,}")

    # Potong teks panjang agar rapi di terminal
    def truncate_list(lst):
        s = str(lst)
        return s[:40] + "..." if len(s) > 40 else s

    df_display['Jenis Pengeluaran'] = df_display['Jenis Pengeluaran'].apply(truncate_list)
    df_display['List Tanggal'] = df_display['List Tanggal'].apply(truncate_list)

    # Setting Pandas agar tidak wrapping berantakan
    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', 1000) 
    pd.set_option('display.colheader_justify', 'left') # Rata kiri judul kolom

    # Print dengan rata kiri (justify='left')
    print(df_display.to_string(index=False, justify='left'))
    print("-" * 100)

    return df_metadata