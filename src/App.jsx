import { useState } from "react";
import "./App.css";
import requests from "./api/requests";
import logo from "./assets/Netflix_logo.svg";
import search_btn from "./assets/search_btn.svg";
import Row from "./components/Row";

function App() {
  // 현재 카테고리의 기본 상태 = movie
  const [category, setCategory] = useState("movie");
  return (
    <div className="App">
      {/* 네비게이션 바 */}
      <nav className="nav-bar">
        <img className="nav-logo" src={logo} alt="NETFLIX" />
        <div className="nav-left">
          <button onClick={() => setCategory("tv")}>시리즈</button>
          <button onClick={() => setCategory("movie")}>영화</button>
        </div>
        {/* 검색 버튼 */}
        <img className="search_btn" src={search_btn} alt="search_btn" />
      </nav>

      {/* 메인 배너 */}
      <header className="main-banner">
        <h2>{category === "movie" ? "추천 영화" : "추천 시리즈"}</h2>
        <div className="banner-buttons">
          <button>▶ 재생</button>
          <button>ⓘ 상세 정보</button>
        </div>
      </header>

      {/* 카테고리에 따른 조건부 렌더링 */}
      <main>
        {category === "movie" ? (
          // 영화 메뉴일 때 보여줄 Row들
          <>
            <Row
              title="지금 뜨는 콘텐츠"
              fetchUrl={requests.fetchMovieTrending}
            />
            <Row title="최신 영화" fetchUrl={requests.fetchMovieLatest} />
            <Row title="액션 영화" fetchUrl={requests.fetchMovieAction} />
            <Row title="공포 영화" fetchUrl={requests.fetchMovieHorror} />
            <Row title="로맨스 영화" fetchUrl={requests.fetchMovieRomance} />
          </>
        ) : (
          // 시리즈 메뉴일 때 보여줄 Row들
          <>
            <Row title="지금 뜨는 시리즈" fetchUrl={requests.fetchTvTrending} />
            <Row title="인기 시리즈" fetchUrl={requests.fetchTvPopular} />
            <Row title="애니메이션" fetchUrl={requests.fetchTvAnimation} />
            <Row title="미스테리 시리즈" fetchUrl={requests.fetchTvMystery} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
