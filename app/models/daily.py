from datetime import datetime
from sqlalchemy import Integer, String, Boolean, ForeignKey, DateTime, func, ForeignKeyConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database.orm import Base

class Daily(Base):
    __tablename__ = "daily"

    daily_id: Mapped[int] = mapped_column(
        primary_key = True,
        autoincrement = True
    )

    user_id: Mapped[int] = mapped_column()
    year: Mapped[int] = mapped_column()

    __table_args__ = (
        ForeignKeyConstraint(
            ["user_id", "year"], 
            ["calendar.user_id", "calendar.year"],
            ondelete="CASCADE"
        ),
    )

    calendar: Mapped["Calendar"] = relationship(
        back_populates="dailies"
    )

    todos: Mapped[list["Todo"]] = relationship(
        back_populates="daily",
        cascade = "all, delete-orphan"
    )