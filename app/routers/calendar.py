from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy import select
from database.db_connection import SessionFactory, get_db
from models.calendar import Calendar
from auth.password import hash_password, verify_password
from schema.calendar.calendar_request import CalendarCreateRequest, CalendarUpdateRequest
from schema.calendar.calendar_response import CalendarResponse
from sqlalchemy.orm import Session

router = APIRouter(tags=["Calendar"])


#user_id 에 해당하는 달력 전부 가져오기
@router.get(
    "/calendars",
    response_model = list[CalendarResponse],
    status_code = status.HTTP_200_OK,
    summary = "특정 유저의 전체 달력 조회"
)
def get_calendars_handler(user_id: int, session : Session = Depends(get_db)):
    stmt = select(Calendar).where(Calendar.user_id == user_id)
    calendars = session.execute(stmt).scalars().all()
    return calendars


#user_id 에 해당하는 달력중에서 특정 달력만 가져오기
@router.get(
    "/calendars/{year}",
    response_model = CalendarResponse,
    status_code = status.HTTP_200_OK,
    summary = "특정 유저의 특정 달력 조회"
)
def get_calendar_handler(user_id: int, year: int, session : Session = Depends(get_db)):
    #존재하는 달력인지 검사 (404 NOT FOUND)
    existing_calendar = session.query(Calendar).filter(
        Calendar.year == year,
        Calendar.user_id == user_id
    ).first()

    if not existing_calendar:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 달력입니다."
        )

    return existing_calendar


#user_id 에 해당하는 달력 생성
@router.post(
    "/calendars",
    response_model = CalendarResponse,
    status_code = status.HTTP_201_CREATED,
    summary = "특정 유저의 특정 달력 생성"
)
def create_calendar_handler(body: CalendarCreateRequest, user_id: int, session : Session = Depends(get_db)):
    #동일한 연도의 달력이 존재하는지 중복 검사 (409 CONFLICT)
    existing_calendar = session.query(Calendar).filter(
        Calendar.user_id == user_id,
        Calendar.year == body.year
    ).first()

    if existing_calendar:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="이미 존재하는 달력입니다."
        )

    calendar = Calendar(
        user_id = user_id,
        year = body.year
    )

    session.add(calendar)
    session.commit()
    session.refresh(calendar)

    return calendar


#user_id 에 해당하는 달력 삭제
@router.delete(
    "/calendars/{year}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary = "특정 유저의 특정 달력 삭제"
)
def delete_calendar_handler(year: int, user_id: int, session : Session = Depends(get_db)):
    #존재하는 달력인지 검사 (404 NOT FOUND)
    existing_calendar = session.query(Calendar).filter(
        Calendar.year == year,
        Calendar.user_id == user_id
    ).first()

    if not existing_calendar:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 달력입니다."
        )

    session.delete(existing_calendar)
    session.commit()

    return None


#user_id 에 해당하는 달력 전부 삭제
@router.delete(
    "/calendars",
    status_code=status.HTTP_204_NO_CONTENT,
    summary = "특정 유저의 모든 달력 삭제"
)
def delete_calendars_handler(user_id: int, session : Session = Depends(get_db)):
    stmt = select(Calendar).where(Calendar.user_id == user_id)
    calendars = session.execute(stmt).scalars().all()

    for calendar in calendars:
        session.delete(calendar)
    
    session.commit()

    return