from pydantic import BaseModel

class TodoCreateRequest(BaseModel): #할일 생성시의 데이터 규칙
    title: str
    content: str
    is_done: bool = False

class TodoUpdateRequest(BaseModel): #할일 업데이트시의 데이터 규칙
    title: str | None = None
    content: str | None = None
    is_done: bool | None = None