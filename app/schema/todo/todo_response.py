from pydantic import BaseModel


class TodoResponse(BaseModel):
    todo_id: int
    category: str
    title: str
    content: str
    is_done: bool

    class Config:
        from_attributes = True