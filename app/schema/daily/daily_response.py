from pydantic import BaseModel
from schema.todo.todo_response import TodoResponse


class DailyResponse(BaseModel):
    month: int
    day: int
    todos: list[TodoResponse] = []

    class Config:
        from_attributes = True