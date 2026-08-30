from pydantic import BaseModel

class CategoryCreateRequest(BaseModel): #카테고리 생성시의 데이터 규칙
    title: str
    color: str

class CategoryUpdateRequest(BaseModel): #카테고리 업데이트시의 데이터 규칙
    title: str | None = None
    color: str | None = None