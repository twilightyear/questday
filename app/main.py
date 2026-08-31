from fastapi import FastAPI
from database.db_connection import engine
from database.orm import Base
from routers.user import router as user_router
from routers.calendar import router as calendar_router
from routers.daily import router as daily_router
from routers.category import router as category_router
from routers.todo import router as todo_router
from exceptions.handler import add_exception_handlers

#데이터베이스 연결 및 동기화
#Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind = engine)

#서버 객체 생성
app = FastAPI()

#Router 장착
app.include_router(user_router)
app.include_router(calendar_router)
app.include_router(daily_router)
app.include_router(category_router)
app.include_router(todo_router)

add_exception_handlers(app)