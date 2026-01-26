from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UsersLogin(BaseModel):
    google_id: str
    email: str
    full_name: str
    photo_url: Optional[str] = None

class UsersResponse(UsersLogin):
    created_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True