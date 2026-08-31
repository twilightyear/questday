from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy import select
from database.db_connection import get_db
from models.user import User
from models.calendar import Calendar
from schema.calendar.calendar_request import CalendarCreateRequest
from schema.calendar.calendar_response import CalendarResponse
from sqlalchemy.orm import Session

router = APIRouter(tags=["Calendar"])

#전체 Calendar 조회
@router.get(
    "/users/{user_id}/calendars",
    response_model = list[CalendarResponse],
    status_code = status.HTTP_200_OK,
    summary = "전체 Calendar 조회"
)
def get_calendars_handler(user_id: int, session : Session = Depends(get_db)):
    #존재하는 사용자인지 검사 (404 NOT FOUND)
    existing_user = session.execute(
        select(User).where(User.user_id == user_id)
    ).scalar_one_or_none()

    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 사용자입니다."
        )
    
    #존재하는 달력인지 검사 (404 NOT FOUND)
    existing_calendars = session.query(Calendar).filter(
        Calendar.user_id == user_id
    ).all()

    if not existing_calendars:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 달력입니다."
        )

    return existing_calendars

#단일 Calendar 조회
@router.get(
    "/users/{user_id}/calendars/{year}",
    response_model = CalendarResponse,
    status_code = status.HTTP_200_OK,
    summary = "단일 Calendar 조회"
)
def get_calendar_handler(user_id: int, year: int, session : Session = Depends(get_db)):
    #존재하는 사용자인지 검사 (404 NOT FOUND)
    existing_user = session.execute(
        select(User).where(User.user_id == user_id)
    ).scalar_one_or_none()

    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 사용자입니다."
        )

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

#단일 Calendar 생성
@router.post(
    "/users/{user_id}/calendars",
    response_model = CalendarResponse,
    status_code = status.HTTP_201_CREATED,
    summary = "단일 Calendar 생성"
)
def create_calendar_handler(body: CalendarCreateRequest, user_id: int, session : Session = Depends(get_db)):
    #존재하는 사용자인지 검사 (404 NOT FOUND)
    existing_user = session.execute(
        select(User).where(User.user_id == user_id)
    ).scalar_one_or_none()

    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 사용자입니다."
        )
    
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

#단일 Calendar 삭제
@router.delete(
    "/users/{user_id}/calendars/{year}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary = "단일 Calendar 삭제"
)
def delete_calendar_handler(year: int, user_id: int, session : Session = Depends(get_db)):

    #존재하는 사용자인지 검사 (404 NOT FOUND)
    existing_user = session.execute(
        select(User).where(User.user_id == user_id)
    ).scalar_one_or_none()

    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 사용자입니다."
        )

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

#전체 Calendar 삭제
@router.delete(
    "/users/{user_id}/calendars",
    status_code=status.HTTP_204_NO_CONTENT,
    summary = "전체 Calendar 삭제"
)
def delete_calendars_handler(user_id: int, session : Session = Depends(get_db)):
    #존재하는 사용자인지 검사 (404 NOT FOUND)
    existing_user = session.execute(
        select(User).where(User.user_id == user_id)
    ).scalar_one_or_none()

    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 사용자입니다."
        )

    stmt = select(Calendar).where(Calendar.user_id == user_id)
    calendars = session.execute(stmt).scalars().all()

    for calendar in calendars:
        session.delete(calendar)
    
    session.commit()

    return