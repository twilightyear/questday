from datetime import datetime
from sqlalchemy import Integer, String, Boolean, ForeignKey, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database.orm import Base

class Calendar(Base):
    __tablename__ = "calendar"

    calendar_id: Mapped[int] = mapped_column(
        primary_key = True,
        autoincrement = True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("user.user_id")
    )

    user: Mapped["User"] = relationship(
        back_populates="calendars"
    )

    dailies: Mapped[list["Daily"]] = relationship(
        back_populates="calendar",
        cascade = "all, delete-orphan"
    )