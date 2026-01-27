from pydantic import BaseModel
from typing import Optional

class ProgressBarResponse(BaseModel):
    status: str 
    result_id: Optional[int] = None
    currentCount: int
    threshold: int
    percentage: float
    isReady: bool
    message: str

    class Config:
        from_attributes = True