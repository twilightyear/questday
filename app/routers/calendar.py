from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy import select
from database.db_connection import SessionFactory, get_db
from models.calendar import Calendar
from auth.password import hash_password, verify_password
from schema.calendar.calendar_request import CalendarCreateRequest, CalendarUpdateRequest
from schema.calendar.calendar_response import CalendarResponse
from sqlalchemy.orm import Session

router = APIRouter(tags=["Calendar"])

#user_id 에 해당하는 달력 가져오기
@router.get(
    "/calendars",
    response_model = list[CalendarResponse],
    status_code = status.HTTP_200_OK
)
def get_calendars_handler(user_id: int, session : Session = Depends(get_db)):
    stmt = select(Calendar).where(Calendar.user_id == user_id)
    calendars = session.execute(stmt).scalars().all()
    return calendars