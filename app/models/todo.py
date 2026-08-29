from datetime import datetime
from sqlalchemy import Integer, String, Boolean, ForeignKey, DateTime, func, ForeignKeyConstraint
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

    user_id: Mapped[int] = mapped_column(Integer, nullable=False)
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    month: Mapped[int] = mapped_column(Integer, nullable=False)
    day: Mapped[int] = mapped_column(Integer, nullable=False)

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    is_done: Mapped[bool] = mapped_column(
        Boolean,
        nullable = False,
        default = False
    )

    __table_args__ = (
        ForeignKeyConstraint(
            ["user_id", "year","month","day"], 
            ["daily.user_id", "daily.year", "daily.month", "daily.day"],
            ondelete="CASCADE"
        ),
    )

    daily: Mapped["Daily"] = relationship(
        back_populates = "todos" #사용자 테이블과 관계 설정 (객체 연결)
    )