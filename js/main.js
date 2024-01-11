// DOM 요소
const $searchInput = document.querySelector('.search-input');
const $searchBtn = document.querySelector('.search-btn');
const $movieCardList = document.querySelector('#movieCardList');

// 변수
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTBiOWI1OTdkMzIzZjQxZjRhNzE0YmVhYWE1YWM4ZSIsInN1YiI6IjY1OTc3M2IxYTZjMTA0MTBkZGZhYTA1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ia1OS9T6UO-9ukTNWALTWszMDW9HDPF_c9PWhNwjz6A'
  }
};

// localStorage에 movieId로 영화 댓글 정보 저장
const setComment = (movieId, name, password) => {
  let data = [];
  let id = 1;
  const exData = localStorage.getItem(movieId);

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

document.addEventListener('DOMContentLoaded', async () => {
  $searchInput.focus();

  try {
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1`;
    const res = await fetch(url, options).then((response) => response.json());
    const data = res.results;

    data.forEach((movie) => {
      const card = createMovieCard(movie);
      $movieCardList.appendChild(card);
    });
  } catch (e) {
    console.log(e);
  }
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
    const data = res.results;

    if (data.length === 0) {
      alert('검색 결과가 없습니다.');
    } else {
      while ($movieCardList.firstChild) {
        $movieCardList.removeChild($movieCardList.firstChild);
      }

      data.forEach((movie) => {
        const card = createMovieCard(movie);
        $movieCardList.appendChild(card);
      });
    }
  } catch (e) {
    console.log(e);
  }
});



// 카드 정렬

document.addEventListener('DOMContentLoaded', async () => {
  $searchInput.focus();

  try {
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1`;
    const res = await fetch(url, options).then((response) => response.json());
    const data = res.results;
    // console.log(data);

    // 방법 1. vote_count, vote_average 값을 forEach로 빼서 각각 정렬 후, 카드 렌더링
    // -> forEach로 뺀 값을 배열로 만들어서 sort() 하는게 맞나? 비효율적

    // 추첨순 점수
    // const sort1 = data.forEach((a) => {
    //   console.log(a.vote_count);
    // });

    // 별점순 점수
    // const sort2 = data.forEach((b) => {
      // console.log(b.vote_average);
    // });

    // sort 버튼 클릭이벤트 부여
    // const sort3 = document.getElementsByClassName('sortBtn-count')
    //   .addEventListener('click', sort1.sort((next, prev) => prev > next ? -1 : 0));
    // console.log(sort3);

    // 카드 렌더링
    // data.forEach((movie) => {
    //   const card = createMovieCard(movie);
    //   $movieCardList.appendChild(card);
    // });



    // 방법 2. forEach 하지 말고, 원 객체에서 value값을 sorting 하기 (객체에서 정렬하기)

    // const sort_cards = data.forEach((a) => {
      // console.log(data);
      // console.log(a);
    // });

    // 추천순으로 내림차순 정렬
    const sort_count = data.sort((a,b) => b.vote_count - a.vote_count);
    console.log(sort_count);

    // 평점순으로 내림차순 정렬
    const sort_average = data.sort((a,b) => b.vote_average - a.vote_average);
    console.log(sort_average);

    // 추천순 버튼에 클릭이벤트 - 기존 카드는 지우고, 새로운 정렬 카드로 붙이기
    document.querySelector('.sortBtn-count').addEventListener('click', () => {
      while ($movieCardList.firstChild) {
        $movieCardList.removeChild($movieCardList.firstChild);
      };

      // data.forEach((movie) => {
      //   const card = createMovieCard(movie);
      //   $movieCardList.appendChild(card);
      // });
    });

         


    // 평점순 버튼에 클릭이벤트 
    // document.querySelector(".sortBtn-average").addEventListener('click', () => {
    //   console.log('print!');

      // document.getElementById("movieCardList").style.display = "none";
      
    //   data.forEach((movie) => {
    //     const card = createMovieCard(movie);
    //     $movieCardList.appendChild(card);
    //   });
    // })

    // 카드 렌더링
    // data.forEach((movie) => {
    //   const card = createMovieCard(movie);
    //   $movieCardList.appendChild(card);
    // });



  } catch (e) {
    console.log(e);
  }
});
