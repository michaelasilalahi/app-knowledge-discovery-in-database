from pydantic import BaseModel, ConfigDict
from datetime import date, datetime
from typing import Optional

class AnalysisSettingCreate(BaseModel):

    user_id: str
    label_day: Optional[str] = None
    label_month: Optional[str] = None 
    label_year: Optional[int] = None 
    is_active: bool
    is_recurring: bool
    analysis_type: str = "calendar"

class AnalysisSettingResponse(BaseModel):

    id: int
    user_id: str
    label_month: Optional[str] = None
    label_year: Optional[int] = None
    is_active: bool
    is_recurring: bool
    analysis_type: str
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
