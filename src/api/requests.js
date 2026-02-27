const requests = {
  // 시리즈
  fetchTvTrending: "/trending/tv/week", // 지금 뜨는 콘텐츠
  fetchTvLatest: "/tv/on_the_air", // 최신
  fetchTvPopular: "/tv/popular", // 인기
  fetchTvAction: "/discover/tv?with_genres=10759", // 액션
  fetchTvAnimation: "/discover/tv?with_genres=16", // 애니메이션
  fetchTvComedy: "/discover/tv?with_genres=35", // 코미디
  fetchTvDocumentary: "/discover/tv?with_genres=99", // 다큐멘터리
  fetchTvDrama: "/discover/tv?with_genres=18", //드라마
  fetchTvKids: "/discover/tv?with_genres=10762", //어린이 드라마
  fetchTvMystery: "/discover/tv?with_genres=9648", // 미스테리
  fetchTvReality: "/discover/tv?with_genres=10764", //리얼리티 쇼
  fetchTvFantasy: "/discover/tv?with_genres=10765", // 판타지
  fetchTvTalk: "/discover/tv?with_genres=10767", // 토크쇼

  // 영화(Movies)
  fetchMovieTrending: "/trending/movie/week", // 지금 뜨는 콘텐츠
  fetchMovieLatest: "/movie/now_playing", // 최신
  fetchMoviePopular: "/movie/popular", // 인기
  fetchMovieAction: "/discover/movie?with_genres=28", // 액션
  fetchMovieHorror: "/discover/movie?with_genres=27", //공포
  fetchMovieRomance: "/discover/movie?with_genres=10749", //로맨스
  fetchMovieAnimation: "/discover/movie?with_genres=16", //애니메이션
  fetchMovieSF: "/discover/movie?with_genres=878", //SF
  fetchMovieFantasy: "/discover/movie?with_genres=14", // 판타지
  fetchMovieThriller: "/discover/movie?with_genres=53", // 스릴러
  fetchMovieMystery: "/discover/movie?with_genres=9648", //미스테리
  fetchMovieFamily: "/discover/movie?with_genres=10751", //가족영화
  fetchMovieComedy: "/discover/movie?with_genres=35", //코미디
};

export default requests;
