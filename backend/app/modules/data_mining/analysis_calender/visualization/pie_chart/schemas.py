from pydantic import BaseModel, ConfigDict
from typing import List

class PieChartItem(BaseModel):
    label: str
    amount: int
    count: int

class PieChartResponse(BaseModel):
    data: List[PieChartItem]
    total_amount: int
    total_count: int

    model_config = ConfigDict(from_attributes=True)