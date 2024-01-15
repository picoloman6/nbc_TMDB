# Javascript-Project-MOVIE BOX

바닐라 자바스크립트\_영화 검색 사이트

## 🖥️ 프로젝트 소개

TMDB openAPI를 이용하여 만든 영화 검색 사이트입니다.
<br>

## 🕰️ 개발 기간

- 24.01.10 - 24.01.15 (6일간)

### 🧑‍🤝‍🧑 맴버구성

- 팀장 : 유한빈 - 영화 예매, 영화 업로드, Database Script 제작, 통합 및 형상관리
- 팀원1 : 곽인해 - 영화 카드 추천순/ 평점순 정렬,
- 팀원2 : 신준석 - 메인 페이지, 메인 CSS
- 팀원3 : 김현주 - 1대1 문의 게시판(CRUD), 공지사항 게시판(CRUD)
  로그인, 회원가입, ID찾기, PW찾기, 마이 페이지,메인 페이지, 통합 및 형상관리, PPT제작, 발표

### ⚙️ 개발 환경

- `Java 8`
- `JDK 1.8.0`
- **IDE** : STS 3.9
- **Framework** : Springboot(2.x)
- **Database** : Oracle DB(11xe)
- **ORM** : Mybatis

## 📌 주요 기능

#### 로그인 - <a href="https://github.com/chaehyuenwoo/SpringBoot-Project-MEGABOX/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Login)" >상세보기 - WIKI 이동</a>

- DB값 검증
- ID찾기, PW찾기
- 로그인 시 쿠키(Cookie) 및 세션(Session) 생성

#### 회원가입 - <a href="https://github.com/chaehyuenwoo/SpringBoot-Project-MEGABOX/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Member)" >상세보기 - WIKI 이동</a>

- 주소 API 연동
- ID 중복 체크

#### 마이 페이지 - <a href="https://github.com/chaehyuenwoo/SpringBoot-Project-MEGABOX/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Member)" >상세보기 - WIKI 이동</a>

- 주소 API 연동
- 회원정보 변경

#### 영화 예매 - <a href="https://github.com/chaehyuenwoo/SpringBoot-Project-MEGABOX/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(%EC%98%81%ED%99%94-%EC%98%88%EB%A7%A4)" >상세보기 - WIKI 이동</a>

- 영화 선택(날짜 지정)
- 영화관 선택(대분류/소분류 선택) 및 시간 선택
- 좌석 선택
- 결제 페이지
- 예매 완료

#### 메인 페이지 - <a href="https://github.com/chaehyuenwoo/SpringBoot-Project-MEGABOX/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(%EB%A9%94%EC%9D%B8-Page)" >상세보기 - WIKI 이동</a>

- YouTube API 연동
- 메인 포스터(영화) 이미지 슬라이드(CSS)

#### 1대1문의 및 공지사항 - <a href="" >상세보기 - WIKI 이동</a>

- 글 작성, 읽기, 수정, 삭제(CRUD)

#### 관리자 페이지

- 영화관 추가(대분류, 소분류)
- 영화 추가(상영시간 및 상영관 설정)
