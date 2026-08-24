from pydantic import BaseModel


class TodoResponse(BaseModel):
    id: int
    category: str
    job: str
    is_done: bool

    class Config:
        from_attributes = True