from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from . import service, schemas

router = APIRouter(
    prefix="/insight/visualisasi",
    tags=["visualization PieChart"]
)

@router.get("/pie-chart/{user_id}", response_model=schemas.PieChartResponse)
def get_pie_chart_data(
    user_id: str,
    month: int,
    year: int,
    db: Session = Depends(get_db)
):
    return service.get_label_distribution_summary(db, user_id, month, year)