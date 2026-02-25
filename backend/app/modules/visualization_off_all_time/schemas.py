from pydantic import BaseModel, ConfigDict
from typing import List

class LineChartCreate(BaseModel):

    date_label: str
    timestamp: str        
    amount_needs: int
    amount_wants: int

class LineChartResponse(BaseModel):

    data: List[LineChartCreate]

    model_config = ConfigDict(from_attributes=True)