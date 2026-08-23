from pydantic import BaseModel

class TodoResponse(BaseModel):
    id: int
    title: str
    is_done: bool