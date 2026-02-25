from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class TransactionHistory(BaseModel):

    date: str
    type_of_expenditure: str
    label: str
    category: str
    amount: float

class DataMiningMetrics(BaseModel):

    antecedents: str
    consequents: str
    insight_enrichment: str
    support: float
    confidence: float
    lift: float
    antecedent_support: float
    consequent_support: float
    leverage: float
    conviction: float
    antecedent_types: Optional[str] = None
    consequent_types: Optional[str] = None
    related_transactions: List[TransactionHistory] = [] 

    model_config = ConfigDict(from_attributes=True)