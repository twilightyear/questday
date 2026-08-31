from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database.orm import Base

#Calendar 테이블 구조
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

    user: Mapped["User"] = relationship(
        back_populates="calendars"
    )

    dailies: Mapped[list["Daily"]] = relationship(
        back_populates="calendar",
        cascade = "all, delete-orphan"
    ) 