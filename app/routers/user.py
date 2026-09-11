from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy import select
from database.db_connection import get_db
from models.user import User
from auth.password import hash_password, verify_password
from schema.user.user_request import UserSignUpRequest, UserLoginRequest
from schema.user.user_response import UserSignUpResponse
from sqlalchemy.orm import Session
from exceptions.handler import NotFoundException, ConflictException, UnauthorizedException
from fastapi import Request

router = APIRouter(tags=["User"]) #User 라우터

#User 생성
@router.post(
    "/user/signup",
    status_code = status.HTTP_201_CREATED,
    response_model = UserSignUpResponse
)
def signup_user_handler(body: UserSignUpRequest, session: Session = Depends(get_db)):
    stmt = select(User).where(User.email == body.email)
    existing_user = session.scalar(stmt)

    if existing_user:
        raise ConflictException("이미 가입된 이메일입니다.")

    hashed_password = hash_password(body.password)

    user = User(
        email = body.email,
        hashed_password = hashed_password,
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    return user

#User 로그인
@router.post(
    "/user/login",
    status_code = status.HTTP_200_OK
)
def login_user_handler(request:Request, body: UserLoginRequest, session: Session = Depends(get_db)):
    stmt = select(User).where(User.email == body.email)
    user = session.scalar(stmt)

    if not user:
        raise UnauthorizedException("틀린 이메일 혹은 비밀번호입니다.")

    if not verify_password(body.password, user.hashed_password):
        raise UnauthorizedException("틀린 이메일 혹은 비밀번호입니다.")

    request.session["user_id"] = user.user_id
    return {"message" : "로그인에 성공했습니다."}

#User 로그아웃
@router.post(
    "/user/logout",
    status_code = status.HTTP_200_OK
)
def logout_user_handler(request: Request):
    request.session.clear()
    return {"message":"로그아웃에 성공했습니다."}