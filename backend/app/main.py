from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, SessionLocal, Base

# authentication
from app.modules.authentication.router import router as auth_router

# analysis calender
from app.modules.expenditure.calender_cycle_expenditure.router import router as expenses_router
from app.modules.data_mining.analysis_calender.progress_bar.router import router as progress_bar_router
from app.modules.data_mining.analysis_calender.association_rule_learning.router import router as mining_router
from app.modules.data_mining.analysis_calender.visualization.bar_chart.router import router as visualisasi_router
from app.modules.data_mining.analysis_calender.visualization.pie_chart.router import router as pie_chart_router

# analysis custom
from app.modules.data_mining.analysis_custom.progress_bar.router import router as custom_progress_bar_router
from app.modules.expenditure.custom_cycle_expenditure.router import router as custom_expenses_router
from app.modules.data_mining.analysis_custom.visualization.pie_chart.router import router as custom_pie_chart_router
from app.modules.data_mining.analysis_custom.visualization.bar_chart.router import router as custom_visualisasi_router

# setting analysis
from app.modules.analysis_setting.router import router as setting_analysis_router

# data mining result
from app.modules.data_mining.router import router as result_router

# visualization off all time
from app.modules.visualization_off_all_time.router import router as line_chart_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Xpensa",
    description="Backend untuk Knowledge Discovery in Database Pengeluaran Mahasiswa",
    version="1.0.0"
)

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


# analysis custom
app.include_router(custom_progress_bar_router)

app.include_router(expenses_router)

app.include_router(custom_expenses_router)

app.include_router(auth_router)

app.include_router(setting_analysis_router)

app.include_router(progress_bar_router)

app.include_router(mining_router)

app.include_router(result_router)

app.include_router(visualisasi_router)

app.include_router(pie_chart_router)

app.include_router(custom_visualisasi_router)

app.include_router(custom_pie_chart_router)

app.include_router(line_chart_router)
