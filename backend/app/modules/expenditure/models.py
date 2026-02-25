from sqlalchemy import Column, Integer, String, Date, Numeric
from app.core.database import Base

class Expenditure(Base):
    
    __tablename__ = "expenditure"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, nullable=False, index=True)
    date = Column(Date, nullable=False)
    type_of_expenditure = Column(String, nullable=False)
    label = Column(String, nullable=False)
    category = Column(String, nullable=False)
    amount = Column(Numeric, nullable=False)
