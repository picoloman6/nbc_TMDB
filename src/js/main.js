import { options } from './utils';
import '../css/reset.css';
import '../css/main.css';

// DOM 요소
const $searchInput = document.querySelector('.search-input');
const $searchBtn = document.querySelector('.search-btn');
const $movieCardList = document.querySelector('#movieCardList');

// // 전역변수 설정
let data;

// 영화 정보 카드 DOM 생성
const createMovieCard = (movie) => {
  const { id, poster_path, title, overview, vote_average } = movie;

  const $wrapper = document.createElement('li');
  const $card = document.createElement('div');
  const $img = document.createElement('img');
  const $body = document.createElement('div');
  const $title = document.createElement('h5');
  const $overview = document.createElement('p');
  const $average = document.createElement('p');

  $wrapper.classList.add('col-md-3', 'mb-4');
  $card.className = 'card';
  $img.className = 'card-img-top';
  $body.className = 'card-body';
  $title.className = 'card-title';
  $overview.className = 'card-text';
  $average.className = 'card-text2';

  $img.src = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  $img.alt = title;

  $wrapper.onclick = function () {
    const stringMovie = JSON.stringify(movie);
    localStorage.setItem('movie', stringMovie);
    location.href = `./detail.html?id=${id}`;
  };

  $title.textContent = title;
  $overview.textContent = overview;
  $average.textContent = `🍿🍿🍿 : ${vote_average}`;

  $body.appendChild($title);
  // $body.appendChild($overview);
  $body.appendChild($average);

  $card.appendChild($img);
  $card.appendChild($body);

  $wrapper.appendChild($card);

  return $wrapper;
};

document.addEventListener('DOMContentLoaded', async () => {
  $searchInput.focus();

  try {
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1`;
    const res = await fetch(url, options).then((response) => response.json());
    data = res.results;

    data.forEach((movie) => {
      const card = createMovieCard(movie);
      $movieCardList.appendChild(card);
    });
  } catch (e) {
    console.log(e);
  }
});

// 카드 정렬 - 추천순, 평점순

// 추천순 버튼에 클릭 이벤트 - 기존 카드는 지우고, 새로운 정렬 카드로 붙이기
document.querySelector('.form-select').addEventListener('change', (e) => {
  const optionValue = e.target.value;
  if (optionValue === '1') {
    data.sort((a, b) => b.vote_count - a.vote_count);
  } else if (optionValue === '2') {
    data.sort((a, b) => b.vote_average - a.vote_average);
  }
  while ($movieCardList.firstChild) {
    $movieCardList.removeChild($movieCardList.firstChild);
  }

  data.forEach((movie) => {
    const card = createMovieCard(movie);
    $movieCardList.appendChild(card);
  });
});

// 영화 이름 검색

$searchBtn.addEventListener('click', async (e) => {
  const keyword = $searchInput.value;

  e.preventDefault();

  if (keyword.length < 2) {
    alert('2글자 이상 입력하세요');
    return;
  }

  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ko-KR&page=1`;
    const res = await fetch(url, options).then((response) => response.json());

    if (res.results.length === 0) {
      alert('검색 결과가 없습니다.');
    } else {
      data = res.results;

      while ($movieCardList.firstChild) {
        $movieCardList.removeChild($movieCardList.firstChild);
      }

      data.forEach((movie) => {
        const card = createMovieCard(movie);
        $movieCardList.appendChild(card);
      });

      $searchInput.value = '';
    }
  } catch (e) {
    console.log(e);
  }
});

// 메인페이지로 이동
document.querySelector('.main-return').onclick = function () {
  window.location.href = './index.html';
};

// 메인에서 페이지 간 이동 test
document.querySelector('.testBtn').addEventListener('click', async () => {
  const testInput = document.querySelector('.testInput').value;
  console.log(typeof testInput);
  try {
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=${testInput}`;
    const res = await fetch(url, options).then((response) => response.json());
    data = res.results;

    while ($movieCardList.firstChild) {
      $movieCardList.removeChild($movieCardList.firstChild);
    }

    data.forEach((movie) => {
      const card = createMovieCard(movie);
      $movieCardList.appendChild(card);
    });
  } catch (e) {
    console.log(e);
  }
});
