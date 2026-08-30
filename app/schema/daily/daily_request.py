from pydantic import BaseModel


class DailyCreateRequest(BaseModel):
    month: int
    day: int

class DailyUpdateRequest(BaseModel):
    month: int | None = None
    day: int | None = None