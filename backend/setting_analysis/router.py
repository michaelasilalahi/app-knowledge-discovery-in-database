from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from . import schemas, service

router = APIRouter(
    prefix="/setting_analysis",
    tags=["Setting Analysis"],
)

@router.post("/", response_model=schemas.SettingAnalysisResponse)
def save_analysis_setting(
    setting_analysis: schemas.SettingAnalysisCreate,
    db: Session = Depends(get_db)
):
    try:
        return service.create_or_update_setting(db=db, setting_analysis=setting_analysis)
    except Exception as e:
        print(f"Error saving setting: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/{user_id}/active", response_model=schemas.SettingAnalysisResponse | None)
def get_user_active_setting(
    user_id: str,
    db: Session = Depends(get_db)
):
    setting_analysis = service.get_active_settings(db=db, user_id=user_id)
    if not setting_analysis:
        return None
    return setting_analysis
    