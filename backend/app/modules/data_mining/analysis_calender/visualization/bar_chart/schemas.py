from pydantic import BaseModel, ConfigDict

class BarChartResponse(BaseModel):

    amount_needs: int     
    amount_wants: int 
    count_needs: int
    count_wants: int
    total_expense: int

    model_config = ConfigDict(from_attributes=True)


