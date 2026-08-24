from pydantic import BaseModel, EmailStr, Field, field_validator, ValidationError


class CalendarCreateRequest(BaseModel):
    year: int


class CalendarUpdateRequest(BaseModel):
    year: int | None = None