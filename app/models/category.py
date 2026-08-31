from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database.orm import Base

#Category 테이블 구조
class Category(Base):
    __tablename__ = 'category'

    category_id: Mapped[int] = mapped_column(
        primary_key=True, autoincrement=True
    )

    daily_id: Mapped[int] = mapped_column(
        ForeignKey("daily.daily_id", ondelete="CASCADE")
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    color: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    daily: Mapped["Daily"] = relationship(
        back_populates="categories"
    )

    todos: Mapped[list["Todo"]] = relationship(
        back_populates="category",
        cascade = "all, delete-orphan"
    )