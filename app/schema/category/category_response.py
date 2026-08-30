from pydantic import BaseModel
from schema.todo.todo_response import TodoResponse


class CategoryResponse(BaseModel):
    title: str
    color: str
    todos: list[TodoResponse] = []

    class Config:
        from_attributes = True