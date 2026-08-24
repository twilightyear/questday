from pydantic import BaseModel, EmailStr, Field, field_validator, ValidationError


class TodoCreateRequest(BaseModel): #할일 생성시의 데이터 규칙
    title: str
    is_done: bool = False


class TodoUpdateRequest(BaseModel): #할일 업데이트시의 데이터 규칙
    title: str | None = None
    is_done: bool | None = None