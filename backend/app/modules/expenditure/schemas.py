from pydantic import BaseModel, ConfigDict
from datetime import date
from decimal import Decimal

class ExpenditureCreate(BaseModel):

    user_id: str
    date: date
    type_of_expenditure: str
    label: str
    category: str
    amount: Decimal

class ExpenditureResponse(ExpenditureCreate):

    id: int
    
    model_config = ConfigDict(from_attributes=True)