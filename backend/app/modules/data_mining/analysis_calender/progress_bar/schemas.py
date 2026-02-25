from pydantic import BaseModel, ConfigDict
from typing import Optional

class ProgressBarResponse(BaseModel):
    
    status: str 
    result_id: Optional[int] = None
    currentCount: int
    threshold: int
    percentage: float
    isReady: bool
    message: str

    model_config = ConfigDict(from_attributes=True)