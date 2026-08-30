from fastapi import HTTPException, APIRouter, Depends
from sqlalchemy import select
from starlette import status
from database.db_connection import SessionFactory, get_db
from models.user import User
from models.calendar import Calendar
from models.daily import Daily
from models.category import Category
from models.todo import Todo
from schema.todo.todo_request import TodoCreateRequest, TodoUpdateRequest
from schema.todo.todo_response import TodoResponse
from sqlalchemy.orm import Session

router = APIRouter(tags = ["Todo"]) #Todo 라우터

#전체 Todo 조회
@router.get(
    "/users/{user_id}/calendars/{year}/dailies/{month}/{day}/category/{category_id}/todo",
    response_model = list[TodoResponse],
    status_code = status.HTTP_200_OK,
    summary = "전체 Todo 조회"
)
def get_todos_handler(user_id: int, year: int, month: int, day: int, category_id: int, session : Session = Depends(get_db)):
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
    existing_calendar = session.execute(
        select(Calendar).where(
            Calendar.user_id == user_id,
            Calendar.year == year
        )
    ).scalar_one_or_none()

    if not existing_calendar:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 달력입니다."
        )

    #존재하는 날짜인지 검사 (404 NOT FOUND)
    existing_daily = session.execute(
        select(Daily).where(
            Daily.calendar_id == existing_calendar.calendar_id,
            Daily.month == month,
            Daily.day == day
        )
    ).scalar_one_or_none()

    if not existing_daily:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 날짜입니다."
        )
    
    #존재하는 카테고리인지 검사 (404 NOT FOUND)
    existing_category = session.execute(
        select(Category).where(
            Category.daily_id == existing_daily.daily_id,
            Category.category_id == category_id
        )
    ).scalar_one_or_none()

    if not existing_category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 카테고리입니다."
        )

    #존재하는 모든 Todo 조회 (없으면 빈 리스트 반환)
    existing_todos = session.execute(
        select(Todo).where(
            Todo.category_id == existing_category.category_id
        )
    ).scalars().all()

    return existing_todos

#단일 Todo 생성
@router.post(
    "/users/{user_id}/calendars/{year}/dailies/{month}/{day}/category/{category_id}/todo",
    response_model = TodoResponse,
    status_code = status.HTTP_201_CREATED,
    summary = "단일 Todo 생성"
)
def create_todo_handler(body: TodoCreateRequest, user_id: int, year: int, month: int, day: int, category_id: int, session : Session = Depends(get_db)):
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
    existing_calendar = session.execute(
        select(Calendar).where(
            Calendar.user_id == user_id,
            Calendar.year == year
        )
    ).scalar_one_or_none()

    if not existing_calendar:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 달력입니다."
        )

    #존재하는 날짜인지 검사 (404 NOT FOUND)
    existing_daily = session.execute(
        select(Daily).where(
            Daily.calendar_id == existing_calendar.calendar_id,
            Daily.month == month,
            Daily.day == day
        )
    ).scalar_one_or_none()

    if not existing_daily:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 날짜입니다."
        )
    
    #존재하는 카테고리인지 검사 (404 NOT FOUND)
    existing_category = session.execute(
        select(Category).where(
            Category.daily_id == existing_daily.daily_id,
            Category.category_id == category_id
        )
    ).scalar_one_or_none()

    if not existing_category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 카테고리입니다."
        )

    #할일 추가
    todo = Todo(
        category_id = existing_category.category_id,
        title = body.title,
        content = body.content,
        is_done = body.is_done
    )

    session.add(todo)
    session.commit()
    session.refresh(todo)

    return todo

#단일 Todo 삭제
@router.delete(
    "/users/{user_id}/calendars/{year}/dailies/{month}/{day}/category/{category_id}/todo/{todo_id}",
    status_code = status.HTTP_204_NO_CONTENT,
    summary = "단일 Todo 삭제"
)
def delete_todo_handler(user_id: int, year: int, month: int, day: int, category_id: int, todo_id: int, session : Session = Depends(get_db)):
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
    existing_calendar = session.execute(
        select(Calendar).where(
            Calendar.user_id == user_id,
            Calendar.year == year
        )
    ).scalar_one_or_none()

    if not existing_calendar:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 달력입니다."
        )

    #존재하는 날짜인지 검사 (404 NOT FOUND)
    existing_daily = session.execute(
        select(Daily).where(
            Daily.calendar_id == existing_calendar.calendar_id,
            Daily.month == month,
            Daily.day == day
        )
    ).scalar_one_or_none()

    if not existing_daily:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 날짜입니다."
        )
    
    #존재하는 카테고리인지 검사 (404 NOT FOUND)
    existing_category = session.execute(
        select(Category).where(
            Category.daily_id == existing_daily.daily_id,
            Category.category_id == category_id
        )
    ).scalar_one_or_none()

    if not existing_category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 카테고리입니다."
        )

    #존재하는 할일인지 검사 (404 NOT FOUND)
    existing_todo = session.execute(
        select(Todo).where(
            Todo.category_id == existing_category.category_id,
            Todo.todo_id == todo_id
        )
    ).scalar_one_or_none()

    if not existing_todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 할일입니다."
        )

    #할일 삭제
    session.delete(existing_todo)
    session.commit()

    return None

#전체 Todo 삭제
@router.delete(
    "/users/{user_id}/calendars/{year}/dailies/{month}/{day}/category/{category_id}/todo",
    status_code = status.HTTP_204_NO_CONTENT,
    summary = "전체 Todo 삭제"
)
def delete_todos_handler(user_id: int, year: int, month: int, day: int, category_id: int, session : Session = Depends(get_db)):
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
    existing_calendar = session.execute(
        select(Calendar).where(
            Calendar.user_id == user_id,
            Calendar.year == year
        )
    ).scalar_one_or_none()

    if not existing_calendar:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 달력입니다."
        )

    #존재하는 날짜인지 검사 (404 NOT FOUND)
    existing_daily = session.execute(
        select(Daily).where(
            Daily.calendar_id == existing_calendar.calendar_id,
            Daily.month == month,
            Daily.day == day
        )
    ).scalar_one_or_none()

    if not existing_daily:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 날짜입니다."
        )
    
    #존재하는 카테고리인지 검사 (404 NOT FOUND)
    existing_category = session.execute(
        select(Category).where(
            Category.daily_id == existing_daily.daily_id,
            Category.category_id == category_id
        )
    ).scalar_one_or_none()

    if not existing_category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 카테고리입니다."
        )

    #존재하는 할일인지 검사 (404 NOT FOUND)
    existing_todos = session.execute(
        select(Todo).where(
            Todo.category_id == existing_category.category_id
        )
    ).scalars().all()

    if not existing_todos:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="존재하지 않는 할일입니다."
        )

    #할일 삭제
    for todo in existing_todos:
        session.delete(todo)

    session.commit()

    return None

#단일 Todo 수정