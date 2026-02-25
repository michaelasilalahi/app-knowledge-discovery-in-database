import pandas as pd
from sqlalchemy.orm import Session
from app.modules.expenditure.models import Expenditure
from app.modules.analysis_setting.models import AnalysisSetting

def wishlist_filter(
        db: Session, 
        context: AnalysisSetting
) -> pd.DataFrame:
    """
    1. Filter dataset kategori keinginan pengguna
    """

    print("\n" + "="*50)
    print("   Wishlist Filter")
    print("="*50)

    # 1. Eksekusi query ke database
    query = db.query(Expenditure).filter(
        Expenditure.user_id == context.user_id,
        Expenditure.category == 'Keinginan',      
        Expenditure.date >= context.start_date, 
        Expenditure.date <= context.end_date
    )
    wishlist_data = query.all()

    if not wishlist_data:
        print(f"DEBUG: Tidak ditemukan data 'Keinginan' (Database Kosong/Tidak cocok filter).")
        return pd.DataFrame()

    # 2. Konversi object database ke dictionary agar bisa jadi dataframe
    data_list = []
    for item in wishlist_data:
        data_list.append({
            "Tanggal": item.date.strftime("%d/%m/%Y"),
            "Jenis Pengeluaran": item.type_of_expenditure,
            "Label": item.label,
            "Kategori": item.category,
            "Nominal (IDR)": int(item.amount)
        })

    # 4. Buat Pandas DataFrame
    df = pd.DataFrame(data_list)

    # 5. Sorting berdasarkan Tanggal
    if 'Tanggal' in df.columns:
        df['temp_date'] = pd.to_datetime(df['Tanggal'], format='%d/%m/%Y')
        df = df.sort_values(by="temp_date").drop(columns=['temp_date'])
        
        # Reset index agar urutan nomor (0, 1, 2...) rapi kembali
        df = df.reset_index(drop=True)

    print(f"DEBUG: Data Filtered untuk User ID: {context.user_id}")
    print(f"DEBUG: Rentang Waktu: {context.start_date} s/d {context.end_date}")
    print(f"DEBUG: Total Baris Data: {len(df)}")
    
    print("-" * 80)
    # print(df.to_string(index=True)) 
    print("-" * 80)
    
    return df