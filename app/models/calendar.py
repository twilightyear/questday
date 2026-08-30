from datetime import datetime
from sqlalchemy import Integer, String, Boolean, ForeignKey, DateTime, func, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database.orm import Base

class Calendar(Base):
    __tablename__ = "calendar"

    calendar_id: Mapped[int] = mapped_column(
        primary_key = True,
        autoincrement = True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("user.user_id", ondelete = "CASCADE")
    )

    year: Mapped[int] = mapped_column()

    __table_args__ = (
        UniqueConstraint("user_id", "year", name="uq_user_calendar_year"),
    )

    #가상속성 : user
    user: Mapped["User"] = relationship(
        back_populates="calendars"
    )

    #가상속성 : user
    dailies: Mapped[list["Daily"]] = relationship(
        back_populates="calendar",
        cascade = "all, delete-orphan"
    ) 