from sqlalchemy import Column, Integer, String, Boolean, Date, TIMESTAMP, ForeignKey, UniqueConstraint
from sqlalchemy.sql import func
from database import Base

class SettingAnalysis(Base):
    __tablename__ = "analysis_setting"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.google_id", ondelete="CASCADE"), nullable=False)

    label_month = Column(Integer, nullable=False)
    label_year = Column(Integer, nullable=False)

    is_active = Column(Boolean, nullable=False, default=True)
    is_recurring = Column(Boolean, nullable=False, default=False)

    analysis_type = Column(String, nullable=False)

    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)

    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    # Constraint Unik (user tidak bisa mempunyai setting ganda untuk setiap bulan dan tahun)
    __table_args__ = (
        UniqueConstraint('user_id', 'label_month', 'label_year', name='analysis_setting_unique'),
    )
    