from fastapi import HTTPException, APIRouter, Depends
from sqlalchemy import select
from starlette import status
from database.db_connection import SessionFactory, get_db
from models.user import User
from models.calendar import Calendar
from models.daily import Daily
from models.category import Category
from schema.category.category_request import CategoryCreateRequest, CategoryUpdateRequest
from schema.category.category_response import CategoryResponse
from sqlalchemy.orm import Session

router = APIRouter(tags = ["Category"]) #Category 라우터

#전체 Category 조회
@router.get(
    "/users/{user_id}/calendars/{year}/dailies/{month}/{day}/category",
    response_model = list[CategoryResponse],
    status_code = status.HTTP_200_OK,
    summary = "전체 Category 조회"
)
def get_categories_handler(user_id: int, year: int, month: int, day: int, session : Session = Depends(get_db)):
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
    existing_daily = session.query(Daily).filter(
        Daily.calendar_id == existing_calendar.calendar_id,
        Daily.month == month,
        Daily.day == day
    ).first()

    if not existing_daily:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하는 날짜가 없습니다."
        )
    
    existing_categories = session.query(Category).filter(
        Category.daily_id == existing_daily.daily_id
    ).all()

    return existing_categories

#단일 Category 조회
@router.get(
    "/users/{user_id}/calendars/{year}/dailies/{month}/{day}/category/{category_id}",
    response_model = CategoryResponse,
    status_code = status.HTTP_200_OK,
    summary = "단일 Category 조회"
)
def get_category_handler(user_id: int, year: int, month: int, day: int, category_id: int, session : Session = Depends(get_db)):
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
    existing_daily = session.query(Daily).filter(
        Daily.calendar_id == existing_calendar.calendar_id,
        Daily.month == month,
        Daily.day == day
    ).first()

    if not existing_daily:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하는 날짜가 없습니다."
        )
    
    existing_category = session.query(Category).filter(
        Category.daily_id == existing_daily.daily_id,
        Category.category_id == category_id
    ).first()

    if not existing_category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하는 카테고리가 없습니다."
        )

    return existing_category

#단일 Category 생성

#단일 Category 삭제

#전체 Category 삭제

#단일 Category 수정