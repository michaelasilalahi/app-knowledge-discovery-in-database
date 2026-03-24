from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from . import service, schemas

router = APIRouter(
    prefix="/visualization",
    tags=["Visualisasi Bar Chart"]
)

@router.get("/bar-chart/{user_id}", response_model=schemas.BarChartResponse)
def get_bar_chart_data(
    user_id: str,
    month: int,
    year: int,
    db: Session = Depends(get_db)
):
    return service.get_needs_wants_summary(db, user_id, month, year)