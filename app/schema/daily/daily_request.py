from pydantic import BaseModel, EmailStr, Field, field_validator, ValidationError


class DailyCreateRequest(BaseModel):
    year: int
    month: int
    day: int


class DailyUpdateRequest(BaseModel):
    year: int | None = None
    month: int | None = None
    day: int | None = None