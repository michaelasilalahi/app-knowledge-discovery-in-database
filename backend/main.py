from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from expenses.expenses import Expenses
from expenses.router import router as expenses_router


from database import engine, SessionLocal, Base 
from auth.googleAuth import Users
from auth.router import router as auth_router

# Kita butuh 'Base' dan 'engine' dari database.py untuk bikin tabel
from models.expense import Expense 


# Setting Analysis
from setting_analysis.router import router as setting_analysis_router


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

# Expenses
app.include_router(expenses_router)

app.include_router(auth_router)

app.include_router(setting_analysis_router)


