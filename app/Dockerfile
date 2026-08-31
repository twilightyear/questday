# 파이썬 공식 이미지 사용
FROM python:3.10-slim

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 소스 코드 전체 복사
COPY . .

# FastAPI 서버 실행 (main.py가 app 폴더 안에 바로 있다고 가정할 때)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]