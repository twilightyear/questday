# Node.js 공식 이미지 사용
FROM node:20-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 패키지 설치
RUN npm install

# 소스 코드 전체 복사
COPY . .

# 개발 서버 외부 접속 허용을 위해 포트 오픈 및 실행 (Vite 기준)
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]