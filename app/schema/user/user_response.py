from pydantic import BaseModel
from schema.calendar.response import CalendarResponse


class UserResponse(BaseModel):
    user_id: int
    email: str
    calendars: list[CalendarResponse] = []

    class Config:
        from_attributes = True