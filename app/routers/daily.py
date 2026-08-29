from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy import select
from database.db_connection import SessionFactory, get_db
from models.daily import Daily
from models.user import User
from models.calendar import Calendar
from sqlalchemy.orm import Session
from schema.daily.daily_request import DailyCreateRequest
from schema.daily.daily_response import DailyResponse

router = APIRouter(tags=["Daily"])

#Daily 사용자&연도별 전체 조회
@router.get(
    "/users/{user_id}/calendars/{year}/dailies",
    response_model = list[DailyResponse],
    status_code = status.HTTP_200_OK,
    summary = "특정 유저의 특정 달력에 대한 전체 날짜 조회"
)
def get_dailies_handler(user_id: int, year: int, session : Session = Depends(get_db)):
    #존재하는 사용자인지 검사 (404 NOT FOUND)
    existing_user = session.execute(
        select(User).where(User.user_id == user_id)
    ).scalar_one_or_none()

    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하는 사용자가 없습니다."
        )
    
    #존재하는 달력인지 검사 (404 NOT FOUND)
    existing_calendar = session.query(Calendar).filter(
        Calendar.user_id == user_id,
        Calendar.year == year
    ).first()

    if not existing_calendar:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하는 달력이 없습니다."
        )

    #존재하는 날짜인지 검사 (404 NOT FOUND)
    existing_dailies = session.query(Daily).filter(
        Daily.user_id == user_id,
        Daily.year == year
    ).all()

    return existing_dailies


#Daily 단일 생성
@router.post(
    "/users/{user_id}/calendars/{year}/dailies",
    response_model = DailyResponse,
    status_code = status.HTTP_201_CREATED,
    summary = "특정 유저의 특정 달력 생성"
)
def create_daily_handler(body: DailyCreateRequest, user_id: int, year: int, session : Session = Depends(get_db)):
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

    #동일한 날짜가 존재하는지 중복 검사 (409 CONFLICT)
    existing_daily = session.query(Daily).filter(
        Daily.user_id == user_id,
        Daily.year == year,
        Daily.month == body.month,
        Daily.day == body.day
    ).first()

    if existing_daily:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="이미 존재하는 날짜입니다."
        )

    daily = Daily(
        user_id = user_id,
        year = year,
        month = body.month,
        day = body.day
    )

    session.add(daily)
    session.commit()
    session.refresh(daily)

    return daily