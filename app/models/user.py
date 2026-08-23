from datetime import datetime
from sqlalchemy import Integer, String, Boolean, ForeignKey, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database.orm import Base

#User 테이블 구조
class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(
        primary_key = True
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique = True,
        index = True, #목차생성
        nullable = False
    )

    hashed_password: Mapped[str] = mapped_column(
        String(255),
        nullable = False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime, #시간
        server_default = func.now(), #현재시간
        nullable = False
    )

    todos: Mapped[list["Todo"]] = relationship(
        back_populates = "user", #할일 테이블과 관계 설정 (객체 연결)
        cascade = "all, delete-orphan" #관련 테이블까지 전부 삭제
    )