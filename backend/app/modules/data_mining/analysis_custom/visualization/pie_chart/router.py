from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from datetime import date
from app.core.database import get_db
from . import service, schemas

router = APIRouter(
    prefix="/custom_visualization/pie_chart",
    tags=["Custom Visualisasi Pie Chart"]
)

@router.get("/{user_id}", response_model=schemas.PieChartResponse)
def get_custom_pie_chart_data(
    user_id: str,
    start_date: date = Query(...),
    end_date: date = Query(...),
    db: Session = Depends(get_db)
):
    return service.get_custom_label_distribution_summary(db, user_id, start_date, end_date)