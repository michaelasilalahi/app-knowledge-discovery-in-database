# Import tipe-tipe kolom database
from sqlalchemy import Column, Integer, String, Date, Numeric
# Import 'Base' yang tadi kita buat di database.py
from database import Base

# Class ini merepresentasikan tabel di database sesungguhnya
class Expense(Base):
    # __tablename__ harus sama persis dengan nama tabel yang anda buat di DBMS (Dbeaver).
    __tablename__ = "expense"

    # --- DEFINISI KOLOM ---
    # Primary Key, Index=True biar pencarian cepat
    id = Column(Integer, primary_key=True, index=True) # Identity: Always dihandle database
    # nullable=False artinya kolom ini TIDAK BOLEH KOSONG
    tanggal = Column(Date, nullable=False)
    jenis_pengeluaran = Column(String, nullable=False) # Data dari Google Auth
    label = Column(String, nullable=False)
    kategori = Column(String, nullable=False)
    nominal = Column(Numeric(15, 2), nullable=False) # Tipe Numeric untuk uang