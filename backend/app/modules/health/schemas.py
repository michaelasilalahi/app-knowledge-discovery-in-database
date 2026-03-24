from pydantic import BaseModel


class HealthCheckResponse(BaseModel):
    status: str
    commit_hash: str
