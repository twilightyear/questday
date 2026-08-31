from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse

class CustomException(Exception):
    def __init__(self, status_code: int, message: str):
        self.status_code = status_code
        self.message = message
    
class NotFoundException(CustomException):
    def __init__(self, message: str = "요청한 리소스를 찾을 수 없습니다."):
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, message=message)

class ConflictException(CustomException):
    def __init__(self, message: str = "요청이 충돌했습니다."):
        super().__init__(status_code=status.HTTP_409_CONFLICT, message=message)

class UnauthorizedException(CustomException):
    def __init__(self, message: str = "인증되지 않은 요청입니다."):
        super().__init__(status_code=status.HTTP_401_UNAUTHORIZED, message=message)

def add_exception_handlers(app: FastAPI):
    
    @app.exception_handler(CustomException)
    async def custom_exception_handler(request: Request, exc: CustomException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "message": exc.message,
            },
        )