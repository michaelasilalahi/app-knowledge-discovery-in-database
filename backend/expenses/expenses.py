from sqlalchemy import Column, Integer, String, Date, Numeric
from database import Base

class Expenses(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, nullable=False, index=True)
    date = Column(Date, nullable=False)
    type_of_expenditure = Column(String, nullable=False)
    label = Column(String, nullable=False)
    category = Column(String, nullable=False)
    amount = Column(Numeric, nullable=False)
