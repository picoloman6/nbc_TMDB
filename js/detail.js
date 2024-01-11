// DOM 요소
const $commentName = document.querySelector('.comment-name');
const $commentPw = document.querySelector('.comment-pw');
const $commentBox = document.querySelector('.commentBox');
const $commentContainer = document.querySelector('.commentContainer');

// 변수
let movieId = 0;

// localStorage에 movieId로 영화 댓글 정보 저장
const setComment = (movieId, name, password, comment) => {
  let data = [];
  let id = 1;
  const exData = localStorage.getItem(movieId);

  if (exData.length > 2) {
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

// 영화 상세 정보 생성
const renderMoiveDetail = (movie) => {
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

// 댓글 정보 생성
const renderComment = (commentObj) => {
  const { id: commentId, name, comment } = commentObj;

  const $li = document.createElement('li');
  const $name = document.createElement('p');
  const $comment = document.createElement('p');
  const $div = document.createElement('div');
  const $input = document.createElement('input');
  const $btn = document.createElement('button');

  $li.className = 'movie-comment';
  $name.className = 'userId';
  $comment.className = 'userComment';
  $input.className = 'commentDlePW';
  $btn.className = 'commentDleBtn';

  $input.id = `commentDlePW${commentId}`;

  $name.textContent = name;
  $comment.textContent = comment;
  $btn.textContent = '삭제';

  $input.placeholder = '비밀번호';
  $input.type = 'password';

  $btn.dataset.commentId = commentId;

  $div.appendChild($input);
  $div.appendChild($btn);
  $li.appendChild($name);
  $li.appendChild($comment);
  $li.appendChild($div);

  $commentContainer.appendChild($li);
};

document.addEventListener('DOMContentLoaded', () => {
  const movie = JSON.parse(localStorage.getItem('movie'));
  const comments = getComments(movie.id);
  movieId = movie.id;

  renderMoiveDetail(movie);
  comments.forEach((v) => {
    renderComment(v);
  });
});

// 댓글 입력 기능
document.querySelector('.commentBtn').addEventListener('click', () => {
  const name = $commentName.value;
  const pw = $commentPw.value;
  const comment = $commentBox.value;

  if (name === '' && pw === '' && comment === '') {
    console.log('값을 입력하세요');
    return;
  }

  setComment(movieId, name, pw, comment);
  $commentName.value = '';
  $commentPw.value = '';
  $commentBox.value = '';
});

// 댓글 삭제
$commentContainer.addEventListener('click', (e) => {
  const { className, dataset } = e.target;

  if (className === 'commentDleBtn') {
    const comments = getComments(movieId);
    const comment = comments.filter(
      (v) => v.id * 1 === dataset.commentId * 1
    )[0];
    const input = document.querySelector(`#commentDlePW${dataset.commentId}`);

    console.log(comment);

    if (input.value !== comment.password) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    removeComment(movieId, comment.id);

    while ($commentContainer.firstChild) {
      $commentContainer.removeChild($commentContainer.firstChild);
    }

    getComments(movieId).forEach((v) => {
      renderComment(v);
    });
  }
});
