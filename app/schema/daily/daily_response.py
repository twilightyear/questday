from pydantic import BaseModel
from schema.todo.response import TodoResponse


class DailyResponse(BaseModel):
    year: int
    month: int
    day: int
    todos: list[TodoResponse] = []

    class Config:
        from_attributes = True