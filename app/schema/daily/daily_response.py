from pydantic import BaseModel
from schema.category.category_response import CategoryResponse


class DailyResponse(BaseModel):
    month: int
    day: int
    todos: list[CategoryResponse] = []

    class Config:
        from_attributes = True