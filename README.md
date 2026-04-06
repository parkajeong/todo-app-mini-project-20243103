# Todo App Mini Project (20243103) 소프트웨어 공학 개인과제
Project Repository: https://github.com/parkajeong/todo-app-mini-project-20243103.git

___
# Todo App
간단한 할 일 관리 뤱 애플리케이션이다.

- 프론트엔드는 React + Vite로 구성
- 백엔드는 Node.js + Express + MongoDB로 구성

___
## 핵심기능
- 할 일 목록 조회
- 할 일 추가
- 할 일 완료 여부 변경
- 할 일 삭제
- 마감기한 입력 및 표시

___

## 실행방법
### 1. 깃 허브 저장소 클론
```bash
    git clone https://github.com/parkajeong/todo-app-mini-project-20243103.git
    cd todo-app-mini-project-20243103
```
### 2. 벡엔드 실행 
```bash
    cd backend
    npm install
```
.env 파일을 생성하고 아래와 같이 환경변수를 설정

```env
    MONGODB_URI=MongoDB Atlas에서 발급받은 연결 문자열을 입력
```
환경변수 설정 후 터미널에서 다음 명령어 실행
```bash
    npm run dev
```
### 3. 프론트엔드 실행
새 터미널에서 다음 명령어를 실행
```bash
    cd frontend
    npm install
    npm run dev
```
브라우저 접속
```aiignore
    http://localhost:5173
```
___

## 배포된 서비스
- 프론트엔드: https://todo-app-20243103.vercel.app/
- 백엔드 API: https://todo-app-backend-20243103.onrender.com/api/todos

___
## 프로젝트 구조
```
todo-app-mini-project-20243103/
├─ backend/             #서버 및 API
│  ├─ index.js
│  ├─ package.json
│  └─ package-lock.json
├─ frontend/            #사용자 인터페이스
│  ├─ public/
│  ├─ src/
│  │  ├─ assets/
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ index.css
│  │  └─ main.jsx
│  ├─ index.html
│  ├─ package.json
│  └─ vite.config.js
├─ README.md
└─ vercel.json
```
___
- MongoDB Atlas를 사용해 데이터 저장
- Vercel(프론트엔드), Render(백엔드)를 통해 배포