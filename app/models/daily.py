from datetime import datetime
from sqlalchemy import Integer, String, Boolean, ForeignKey, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database.orm import Base

#Daily 테이블 구조
class Todo(Base):
    __tablename__ = 'daily'