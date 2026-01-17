# Import alat-alat dari SQLAlchemy (Library penghubung Python <-> Database)
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# --- ALAMAT DATABASE ---
# format: postgresql://user:password@host/nama_database
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:root@localhost/ai_expense_tracker_db"

# --- MESIN UTAMA ---
# engine adalah "Mobil" yang akan mengantar data bolak-balik lewat alamat di atas.
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# --- PABRIK SESI ---
# SessionLocal adalah "Pabrik" yang bertugas membuat sesi transaksi baru setiap ada request.
# autocommit=False: Kita harus bilang "Simpan" (commit) secara manual agar aman.
# autoflush=False: Data tidak langsung dikirim sebelum kita yakin.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# --- BASE MODEL ---
# Base adalah "Cetakan Dasar". Semua tabel (Model) nanti akan mewarisi class ini.
Base = declarative_base()


# --- DEPENDENCY (Fungsi Pembantu) ---
# Fungsi ini dipanggil setiap kali ada request API.
# Logikanya: Buka Koneksi -> Lakukan Sesuatu -> Tutup Koneksi (Wajib ditutup agar server tidak lemot).
def get_db():
    # Buka koneksi
    db = SessionLocal()


    try:
        yield db # Serahkan koneksi ke function yang memintanya
    finally:
        db.close() # Tutup koneksi setelah selesai (apapun yang terjadi)