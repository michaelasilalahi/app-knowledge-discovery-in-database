from fastapi import FastAPI, Depends # Import library utama FastAPI
from fastapi.middleware.cors import CORSMiddleware # Import middleware agar bisa diakses dari domain lain (CORS)
from sqlalchemy.orm import Session # Import Session untuk type hinting
from typing import List # Import List untuk type hinting respon array

# Karena 'models' adalah folder, kita import spesifik file di dalamnya
from models.expense import Expense # Kita butuh 'Base' dan 'engine' dari database.py untuk bikin tabel
from database import engine, SessionLocal, Base # Import alat Database
import schemas # Import Schema (Validasi Data)

# Perintah ini mengecek database:
# Kalau tabel 'expense' belum ada, tolong buatkan sekarang sesuai class Expense!"
Base.metadata.create_all(bind=engine)

# Inisialisasi aplikasi FastAPI
app = FastAPI()

# --- Pengaturan Keamanan (CORS) ---
# Ini seperti satpam yang mengizinkan siapa saja yang boleh masuk.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Mengizinkan semua domain, ganti dengan IP spesifik jika sudah production
    allow_credentials=True,
    allow_methods=["*"], # Boleh method apa aja (GET, POST, PUT, DELETE)
    allow_headers=["*"], # Boleh header apa aja
)

# Dependency Database (Sama seperti di database.py, ditulis ulang di sini agar scope-nya jelas)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- ROUTES (JALUR DATA) ---
# 1. Cek Koneksi Sederhana
@app.get("/")
def read_root():
    return {"status": "connected", "message": "Halo, Server Expense Tracker Aktif!"}

# 2. Jalur CREATE (Menambah Pengeluaran Baru)
# Method: POST (karena mengirim data)
# URL: /expense/ (Pastikan sama dengan url di React Native)
# response_model: Bentuk balikan datanya harus sesuai schema ExpenseResponse
@app.post("/expense/", response_model=schemas.ExpenseResponse)
def create_expense(expense: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    # expense: Data mentah dari React Native (sudah divalidasi schemas.ExpenseCreate)
    # db: Koneksi database aktif

    # Langkah A: Masukkan data schema ke dalam Model Database
    db_expense = Expense( 
        tanggal=expense.tanggal,
        jenis_pengeluaran=expense.jenis_pengeluaran,
        label=expense.label,
        kategori=expense.kategori,
        nominal=expense.nominal
    )
    # Langkah B: Taruh di antrian simpan (staging)
    db.add(db_expense)

    # Langkah C: Simpan permanen ke harddisk (Commit)
    db.commit()

    # Langkah D: Ambil data barusan (Refresh) agar kita dapat ID yang baru digenerate otomatis
    db.refresh(db_expense)

    # Langkah E: Kembalikan data lengkap (+ID) ke React Native
    return db_expense

# 3. Jalur READ (Melihat Semua Pengeluaran)
# Method: GET (karena mengambil data)
# response_model: List[...] karena datanya lebih dari satu (Array)
@app.get("/expense/", response_model=List[schemas.ExpenseResponse])
def read_expenses(db: Session = Depends(get_db)):
    # Query SQL: SELECT * FROM expense;
    # .all() artinya ambil semua baris
    return db.query(Expense).all()