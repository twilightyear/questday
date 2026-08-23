from pydantic import BaseModel

class TodoCreateRequest(BaseModel):
    title: str
    is_done: bool = False

class TodoUpdateRequest(BaseModel):
    title: str | None = None
    is_done: bool | None = None