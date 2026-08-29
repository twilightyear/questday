from datetime import datetime
from sqlalchemy import Integer, String, Boolean, ForeignKey, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database.orm import Base

class Calendar(Base):
    __tablename__ = "calendar"

    user_id: Mapped[int] = mapped_column(
        ForeignKey("user.user_id"),
        primary_key=True
    )

    year: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
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