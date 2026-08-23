from fastapi import FastAPI
from database.db_connection import engine
from database.orm import Base
from routers.todo import router as todos_router
from routers.user import router as user_router

#데이터베이스 연결 및 동기화
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind = engine)

#서버 객체 생성
app = FastAPI()

#Router 장착
app.include_router(todos_router)
app.include_router(user_router)