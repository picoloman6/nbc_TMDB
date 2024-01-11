// DOM 요소
const $commentName = document.querySelector('.comment-name');
const $commentPw = document.querySelector('.comment-pw');
const $commentBox = document.querySelector('.commentBox');

// 변수
let id = 0;

// localStorage에 movieId로 영화 댓글 정보 저장
const setComment = (movieId, name, password, comment) => {
  let data = [];
  let id = 1;
  const exData = localStorage.getItem(movieId);

  if (exData) {
    data = JSON.parse(exData);
    id = data[data.length - 1].id + 1;
  }

  data.push({ id, name, password, comment });
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

const makeMoiveDetail = (movie) => {
  const {
    poster_path,
    title,
    original_title,
    release_date,
    overview,
    vote_average
  } = movie;

  const $img = document.querySelector('.movieImage');
  const $title = document.querySelector('.movieTitle');
  const $title2 = document.querySelector('.movieTitle2');
  const $open = document.querySelector('.movieOpen');
  const $vote = document.querySelector('.movieVote');
  const $plot = document.querySelector('.moviePlot');

  $img.src = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  $img.alt = title;

  $title.textContent = title;
  $title2.textContent = original_title;
  $open.textContent = release_date;

  $vote.textContent = vote_average;
  $plot.textContent = overview;
};

document.addEventListener('DOMContentLoaded', () => {
  const movie = JSON.parse(localStorage.getItem('movie'));
  id = movie.id;

  makeMoiveDetail(movie);
});

document.querySelector('.commentBtn').addEventListener('click', (e) => {
  const name = $commentName.value;
  const pw = $commentPw.value;
  const comment = $commentBox.value;

  if (name === '' && pw === '' && comment === '') {
    console.log('값을 입력하세요');
    return;
  }

  e.preventDefault();

  setComment(id, name, pw, comment);
  $commentName.value = '';
  $commentPw.value = '';
  $commentBox.value = '';
});
