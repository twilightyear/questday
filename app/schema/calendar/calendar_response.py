from pydantic import BaseModel
from schema.daily.response import DailyResponse


class CalendarResponse(BaseModel):
    calendar_id: int
    title: str
    dailies: list[DailyResponse] = []

    class Config:
        from_attributes = True