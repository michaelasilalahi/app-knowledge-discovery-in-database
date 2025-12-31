from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Tambahkan konfigurasi CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Mengizinkan semua domain, ganti dengan IP spesifik jika sudah production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "connected", "message": "Halo dari FastAPI!"}