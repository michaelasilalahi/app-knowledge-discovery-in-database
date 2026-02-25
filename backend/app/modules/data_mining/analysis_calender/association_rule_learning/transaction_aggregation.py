import pandas as pd

def transaction_aggregation(df: pd.DataFrame) -> tuple[list, pd.DataFrame]:
    
    """
    Transaction Aggregation:
    Mengelompokkan data berdasarkan Tanggal.
    Setiap tanggal dianggap sebagai satu transaksi (basket).
    """

    print("\n" + "="*50)
    print("   TRANSACTION AGGREGATION")
    print("="*50)

    if df.empty:
        print("DEBUG: DataFrame kosong.")
        return [], pd.DataFrame()
    
    # Logic Transaction Aggregation
    try:
        # 1. Memastikan kolom tanggal menjadi string
        df['Tanggal'] = df['Tanggal'].astype(str)

        # 2. Parsing Tanggal dengan parameter 'dayfirst=True', untuk memastikan 29/01 dibaca sebagai 29 Januari
        df['Tanggal'] = pd.to_datetime(df['Tanggal'], dayfirst=True, errors='coerce')
        before_drop = len(df)
        df = df.dropna(subset=['Tanggal'])
        after_drop = len(df)

        if before_drop != after_drop:
            print(f"DEBUG: {before_drop - after_drop} baris data dibuang karena tanggal tidak valid.")

        else: print("DEBUG: Semua tanggal valid. Tidak ada data yang dibuang.")

        # Mengelompokkan item berdasarkan tanggal yang sama
        df_grouped = df.groupby('Tanggal')['Label'].apply(list).reset_index()
        df_grouped.rename(columns={'Label': 'Items'}, inplace=True)
        df_grouped = df_grouped.sort_values('Tanggal')

    except KeyError as e:
        print(f"ERROR: Kolom {e} hilang. Pastikan query SQL mengambil kolom 'Tanggal' dan 'Label'.")
        return [], pd.DataFrame()
    
    except KeyError as e:
        print(f"ERROR Aggregation: {e}")
        return [], pd.DataFrame()
    
    transaction_list = df_grouped['Items'].tolist()

    # Debug: Display
    print(f"DEBUG: Terbentuk {len(df_grouped)} Keranjang Transaksi.")
    print("-" * 80)

    df_display = df_grouped.copy()
    df_display['Tanggal'] = df_display['Tanggal'].dt.strftime('%Y-%m-%d')

    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', 1000)
    pd.set_option('display.max_colwidth', 80)
    pd.set_option('display.colheader_justify', 'left')

    print(df_display.to_string(index=False))
    print("-" * 80)

    return transaction_list, df_grouped