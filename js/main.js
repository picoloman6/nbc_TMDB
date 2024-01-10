document.addEventListener('DOMContentLoaded', () => {
  const movieCardList = document.getElementById('movieCardList');
  const movieSearchInput = document.querySelector('.form-control');
  movieSearchInput.focus();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTBiOWI1OTdkMzIzZjQxZjRhNzE0YmVhYWE1YWM4ZSIsInN1YiI6IjY1OTc3M2IxYTZjMTA0MTBkZGZhYTA1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ia1OS9T6UO-9ukTNWALTWszMDW9HDPF_c9PWhNwjz6A'
    }
  };

  fetch(
    'https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1',
    options
  )
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((movie) => {
        const card = createMovieCard(movie);
        movieCardList.appendChild(card);
      });
    });

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
                </div>
                `;
    return card;
  };

  window.showMovieId = function (movieId) {
    alert(`영화 ID값: ${movieId}`);
  };
});

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

// localStorage에 key = id로 영화 댓글 정보 저장
const setStorageItem = (id, name, password) => {
  let data = [];
  const exData = localStorage.getItem(id);

  if (exData) {
    data = JSON.parse(exData);
  }

  data.push({ name, password });
  localStorage.setItem(id, JSON.stringify(data));
};

// localStorage에서 key = id로 댓글 정보 불러오기
const getStorageItem = (id) => {
  const data = JSON.parse(localStorage.getItem(id));
  console.log(data);
};

document.addEventListener('DOMContentLoaded', () => {
  getStorageItem(278);
  getStorageItem(238);
});
