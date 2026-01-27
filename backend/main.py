from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, SessionLocal, Base

# --- Routers ---
from auth.router import router as auth_router
from expenses.router import router as expenses_router
from analysis_calender.insight.progress_bar.router import router as progress_bar_router
from setting_analysis.router import router as setting_analysis_router



Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="AI Expense Tracker API",
    description="Backend untuk Knowledge Discovery in Database Pengeluaran Mahasiswa",
    version="1.0.0"
)


# --- Pengaturan Keamanan (CORS) ---

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app.include_router(expenses_router)

app.include_router(auth_router)

app.include_router(setting_analysis_router)

app.include_router(progress_bar_router)