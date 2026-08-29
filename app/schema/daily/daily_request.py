from pydantic import BaseModel, EmailStr, Field, field_validator, ValidationError


class DailyCreateRequest(BaseModel):
    month: int
    day: int


class DailyUpdateRequest(BaseModel):
    month: int | None = None
    day: int | None = None