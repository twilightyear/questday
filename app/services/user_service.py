
from models.todo import Todo
from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy import select
from database.db_connection import get_db
from models.user import User
from models.daily import Daily
from models.category import Category
from auth.password import hash_password, verify_password
from schema.user.user_request import UserSignUpRequest, UserLoginRequest
from schema.user.user_response import UserSignUpResponse
from sqlalchemy.orm import Session
from exceptions.handler import NotFoundException, ConflictException, UnauthorizedException
from fastapi import Request

def check_user_xp_and_point(user_id, session, daily_id):
    #존재하는 User 인지 확인 (방어 코드)
    existing_user = session.execute(
        select(User).where(
            User.user_id == user_id
        )
    ).scalar_one_or_none()

	#존재하지 않는 User 라면
    if not existing_user:
        raise NotFoundException("존재하지 않는 user_id 입니다.")

	#특정 Daily 에 대한 카테고리들 전부 조회
    categories = session.execute(
        select(Category).where(Category.daily_id == daily_id)
    ).scalars().all()

	#아무것도 없다면 마무리
    if not categories:
        return
    
    #카테고리의 모든 category_id 배열화
    category_ids = [c.category_id for c in categories]

	#모든 카테고리에 대하여 Todo 선택
    todos = session.execute(
        select(Todo).where(Todo.category_id.in_(category_ids))
    ).scalars().all()

	#Todo 가 없다면 마무리
    if not todos:
        return

	#Todo 의 모든 is_done 조회
    all_done = all(t.is_done for t in todos)
    
    #Todo 가 전부 is_done = True 가 아니라면 마무리
    if not all_done:
        return

	#Daily 의 is_rewarded 가 참이라면 마무리
    daily = session.get(Daily, daily_id)
    if daily.is_rewarded:
        return 

    #is_rewarded 참으로 설정하고 값 연산
    daily.is_rewarded = True
    prev_user_level = existing_user.xp // 100
    existing_user.xp += 20

    user_level = existing_user.xp // 100
    
    if(user_level > prev_user_level):
        existing_user.point += 500

    session.commit()
    return

