from pydantic import BaseModel, EmailStr, Field, field_validator, ValidationError


class DailyCreateRequest(BaseModel):
    month: int
    day: int