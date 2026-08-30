from pydantic import BaseModel, EmailStr, Field, field_validator, ValidationError


class TodoCreateRequest(BaseModel): #할일 생성시의 데이터 규칙
    todo_id: int
    category: str
    title: str
    content: str
    is_done: bool = False


class TodoUpdateRequest(BaseModel): #할일 업데이트시의 데이터 규칙
    category: str | None = None
    title: str | None = None
    content: str | None = None
    is_done: bool | None = None