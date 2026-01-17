# schemas.py
from pydantic import BaseModel
from datetime import date

# --- SCHEMA INPUT (Data Masuk) ---
# Schema untuk data yang dikirim DARI React Native
# Class ini bertugas mengecek data yang dikirim DARI React Native (Frontend)
class ExpenseCreate(BaseModel):
    tanggal: date
    jenis_pengeluaran: str
    label: str
    kategori: str
    nominal: float # Python menggunakan float untuk angka desimal


# --- SCHEMA OUTPUT (Data Keluar) ---
# Schema untuk respon balik KE React Native
# Class ini bertugas mengatur format data yang dikirim BALIK ke React Native
class ExpenseResponse(ExpenseCreate):
    id: int

    # config
    # Mengizinkan FastAPI membaca data dari object Database (SQLAlchemy)
    # Dan mengubahnya menjadi JSON agar bisa dibaca React Native.
    class Config:
        from_attributes = True