from fastapi import APIRouter

from . import schemas, service

router = APIRouter(
    tags=["Health"],
)


@router.get("/health", response_model=schemas.HealthCheckResponse)
def get_health():
    return service.health_check()
