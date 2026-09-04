from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL 환경 변수가 설정되지 않았습니다.")

engine = create_engine(DATABASE_URL, echo = True)

# 엔진을 이용한 데이터베이스 통신 창구
SessionFactory = sessionmaker(
    autocommit = False, #자동 커밋 비활성화
    autoflush = False, #자동 값 넣기 비활성화
    expire_on_commit = False, #커밋 이후 값 자동 삭제 비활성화
    bind = engine #데이터베이스 통로와 링크
)

def get_db():
    session = SessionFactory()
    try:
        yield session
    finally:
        session.close()