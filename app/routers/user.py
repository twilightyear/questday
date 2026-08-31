from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy import select
from database.db_connection import get_db
from models.user import User
from auth.password import hash_password, verify_password
from schema.user.user_request import UserSignUpRequest, UserLoginRequest
from schema.user.user_response import UserSignUpResponse
from sqlalchemy.orm import Session

router = APIRouter(tags=["User"]) #User 라우터

#계정 생성
@router.post(
    "/users/signup",
    status_code = status.HTTP_201_CREATED,
    response_model = UserSignUpResponse
)
def signup_user_handler(body: UserSignUpRequest, session: Session = Depends(get_db)):
    stmt = select(User).where(User.email == body.email)
    existing_user = session.scalar(stmt)

    if existing_user:
        raise HTTPException(
            status_code = status.HTTP_409_CONFLICT,
            detail = "이미 가입된 이메일입니다."
        )

    hashed_password = hash_password(body.password)

    user = User(
        email = body.email,
        hashed_password = hashed_password,
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    return user

#사용자 로그인
@router.post(
    "/users/login",
    status_code = status.HTTP_200_OK
)
def login_user_handler(body: UserLoginRequest, session: Session = Depends(get_db)):
    stmt = select(User).where(User.email == body.email)
    user = session.scalar(stmt)

    if not user:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "틀린 이메일 혹은 비밀번호입니다."
        )

    if not verify_password(body.password, user.hashed_password):
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "틀린 이메일 혹은 비밀번호입니다."
        )