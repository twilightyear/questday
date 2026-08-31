from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy import select
from database.db_connection import get_db
from models.user import User
from models.calendar import Calendar
from models.daily import Daily
from sqlalchemy.orm import Session
from schema.daily.daily_request import DailyCreateRequest, DailyUpdateRequest
from schema.daily.daily_response import DailyResponse
from exceptions.handler import NotFoundException, ConflictException

router = APIRouter(tags=["Daily"])

#전체 Daily 조회
@router.get(
    "/users/{user_id}/calendars/{year}/dailies",
    response_model = list[DailyResponse],
    status_code = status.HTTP_200_OK,
    summary = "전체 Daily 조회"
)
def get_dailies_handler(user_id: int, year: int, session : Session = Depends(get_db)):
    #존재하는 User 인지 검사 (404 NOT FOUND)
    existing_user = session.execute(
        select(User).where(User.user_id == user_id)
    ).scalar_one_or_none()

    if not existing_user:
        raise NotFoundException("존재하지 않는 User 입니다.")

    #존재하는 Calendar 인지 검사 (404 NOT FOUND)
    existing_calendar = session.execute(
            select(Calendar).where(
                Calendar.user_id == user_id,
                Calendar.year == year
            )
    ).scalar_one_or_none()

    if not existing_calendar:
        raise NotFoundException("존재하지 않는 Calendar 입니다.")

    #존재하는 Daily 인지 검사 (404 NOT FOUND)
    existing_dailies = session.execute(
        select(Daily).where(
            Daily.calendar_id == existing_calendar.calendar_id
        )
    ).scalars().all()

    return existing_dailies

#단일 Daily 조회
@router.get(
    "/users/{user_id}/calendars/{year}/dailies/{month}/{day}",
    response_model = DailyResponse,
    status_code = status.HTTP_200_OK,
    summary = "단일 Daily 조회"
)
def get_daily_handler(user_id: int, year: int, month: int, day: int, session : Session = Depends(get_db)):
    #존재하는 User 인지 검사 (404 NOT FOUND)
    existing_user = session.execute(
        select(User).where(User.user_id == user_id)
    ).scalar_one_or_none()

    if not existing_user:
        raise NotFoundException("존재하지 않는 User 입니다.")
    
    #존재하는 Calendar 인지 검사 (404 NOT FOUND)
    existing_calendar = session.execute(
        select(Calendar).where(
            Calendar.user_id == user_id,
            Calendar.year == year
        )
    ).scalar_one_or_none()

    if not existing_calendar:
        raise NotFoundException("존재하지 않는 Calendar 입니다.")

    #존재하는 Daily 인지 검사 (404 NOT FOUND)
    existing_daily = session.execute(
        select(Daily).where(
            Daily.calendar_id == existing_calendar.calendar_id,
            Daily.month == month,
            Daily.day == day
        )
    ).scalar_one_or_none()

    if not existing_daily:
        raise NotFoundException("존재하지 않는 Daily 입니다.")

    return existing_daily

#단일 Daily 생성
@router.post(
    "/users/{user_id}/calendars/{year}/dailies",
    response_model = DailyResponse,
    status_code = status.HTTP_201_CREATED,
    summary = "단일 Daily 생성"
)
def create_daily_handler(body: DailyCreateRequest, user_id: int, year: int, session : Session = Depends(get_db)):
    #존재하는 User 인지 검사 (404 NOT FOUND)
    existing_user = session.execute(
        select(User).where(User.user_id == user_id)
    ).scalar_one_or_none()

    if not existing_user:
        raise NotFoundException("존재하지 않는 User 입니다.")
    
    #존재하는 Calendar 인지 검사 (404 NOT FOUND)
    existing_calendar = session.execute(
        select(Calendar).where(
            Calendar.year == year,
            Calendar.user_id == user_id
        )
    ).scalar_one_or_none()

    if not existing_calendar:
        raise NotFoundException("존재하지 않는 Calendar 입니다.")

    #동일한 Daily 가 존재하는지 중복 검사 (409 CONFLICT)
    existing_daily = session.execute(
        select(Daily).where(
            Daily.calendar_id == existing_calendar.calendar_id,
            Daily.month == body.month,
            Daily.day == body.day
        )
    ).scalar_one_or_none()

    if existing_daily:
        raise ConflictException("이미 존재하는 Daily 입니다.")

    #Daily 추가
    daily = Daily(
        calendar_id = existing_calendar.calendar_id,
        month = body.month,
        day = body.day
    )

    session.add(daily)
    session.commit()
    session.refresh(daily)

    return daily

#단일 Daily 삭제
@router.delete(
    "/users/{user_id}/calendars/{year}/dailies/{month}/{day}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary = "단일 Daily 삭제"
)
def delete_daily_handler(user_id: int, year: int, month: int, day: int, session : Session = Depends(get_db)):
    #존재하는 User 인지 검사 (404 NOT FOUND)
    existing_user = session.execute(
        select(User).where(User.user_id == user_id)
    ).scalar_one_or_none()

    if not existing_user:
        raise NotFoundException("존재하지 않는 User 입니다.")

    #존재하는 Calendar 인지 검사 (404 NOT FOUND)
    existing_calendar = session.execute(
        select(Calendar).where(
            Calendar.year == year,
            Calendar.user_id == user_id
        )
    ).scalar_one_or_none()

    if not existing_calendar:
        raise NotFoundException("존재하지 않는 Calendar 입니다.")

    #존재하는 Daily 인지 검사 (404 NOT FOUND)
    existing_daily = session.execute(
        select(Daily).where(
            Daily.calendar_id == existing_calendar.calendar_id,
            Daily.month == month,
            Daily.day == day
        )
    ).scalar_one_or_none()

    if not existing_daily:
        raise NotFoundException("존재하지 않는 Daily 입니다.")

    #Daily 삭제
    session.delete(existing_daily)
    session.commit()

    return None

#전체 Daily 삭제
@router.delete(
    "/users/{user_id}/calendars/{year}/dailies",
    status_code=status.HTTP_204_NO_CONTENT,
    summary = "전체 Daily 삭제"
)
def delete_dailies_handler(user_id: int, year: int, session : Session = Depends(get_db)):
    #존재하는 User 인지 검사 (404 NOT FOUND)
    existing_user = session.execute(
        select(User).where(User.user_id == user_id)
    ).scalar_one_or_none()

    if not existing_user:
        raise NotFoundException("존재하지 않는 User 입니다.")

    #존재하는 Calendar 인지 검사 (404 NOT FOUND)
    existing_calendar = session.execute(
        select(Calendar).where(
            Calendar.year == year,
            Calendar.user_id == user_id
        )
    ).scalar_one_or_none()

    if not existing_calendar:
        raise NotFoundException("존재하지 않는 Calendar 입니다.")

    #존재하는 Daily 인지 검사 (404 NOT FOUND)
    existing_dailies = session.execute(
        select(Daily).where(
            Daily.calendar_id == existing_calendar.calendar_id
        )
    ).scalars().all()

    if not existing_dailies:
        raise NotFoundException("존재하지 않는 Daily 입니다.")

    #확인된 Dailies 삭제
    for existing_daily in existing_dailies:
        session.delete(existing_daily)

    session.commit()

    return None

#단일 Daily 수정
@router.patch(
    "/users/{user_id}/calendars/{year}/dailies/{month}/{day}",
    response_model = DailyResponse,
    status_code = status.HTTP_200_OK,
    summary = "단일 Daily 수정"
)
def update_daily_handler(body: DailyUpdateRequest, user_id: int, year: int, month: int, day: int, session : Session = Depends(get_db)):
    #존재하는 User 인지 검사 (404 NOT FOUND)
    existing_user = session.execute(
        select(User).where(User.user_id == user_id)
    ).scalar_one_or_none()

    if not existing_user:
        raise NotFoundException("존재하지 않는 User 입니다.")
    
    #존재하는 Calendar 인지 검사 (404 NOT FOUND)
    existing_calendar = session.execute(
        select(Calendar).where(
            Calendar.year == year,
            Calendar.user_id == user_id
        )
    ).scalar_one_or_none()

    if not existing_calendar:
        raise NotFoundException("존재하지 않는 Calendar 입니다.")

    #존재하는 Daily 인지 검사 (404 NOT FOUND)
    existing_daily = session.execute(
        select(Daily).where(
            Daily.calendar_id == existing_calendar.calendar_id,
            Daily.month == month,
            Daily.day == day
        )
    ).scalar_one_or_none()

    if not existing_daily:
        raise NotFoundException("존재하지 않는 Daily 입니다.")

    #바꿀 Daily 가 이미 존재하는 Daily 인지 검사 (409 CONFLICT)
    duplicate_daily = session.execute(
        select(Daily).where(
            Daily.calendar_id == existing_calendar.calendar_id,
            Daily.month == body.month,
            Daily.day == body.day
        )
    ).scalar_one_or_none()

    if duplicate_daily:
        raise ConflictException("이미 존재하는 Daily 입니다.")

    #Daily 수정
    existing_daily.month = body.month
    existing_daily.day = body.day

    session.commit()
    session.refresh(existing_daily)

    return existing_daily