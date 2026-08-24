from datetime import datetime
from sqlalchemy import Integer, String, Boolean, ForeignKey, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database.orm import Base

#User 테이블 구조
class User(Base):
    __tablename__ = "user"

    user_id: Mapped[int] = mapped_column(
        Integer,
        primary_key = True,
        autoincrement = True
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique = True,
        index = True, #목차생성
        nullable = False
    )

    hashed_password: Mapped[str] = mapped_column(
        String(255),
        nullable = False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default = func.now(), #현재시간
        nullable = False
    )

    calendars: Mapped[list["Calendar"]] = relationship(
        back_populates="user",
        cascade = "all, delete-orphan"
    )