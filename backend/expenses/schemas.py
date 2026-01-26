from pydantic import BaseModel
from datetime import date

class ExpensesCreate(BaseModel):
    user_id: str
    date: date
    type_of_expenditure: str
    label: str
    category: str
    amount: float

class ExpensesResponse(ExpensesCreate):
    id: int
    
    class Config:
        from_attributes = True