from pydantic import BaseModel
from schema.todo.response import TodoResponse


class DailyResponse(BaseModel):
    daily_id: int
    target_date: str
    todos: list[TodoResponse] = []

    class Config:
        from_attributes = True