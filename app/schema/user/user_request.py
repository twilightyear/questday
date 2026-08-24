import re
from pydantic import BaseModel, EmailStr, Field, field_validator, ValidationError

class UserSignUpRequest(BaseModel): #회원가입시 데이터 규칙
    email: EmailStr = Field(..., description="Email address")
    password: str = Field(..., min_length=8, description="Password")

    @field_validator("password") #커스텀 필드 제약조건 정의 데코레이터 (비밀번호)
    def validate_password(cls, value):
        if not re.search(r"[A-Z]",value):
            raise ValueError("Password must contain least one uppercase letter")
        if not re.search(r"[a-z]",value):
            raise ValueError("Password must contain least one lowercase letter.")
        if not re.search(r"[0-9]",value):
            raise ValueError("Password must contain least one number")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>_]",value):
            raise ValueError("Password must contain least one special character")
        return value 
        
class UserLoginRequest(BaseModel): #로그인시 데이터 규칙
    email: EmailStr = Field(..., description="Email address")
    password: str = Field(..., min_length=8, description="Password")