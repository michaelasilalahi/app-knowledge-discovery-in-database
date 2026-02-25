from sqlalchemy.orm import Session
from . import models, schemas

def service(db: Session, user_data: schemas.UsersCreate):

    # cek user lama
    existing_user = db.query(models.Users).filter(models.Users.google_id == user_data.google_id).first()
    
    if existing_user:
        
        # update user lama
        existing_user.email = user_data.email
        existing_user.full_name = user_data.full_name
        existing_user.photo_url = user_data.photo_url
        
        db.commit()
        db.refresh(existing_user)

        return existing_user
    
    else:
        
        # membuat user baru
        new_user = models.Users(
            google_id=user_data.google_id,
            email=user_data.email,
            full_name=user_data.full_name,
            photo_url=user_data.photo_url
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return new_user