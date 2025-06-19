## 프로젝트 소개
사용자가 채팅방마다 키워드를 등록하면 의미 기반 분석을 통해 맞춤형 알림 및 요주의 인물 표시 기능을 제공하는 AI기반 오픈채팅 서비스
## 폴더 구조
<pre>Front/ ├── public/ # 정적 리소스 (index.html, favicon 등) <br>├── src/ <br>│ ├── api/ # Axios 기반 API 통신 모듈 <br>│ ├── assets/ # SVG, 이미지 리소스 <br>│ ├── components/ # 컴포넌트 모음 <br>│ ├──pages/ # 페이지들 <br>│ ├── App.js # 메인 앱 컴포넌트 <br>│ ├── index.js # 진입점 (ReactDOM 렌더링) <br>│ └── global.css # 전체 적용 스타일 <br>├── package.json # 프로젝트 메타데이터 및 의존성 <br>├── netlify.toml # Netlify 배포 설정<br>└── README.md # 문서 파일</pre>
## Tech Stack
🧩 **UI Framework** <br><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"><br>📝 **Language** <br><img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> <br>🎨 **Styling**<br> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> <br>🔧 **Package** <br><img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"> <br>🔗 **Network**<br><img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=react&logoColor=white"> <br>🚀 **Deployment** <br><img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">|

## 실행 방법
### 1. 해당 레포지토리 clone
<pre>https://github.com/2024-fall-ewha-capston-design/Front.git</pre>

### 2. 라이브러리 설치
<pre>npm install</pre>

### 3. 폴더 최상단에 .env 파일 생성 후
<pre>REACT_APP_BASE_URL=                       #백엔드 API 주소
REACT_APP_GOOGLE_AUTH_CLIENT_ID=          #구글 Oauth 클라이언트 ID
REACT_APP_GOOGLE_AUTH_REDIRECT_URI=       #구글 OAuth Redirection URI
REACT_APP_CHAT=                           #채팅 관련 주소
    
해당 내용들 입력
*키 값들은 시제품 제출물 readme에 넣어놨습니다!</pre>

### 4. 실행
<pre>npm start</pre>
기본 포트: http://localhost:3000
* 현재 구글 로그인 redirect_uri가 배포 사이트 링크로 설정되어있어 실제 로그인 후 동작은 배포주소에서 가능합니다.

### 테스트 계정(구글 로그인 계정)
아이디: 2025happycoder@gmail.com
비밀번호: happycoder@

<br>
<br>

## 주요 패키지
| 패키지명                           | 설명                      |
| ------------------------------ | ----------------------- |
| `react`, `react-dom`           | UI 프레임워크                |
| `axios`                        | HTTP 요청 처리              |
| `@stomp/stompjs`               | WebSocket 기반 STOMP 프로토콜 |
| `sockjs-client`                | WebSocket 폴백 처리용        |
| `styled-components`            | CSS-in-JS 스타일링          |
| `react-router-dom`             | 라우팅 처리                  |
| `react-icons` / `lucide-react` | 아이콘 사용                  |

## 배포 사이트
https://chatcipe.vercel.app/login
