from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

class UsersCreate(BaseModel):

    google_id: str
    email: str
    full_name: str
    photo_url: Optional[str] = None

class UsersResponse(UsersCreate):

    created_at: Optional[datetime] = None
    
    model_config = ConfigDict(from_attributes=True)