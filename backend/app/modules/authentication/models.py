from sqlalchemy import Column, String, TIMESTAMP
from sqlalchemy.sql import func
from app.core.database import Base

class Users(Base):
    
    __tablename__ = "users"

    google_id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    full_name = Column(String, nullable=False)
    photo_url = Column(String, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
