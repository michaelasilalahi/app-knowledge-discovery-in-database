from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

class SettingAnalysisCreate(BaseModel):
    user_id: str
    month_index: int
    year: int
    is_active: bool
    is_recurring: bool
    analysis_type: str = "calendar"

class SettingAnalysisResponse(BaseModel):
    id: int
    user_id: str
    label_month: int
    label_year: int
    is_active: bool
    is_recurring: bool
    analysis_type: str
    start_date: date
    end_date: date
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
