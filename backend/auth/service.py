from sqlalchemy.orm import Session
from . import googleAuth, schemas

def get_or_create_user(db: Session, user_data: schemas.UsersLogin):
    # 1. Cek user lama
    existing_user = db.query(googleAuth.Users).filter(googleAuth.Users.google_id == user_data.google_id).first()
    
    if existing_user:
        # UPDATE data user lama
        existing_user.email = user_data.email
        existing_user.full_name = user_data.full_name
        existing_user.photo_url = user_data.photo_url
        
        db.commit()
        db.refresh(existing_user)
        return existing_user
    else:
        # CREATE user baru
        new_user = googleAuth.Users(
            google_id=user_data.google_id,
            email=user_data.email,
            full_name=user_data.full_name,
            photo_url=user_data.photo_url
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user