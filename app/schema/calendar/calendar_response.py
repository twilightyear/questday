from pydantic import BaseModel
from schema.daily.response import DailyResponse


class CalendarResponse(BaseModel):
    year: int
    dailies: list[DailyResponse] = []

    class Config:
        from_attributes = True