import re
from pydantic import BaseModel, EmailStr, Field, field_validator

class UserSignUpRequest(BaseModel):
    email: EmailStr = Field(..., description="Email address")
    password: str = Field(..., min_length=8, description="Password")

    @field_validator("password")
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
        
class UserLoginRequest(BaseModel):
    email: EmailStr = Field(..., description="이메일 주소")
    password: str = Field(..., min_length=8, description="비밀번호 입력")