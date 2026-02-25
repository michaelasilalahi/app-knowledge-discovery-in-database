from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from . import schemas, service

router = APIRouter(
    prefix="/analysis_setting",
    tags=["Analysis Setting"],
)

@router.post("/", response_model=schemas.AnalysisSettingResponse)
def save_analysis_setting(
    setting_analysis: schemas.AnalysisSettingCreate,
    db: Session = Depends(get_db)
):
    
    try:

        return service.create_or_update_setting(db=db, setting_analysis=setting_analysis)
    
    except Exception as e:

        print(f"Error saving setting: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/{user_id}/active", response_model=schemas.AnalysisSettingResponse | None)
def get_user_active_setting(
    user_id: str,
    db: Session = Depends(get_db)
):
    
    analysis_setting = service.get_active_settings(db=db, user_id=user_id)
    
    if not analysis_setting:

        return None
    
    return analysis_setting
    