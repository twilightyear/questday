from fastapi import HTTPException, APIRouter, Depends
from sqlalchemy import select
from starlette import status
from database.db_connection import get_db
from models.user import User
from models.calendar import Calendar
from models.daily import Daily
from models.category import Category
from schema.category.category_request import CategoryCreateRequest, CategoryUpdateRequest
from schema.category.category_response import CategoryResponse
from sqlalchemy.orm import Session
from exceptions.handler import NotFoundException, ConflictException

router = APIRouter(tags = ["Category"]) #Category 라우터

#전체 Category 조회
@router.get(
    "/users/{user_id}/calendars/{year}/dailies/{month}/{day}/category",
    response_model = list[CategoryResponse],
    status_code = status.HTTP_200_OK,
    summary = "전체 Category 조회"
)
def get_categories_handler(user_id: int, year: int, month: int, day: int, session : Session = Depends(get_db)):
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
    
    #존재하는 Category 전부 검사
    existing_categories = session.execute(
        select(Category).where(
            Category.daily_id == existing_daily.daily_id
        )
    ).scalars().all()

    return existing_categories

#단일 Category 조회
@router.get(
    "/users/{user_id}/calendars/{year}/dailies/{month}/{day}/category/{category_id}",
    response_model = CategoryResponse,
    status_code = status.HTTP_200_OK,
    summary = "단일 Category 조회"
)
def get_category_handler(user_id: int, year: int, month: int, day: int, category_id: int, session : Session = Depends(get_db)):
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
    
    #존재하는 Category 인지 검사 (404 NOT FOUND)
    existing_category = session.execute(
        select(Category).where(
            Category.daily_id == existing_daily.daily_id,
            Category.category_id == category_id
        )
    ).scalar_one_or_none()

    if not existing_category:
        raise NotFoundException("존재하지 않는 Category 입니다.")

    return existing_category

#단일 Category 생성
@router.post(
    "/users/{user_id}/calendars/{year}/dailies/{month}/{day}/category",
    response_model = CategoryResponse,
    status_code = status.HTTP_201_CREATED,
    summary = "단일 Category 생성"
)
def create_category_handler(body: CategoryCreateRequest, user_id: int, year: int, month: int, day: int, session : Session = Depends(get_db)):
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

    #동일한 Category 가 존재하는지 중복 검사 (409 CONFLICT)
    existing_category = session.execute(
        select(Category).where(
            Category.daily_id == existing_daily.daily_id,
            Category.title == body.title
        )
    ).scalar_one_or_none()

    if existing_category:
        raise ConflictException("이미 존재하는 Category 입니다.")

    #Category 생성
    category = Category(
        daily_id = existing_daily.daily_id,
        title = body.title,
        color = body.color
    )

    session.add(category)
    session.commit()
    session.refresh(category)

    return category

#단일 Category 삭제
@router.delete(
    "/users/{user_id}/calendars/{year}/dailies/{month}/{day}/category/{category_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary = "단일 Category 삭제"
)
def delete_category_handler(user_id: int, year: int, month: int, day: int, category_id: int, session : Session = Depends(get_db)):
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
    
    #존재하는 Category 인지 검사 (404 NOT FOUND)
    existing_category = session.execute(
        select(Category).where(
            Category.daily_id == existing_daily.daily_id,
            Category.category_id == category_id
        )
    ).scalar_one_or_none()

    if not existing_category:
        raise NotFoundException("존재하지 않는 Category입니다.")

    #Category 삭제
    session.delete(existing_category)
    session.commit()

    return None

#전체 Category 삭제
@router.delete(
    "/users/{user_id}/calendars/{year}/dailies/{month}/{day}/category",
    status_code=status.HTTP_204_NO_CONTENT,
    summary = "전체 Category 삭제"
)
def delete_categories_handler(user_id: int, year: int, month: int, day: int, session : Session = Depends(get_db)):
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

    #존재하는 Category 인지 검사 (404 NOT FOUND)
    existing_categories = session.execute(
        select(Category).where(
            Category.daily_id == existing_daily.daily_id
        )
    ).scalars().all()

    if not existing_categories:
        raise NotFoundException("존재하지 않는 Category 입니다.")

    #발견한 Categories 전부 삭제
    for category in existing_categories:
        session.delete(category)

    session.commit()

    return None 

#단일 Category 수정
@router.patch(
    "/users/{user_id}/calendars/{year}/dailies/{month}/{day}/category/{category_id}",
    response_model = CategoryResponse,
    status_code = status.HTTP_200_OK,
    summary = "단일 Category 수정"
)
def update_category_handler(body: CategoryUpdateRequest, user_id: int, year: int, month: int, day: int, category_id: int, session : Session = Depends(get_db)):
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

    #존재하는 Category 인지 검사 (404 NOT FOUND)
    existing_category = session.execute(
        select(Category).where(
            Category.daily_id == existing_daily.daily_id,
            Category.category_id == category_id
        )
    ).scalar_one_or_none()

    if not existing_category:
        raise NotFoundException("존재하지 않는 Category 입니다.")

    #Category 수정
    existing_category.title = body.title
    existing_category.color = body.color

    session.commit()
    session.refresh(existing_category)

    return existing_category