from sqlalchemy import Column, Integer, String, Boolean, Date, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base

class AnalysisSetting(Base):

    __tablename__ = "analysis_setting"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.google_id", ondelete="CASCADE"), nullable=False)
    label_month = Column(Integer, nullable=True)
    label_year = Column(Integer, nullable=True)
    is_active = Column(Boolean, nullable=True, default=True)
    is_recurring = Column(Boolean, nullable=True, default=False)
    analysis_type = Column(String, nullable=True)
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), nullable=True, server_default=func.now())
    