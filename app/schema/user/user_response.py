from pydantic import BaseModel
from schema.calendar.calendar_response import CalendarResponse
from datetime import datetime

class UserResponse(BaseModel):
    user_id: int
    email: str
    calendars: list[CalendarResponse] = []

    class Config:
        from_attributes = True

class UserSignUpResponse(BaseModel):
    user_id: int
    email: str
    created_at: datetime