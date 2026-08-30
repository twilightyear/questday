from datetime import datetime
from sqlalchemy import Integer, String, Boolean, ForeignKey, DateTime, func, ForeignKeyConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database.orm import Base

#Todo 테이블 구조
class Todo(Base):
    __tablename__ = 'todo'

    todo_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    category_id: Mapped[int] = mapped_column(
        ForeignKey("category.category_id", ondelete="CASCADE")
    )

    category: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    content: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    is_done: Mapped[bool] = mapped_column(
        Boolean,
        nullable = False,
    )

    category: Mapped["Category"] = relationship(
        back_populates = "todos" #사용자 테이블과 관계 설정 (객체 연결)
    )