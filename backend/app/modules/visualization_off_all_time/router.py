from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from datetime import date
from . import service, schemas

router = APIRouter(
    prefix="/insight/visualization_off_all_time",
    tags=["Visualization Off All Time"]
)

@router.get("/line-chart-history/{user_id}", response_model=schemas.LineChartResponse)
def get_historical_line_chart(
    user_id: str, 
    db: Session = Depends(get_db),
    month: int = Query(default=date.today().month, ge=1, le=12),
    year: int = Query(default=date.today().year, ge=2000, le=2100),
):
    
    return service.get_visualization_off_all_time(db, user_id, month, year)