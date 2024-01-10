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
  const card = document.createElement('div');
  card.classList.add('col-md-3', 'mb-4');
  card.innerHTML = `
    <div class="card" onclick="showMovieId(${movie.id})">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${movie.overview}</p>
                <p class="card-text2">Vote Average: ${movie.vote_average}</p>
            </div>
    </div>`;
  return card;
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

  const res = await fetch(url, options).then((response) => response.json());
  const data = res.results;

  data.forEach((movie) => {
    const card = createMovieCard(movie);
    movieCardList.appendChild(card);
  });

  window.showMovieId = function (movieId) {
    console.log(getComments(movieId));
  };
});
