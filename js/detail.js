import dotenv from 'dotenv';

dotenv.config();

import '../css/reset.css';
import '../css/detail.css';

// DOM 요소
const $commentName = document.querySelector('.comment-name');
const $commentPw = document.querySelector('.comment-pw');
const $commentBox = document.querySelector('.commentBox');
const $commentBoxBtn = document.querySelector('.commentBtn');
const $commentContainer = document.querySelector('.commentContainer');

// 변수
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TOKEN}`
  }
};
let movieId = 0;
let comments = [];
let updateCommentId = 0;
let writeMod = 'add';
// let cast;
// let crew;

// localStorage에 movieId로 영화 댓글 정보 저장
const setComment = (name, password, comment) => {
  let data = [];
  let id = 1;
  const exData = localStorage.getItem(movieId);

  if (exData && exData.length > 2) {
    data = JSON.parse(exData);
    id = data[data.length - 1].id + 1;
  }

  data.push({ id, name, password, comment });
  localStorage.setItem(movieId, JSON.stringify(data));
};

// localStorage에서 movieId로 댓글 정보 불러오기
const getComments = () => {
  comments = JSON.parse(localStorage.getItem(movieId));
};

// localStorage에서 commentId로 댓글 삭제
const removeComment = (commentId) => {
  const idx = comments.findIndex((v) => v.id === commentId);
  comments.splice(idx, 1);
  localStorage.setItem(movieId, JSON.stringify(comments));
};

// localStorage에서 commentId로 댓글 수정
const updateComment = (movieId, comment) => {
  const idx = comments.findIndex((v) => v.id * 1 === updateCommentId * 1);
  comments[idx].name = comment.name;
  comments[idx].password = comment.pw;
  comments[idx].comment = comment.comment;
  localStorage.setItem(movieId, JSON.stringify(comments));
};

// 영화 상세 정보 생성
const renderMoiveDetail = (movie, movieDetails) => {
  const {
    poster_path,
    title,
    original_title,
    release_date,
    overview,
    vote_average
  } = movie;

  const { genres, runtime, budget, revenue } = movieDetails;

  const $img = document.querySelector('.movieImage');
  const $title = document.querySelector('.movieTitle');
  const $title2 = document.querySelector('.movieTitle2');
  const $genre = document.querySelector('.movieGenre');
  const $runtime = document.querySelector('.movieTime');
  const $open = document.querySelector('.movieOpen');
  const $vote = document.querySelector('.movieVote');
  const $plot = document.querySelector('.moviePlot');
  const $budget = document.querySelector('.movieBudget');
  const $revenue = document.querySelector('.movieRevenue');

  $img.src = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  $img.alt = title;

  $title.textContent = title;
  $title2.textContent = original_title;
  $genre.textContent = `장르 : ${genres.join(', ')}`;
  $runtime.textContent = `런타임 : ${runtime}분`;
  $open.textContent = `개봉일 : ${release_date}`;
  $budget.textContent = `제작비 : $${budget.toLocaleString('en-US')}`;
  $revenue.textContent = `월드 박스 오피스 : $${revenue.toLocaleString(
    'en-US'
  )}`;

  $vote.textContent = `평점 : ${vote_average}`;
  $plot.textContent = overview;
};

// 댓글 정보 생성
const renderComment = (commentObj) => {
  const { id: commentId, name, comment } = commentObj;

  const $li = document.createElement('li');
  const $commentDiv = document.createElement('div');
  const $name = document.createElement('p');
  const $comment = document.createElement('p');
  const $div = document.createElement('div');
  const $input = document.createElement('input');
  const $deleteBtn = document.createElement('button');
  const $updateBtn = document.createElement('button');

  $li.className = 'movie-comment';
  $commentDiv.className = 'userIDComment';
  $div.className = 'commentPWDel';
  $name.className = 'userID';
  $comment.className = 'userComment';
  $input.className = 'commentDlePW';
  $deleteBtn.className = 'commentDleBtn';
  $updateBtn.className = 'comment-update-btn';

  $input.id = `commentDlePW${commentId}`;

  $name.textContent = name;
  $comment.textContent = comment;
  $deleteBtn.textContent = '삭제';
  $updateBtn.textContent = '수정';

  $input.placeholder = '비밀번호';
  $input.type = 'password';

  $deleteBtn.dataset.commentId = commentId;
  $updateBtn.dataset.commentId = commentId;

  $commentDiv.appendChild($name);
  $commentDiv.appendChild($comment);
  $div.appendChild($input);
  $div.appendChild($deleteBtn);
  $div.appendChild($updateBtn);
  $li.appendChild($commentDiv);
  $li.appendChild($div);

  $commentContainer.appendChild($li);
};

const getMovieDetails = async () => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
  const res = await fetch(url, options).then((resoponse) => resoponse.json());
  const genres = res.genres.map((v) => v.name);
  const runtime = res.runtime;
  const budget = res.budget;
  const revenue = res.revenue;

  return { genres, runtime, budget, revenue };
};

// 주요 출연진
const persons = () => {
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KO`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const peopleList = document.getElementById('peopleList');

      data.cast.forEach((person) => {
        if (person.profile_path !== null) {
          const listItem = document.createElement('li');
          listItem.className = 'peopleCard';

          const image = document.createElement('img');
          image.className = 'peopleCard2';
          image.src = `https://image.tmdb.org/t/p/w185${person.profile_path}`;
          listItem.appendChild(image);

          const name = document.createElement('p');
          name.className = 'peopleName';
          name.textContent = person.name;
          listItem.appendChild(name);

          peopleList.appendChild(listItem);
        }
      });
    })
    .catch((err) => console.error(err));
};

document.addEventListener('DOMContentLoaded', async () => {
  const movie = JSON.parse(localStorage.getItem('movie'));
  movieId = movie.id;
  const movieDetails = await getMovieDetails();
  getComments();

  renderMoiveDetail(movie, movieDetails);

  persons();

  if (comments && comments.length > 0) {
    comments.forEach((v) => {
      renderComment(v);
    });
  }
});

// 댓글 입력 기능
document.querySelector('.commentBtn').addEventListener('click', (e) => {
  const name = $commentName.value;
  const pw = $commentPw.value;
  const comment = $commentBox.value;

  e.preventDefault();

  if (name === '' && pw === '' && comment === '') {
    alert('값을 입력하세요');
    return;
  }

  if (writeMod === 'add') {
    setComment(name, pw, comment);
  } else {
    updateComment(movieId, { name, pw, comment });
    writeMod = 'add';
    updateCommentId = 0;
    $commentBoxBtn.textContent = '등록';
  }

  $commentName.value = '';
  $commentPw.value = '';
  $commentBox.value = '';

  while ($commentContainer.firstChild) {
    $commentContainer.removeChild($commentContainer.firstChild);
  }

  getComments();

  comments.forEach((v) => {
    renderComment(v);
  });
});

// 댓글 삭제 및 수정 이벤트
$commentContainer.addEventListener('click', (e) => {
  const { className, tagName, dataset } = e.target;
  const commentId = dataset.commentId * 1;

  if (tagName === 'BUTTON') {
    const comment = comments.filter((v) => v.id * 1 === commentId)[0];
    const input = document.querySelector(`#commentDlePW${dataset.commentId}`);

    if (input.value !== comment.password) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (className === 'commentDleBtn') {
      removeComment(comment.id);

      while ($commentContainer.firstChild) {
        $commentContainer.removeChild($commentContainer.firstChild);
      }

      getComments();

      comments.forEach((v) => {
        renderComment(v);
      });
    } else if (className === 'comment-update-btn') {
      $commentName.value = comment.name;
      $commentPw.value = comment.password;
      $commentBox.value = comment.comment;

      $commentBoxBtn.textContent = '수정';

      writeMod = 'update';
      updateCommentId = dataset.commentId;
    }
  }
});

document.querySelector('.comment-cancel').addEventListener('click', (e) => {
  $commentName.value = '';
  $commentPw.value = '';
  $commentBox.value = '';

  writeMod = 'add';
  updateCommentId = 0;
  $commentBoxBtn.textContent = '등록';

  e.preventDefault();
});

// 메인페이지로 이동
document.querySelector('.main-return').onclick = function () {
  window.location.href = './index.html';
};

// 상세정보 fetch 테스트 - 인해

// document.addEventListener('DOMContentLoaded', async () => {
//   const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
//   const res = await fetch(url, options).then(response => response.json())
//   cast = res.cast;
//   crew = res.crew;
//   console.log(res);
// });

// 출연진 붙이기
