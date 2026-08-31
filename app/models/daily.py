from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database.orm import Base

#Daily 테이블 구조
class Daily(Base):
    __tablename__ = "daily"

    daily_id: Mapped[int] = mapped_column(
        primary_key = True,
        autoincrement=True
    )

    calendar_id: Mapped[int] = mapped_column(
        ForeignKey("calendar.calendar_id", ondelete="CASCADE")
    )

    month: Mapped[int] = mapped_column()

    day: Mapped[int] = mapped_column()

    __table_args__ = (
        UniqueConstraint("calendar_id", "month", "day", name="uq_calendar_daily_date"),
    )

    calendar: Mapped["Calendar"] = relationship(
        back_populates="dailies"
    )

    categories: Mapped[list["Category"]] = relationship(
        back_populates="daily",
        cascade = "all, delete-orphan"
    )