# MOVIE BOX (Javascript Project)

바닐라 자바스크립트\_영화 검색 사이트

<br>

## 🖥️ 프로젝트 소개

TMDB openAPI를 이용하여 만든 영화 검색 사이트입니다.

<br>

## 🕰️ 개발 기간

- 24.01.10 - 24.01.15 (6일간)

### 🧑‍🤝‍🧑 맴버구성

- 팀장 : 유한빈
  - 메인화면 검색(검색 API 사용)
  - 상세정보화면 API 데이터 불러오기 및 렌더링
  - localStorage를 활용한 댓글 CRUD
  - webpack 및 babel 적용
- 팀원1 : 곽인해
  - 메인페이지의 영화 카드 추천순/ 평점순 정렬
  - 영화 카드 및 이미지 UI 수정
- 팀원2 : 신준석
  - 메인페이지, 상세페이지의 전체적인 틀 작성
  - TMDB OpenAPI를 이용한 주요 출연진 표현
- 팀원3 : 김현주
  - 헤더 인풋창,검색창, 로고 css 수정
  - 푸터 생성
  - 메인페이지로 화면이동

### ⚙️ 개발 환경

- `Vanilla javascript`, HTML5, CSS3
- **Framework** : Bootstrap(5.3.2)
- **Database** : Local Storage
- **environment** : Visual Studio Code, git, github
- **communication** : figma, slack, notion, zep

<br>

## 🍿 프로젝트 화면 구성 및 기능

- 메인 페이지
  <img width="908" alt="" src="https://github.com/picoloman6/nbc_TMDB/assets/148458439/0dfe7f68-964a-4ca1-b7e4-85db79f72685">

<br>

- 영화 상세 페이지
  <img width="1027" alt="" src="https://github.com/picoloman6/nbc_TMDB/assets/148458439/cc518bca-1297-4c06-828f-e74001531a83">

<br>

- 영화 카드 정렬
  <img width="1021" alt="" src="https://github.com/picoloman6/nbc_TMDB/assets/148458439/421e90bf-ca28-4d2b-b835-5f62d01f71ce">

<br>

- 한줄평 CRUD(작성, 수정, 삭제)
  <img width="1036" alt="" src="https://github.com/picoloman6/nbc_TMDB/assets/148458439/6f777b17-d3c7-49bc-8061-c3afa523a289">

<br>

- footer
  <img width="1138" alt="" src="https://github.com/picoloman6/nbc_TMDB/assets/148458439/e1613012-0b63-4dec-ae96-6718f492992b">

  <br>

## 📌 주요 기능

### 필수 구현사항

1. TMDB openAPI 이용

2. 영화정보 상세 페이지 구현

3. 영화 리뷰(한줄평) 작성 기능 구현

   - local storage 적재

4. github PR(=Pull Request) 사용한 협업

5. 유효성 검사

   - 한줄평 작성 시
   - 메인화면 영화 검색 시

6. 순수 `vanilla javascript` 사용

<br>

### 선택 구현사항

1.  CSS

    - flex, 반응형 구현

2.  상세페이지 한줄평 수정 및 삭제

3.  유효성 검사 - alert이 아닌 input칸 상단/하단에 표시

    - 한줄평 수정, 삭제 시
      <img width="1023" alt="스크린샷 2024-01-15 오후 2 26 56" src="https://github.com/picoloman6/nbc_TMDB/assets/148458439/2fcdcb73-38f1-4a66-9884-2766171661e2">

      <img width="1025" alt="스크린샷 2024-01-15 오후 2 27 52" src="https://github.com/picoloman6/nbc_TMDB/assets/148458439/af599ee7-ca11-4681-8b4b-36fd99f2c7ad">

      <br>

    - 메인화면 영화 검색

      <img width="397" alt="스크린샷 2024-01-15 오후 2 26 20" src="https://github.com/picoloman6/nbc_TMDB/assets/148458439/82eeb883-5587-4c02-8a41-3e0012b6e6d4">

      <img width="406" alt="스크린샷 2024-01-15 오후 2 26 31" src="https://github.com/picoloman6/nbc_TMDB/assets/148458439/527538a8-eb9c-4534-b268-9e581b34bee4">

4.  메인화면 영화 카드 리스트 정렬

    - 추천순, 평점순

         <img width="1021" alt="스크린샷 2024-01-15 오후 12 41 54" src="https://github.com/picoloman6/nbc_TMDB/assets/148458439/229378af-d347-4ebf-8c29-8e9487839af8">

5.  TMDB openAPI 이용하여 상세 페이지 추가사항 가져오기
    - 출연진, 장르, 런타임, 개봉일, 제작비, 월드 박스 오피스
      <img width="290" alt="스크린샷 2024-01-15 오후 12 39 31 복사본" src="https://github.com/picoloman6/nbc_TMDB/assets/148458439/b803db89-b4e8-445c-a5fc-f61dddcc119f">

<br>

## 📝 회고
