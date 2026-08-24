from datetime import datetime
from sqlalchemy import Integer, String, Boolean, ForeignKey, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database.orm import Base

class Daily(Base):
    __tablename__ = "daily"

    daily_id: Mapped[int] = mapped_column(
        primary_key = True,
        autoincrement = True
    )

    calendar_id: Mapped[int] = mapped_column(
        ForeignKey("calendar.calendar_id")
    )

    calendar: Mapped["Calendar"] = relationship(
        back_populates="dailies"
    )

    todos: Mapped[list["Todo"]] = relationship(
        back_populates="daily",
        cascade = "all, delete-orphan"
    )