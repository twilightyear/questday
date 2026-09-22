from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.db_connection import engine
from database.orm import Base
from routers.user import router as user_router
from routers.calendar import router as calendar_router
from routers.daily import router as daily_router
from routers.category import router as category_router
from routers.todo import router as todo_router
from exceptions.handler import add_exception_handlers
from starlette.middleware.sessions import SessionMiddleware
import os
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
FRONTEND_URL = os.getenv("FRONTEND_URL")

if not SECRET_KEY:
    raise ValueError("SECRET_KEY 환경 변수가 설정되지 않았습니다.")

if not FRONTEND_URL:
    raise ValueError("FRONTEND_URL 환경 변수가 설정되지 않았습니다.")

#데이터베이스 연결 및 동기화
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Router 장착
app.include_router(user_router)
app.include_router(calendar_router)
app.include_router(daily_router)
app.include_router(category_router)
app.include_router(todo_router)

add_exception_handlers(app)

app.add_middleware(
    SessionMiddleware,
    secret_key=SECRET_KEY
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)