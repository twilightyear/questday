from pydantic import BaseModel

class CalendarCreateRequest(BaseModel):
    year: int

class CalendarUpdateRequest(BaseModel):
    year: int | None = None