from datetime import datetime
from sqlalchemy import Integer, String, Boolean, ForeignKey, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database.orm import Base

#Todo 테이블 구조
class Todo(Base):
    __tablename__ = 'todo'

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key = True,
        autoincrement = True
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    is_done: Mapped[bool] = mapped_column(
        Boolean,
        nullable = False,
        default = False
    )

    daily_id: Mapped[int] = mapped_column(
        ForeignKey('daily.daily_id'),
        nullable = True
    )

    daily: Mapped["Daily"] = relationship(
        back_populates = "todos" #사용자 테이블과 관계 설정 (객체 연결)
    )