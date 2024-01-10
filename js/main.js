// localStorage에 movieId로 영화 댓글 정보 저장
const setComment = (movieId, name, password) => {
  const exData = localStorage.getItem(movieId);
  let data = [];
  let id = 1;

  if (exData) {
    data = JSON.parse(exData);
    id = data[data.length - 1].id + 1;
  }

  data.push({ id, name, password });
  localStorage.setItem(movieId, JSON.stringify(data));
};

// localStorage에서 movieId로 댓글 정보 불러오기
const getComments = (movieId) => {
  const data = JSON.parse(localStorage.getItem(movieId));
  return data;
};

// localStorage에서 commentId로 댓글 삭제
const removeComment = (movieId, commentId) => {
  const data = JSON.parse(localStorage.getItem(movieId));
  const idx = data.findIndex((v) => v.id === commentId);
  data.splice(idx, 1);
  localStorage.setItem(movieId, JSON.stringify(data));
};

// 영화 정보 카드 DOM 생성
const createMovieCard = (movie) => {
  const { id, poster_path, title, overview, vote_average } = movie;

  const $wrapper = document.createElement('div');
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
    console.log(getComments(id));
  };

  $title.textContent = title;
  $overview.textContent = overview;
  $average.textContent = `Vote Average: ${vote_average}`;

  $body.appendChild($title);
  $body.appendChild($overview);
  $body.appendChild($average);

  $card.appendChild($img);
  $card.appendChild($body);

  $wrapper.appendChild($card);

  return $wrapper;
};

// 영화 이름 검색
const filterMovies = () => {
  const searchInput = document.querySelector('.form-control');
  const searchTerm = searchInput.value.toLowerCase();

  const movieCards = document.querySelectorAll('.col-md-3');

  movieCards.forEach((card) => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();

    const regex = new RegExp(searchTerm, 'i');
    if (regex.test(title)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  const movieCardList = document.getElementById('movieCardList');
  const movieSearchInput = document.querySelector('.form-control');
  movieSearchInput.focus();

  const url =
    'https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTBiOWI1OTdkMzIzZjQxZjRhNzE0YmVhYWE1YWM4ZSIsInN1YiI6IjY1OTc3M2IxYTZjMTA0MTBkZGZhYTA1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ia1OS9T6UO-9ukTNWALTWszMDW9HDPF_c9PWhNwjz6A'
    }
  };

  try {
    const res = await fetch(url, options).then((response) => response.json());
    const data = res.results;

    data.forEach((movie) => {
      const card = createMovieCard(movie);
      movieCardList.appendChild(card);
    });
  } catch (e) {
    console.log(e);
  }
});
