from datetime import datetime
from pydantic import BaseModel

#Todo 데이터 반환시의 데이터 형식 규칙
class TodoResponse(BaseModel):
    id: int
    title: str
    is_done: bool

#User 회원가입 데이터 반환시의 데이터 형식 규칙
class UserSignUpResponse(BaseModel):
    id: int
    email: str
    created_at: datetime