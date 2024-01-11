// DOM 요소
const $commentName = document.querySelector('.comment-name');
const $commentPw = document.querySelector('.comment-pw');
const $commentBox = document.querySelector('.commentBox');
const $commentContainer = document.querySelector('.commentContainer');

// 변수
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTBiOWI1OTdkMzIzZjQxZjRhNzE0YmVhYWE1YWM4ZSIsInN1YiI6IjY1OTc3M2IxYTZjMTA0MTBkZGZhYTA1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ia1OS9T6UO-9ukTNWALTWszMDW9HDPF_c9PWhNwjz6A'
  }
};
let movieId = 0;
let updateCommentId = 0;
let writeMod = 'add';

// localStorage에 movieId로 영화 댓글 정보 저장
const setComment = (movieId, name, password, comment) => {
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

// localStorage에서 commentId로 댓글 수정
const updateComment = (movieId, comment) => {
  const data = JSON.parse(localStorage.getItem(movieId));
  const idx = data.findIndex((v) => v.id * 1 === updateCommentId * 1);
  data[idx].name = comment.name;
  data[idx].password = comment.pw;
  data[idx].comment = comment.comment;
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
  console.log(commentObj);
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

document.addEventListener('DOMContentLoaded', () => {
  const movie = JSON.parse(localStorage.getItem('movie'));
  const comments = getComments(movie.id);
  movieId = movie.id;

  renderMoiveDetail(movie);

  if (comments) {
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
    setComment(movieId, name, pw, comment);
  } else {
    updateComment(movieId, { name, pw, comment });
    writeMod = 'add';
    updateCommentId = 0;
  }

  $commentName.value = '';
  $commentPw.value = '';
  $commentBox.value = '';

  while ($commentContainer.firstChild) {
    $commentContainer.removeChild($commentContainer.firstChild);
  }

  getComments(movieId).forEach((v) => {
    renderComment(v);
  });
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

// 댓글 수정
$commentContainer.addEventListener('click', (e) => {
  const { className, dataset } = e.target;

  if (className === 'comment-update-btn') {
    const comments = getComments(movieId);
    const comment = comments.filter(
      (v) => v.id * 1 === dataset.commentId * 1
    )[0];
    const input = document.querySelector(`#commentDlePW${dataset.commentId}`);

    if (input.value !== comment.password) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    $commentName.value = comment.name;
    $commentPw.value = comment.password;
    $commentBox.value = comment.comment;

    writeMod = 'update';
    updateCommentId = dataset.commentId;
  }
});
