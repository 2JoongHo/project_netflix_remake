import { useEffect, useRef, useState } from "react";
import "./App.css";
import requests from "./api/requests";
import logo from "./assets/Netflix_logo.svg";
import search_btn from "./assets/search_btn.svg";
import Banner from "./components/Banner";
import Row from "./components/Row";
import SearchResult from "./components/SearchResult";

function App() {
  // 현재 카테고리의 기본 상태 = movie
  const [category, setCategory] = useState("movie");
  // 검색창 열림 상태
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // 검색어 상태
  const [searchQuery, setSearchQuery] = useState("");
  // 검색창 영역 참조
  const searchRef = useRef(null);
  // [추가] 인풋창에 직접 포커스를 주기 위한 Ref
  const inputRef = useRef(null);

  const handleSearchClick = () => {
    const nextState = !isSearchOpen;
    setIsSearchOpen(nextState);

    // 검색창이 열릴 때 오토포커스
    if (nextState) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }

    // 검색창 닫을 때 초기화
    if (isSearchOpen) setSearchQuery("");
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e) => {
      // 검색창 영역(searchRef) 내부 클릭인지 확인
      const isSearchInside =
        searchRef.current && searchRef.current.contains(e.target);

      // 모달이나 검색 결과 항목을 클릭했는지 확인
      const isSearchResultClick = e.target.closest(".search-result-container");

      // 현재 화면에 모달이 떠 있는지 확인
      const isModalVisible =
        document.querySelector(".modal-container") ||
        document.querySelector(".wrapper-modal");

      // 검색창, 검색 결과 영역, 모달 영역이 아닐 경우 닫기
      if (!isSearchInside && !isSearchResultClick && !isModalVisible) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryClick = (type) => {
    setCategory(type);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="App">
      {/* 네비게이션 바 */}
      <nav className="nav-bar">
        <img
          className="nav-logo"
          src={logo}
          alt="NETFLIX"
          onClick={() => handleCategoryClick("movie")}
          style={{ cursor: "pointer" }}
        />
        <div className="nav-left">
          <button onClick={() => handleCategoryClick("tv")}>시리즈</button>
          <button onClick={() => handleCategoryClick("movie")}>영화</button>
        </div>
        {/* 검색 영역 */}
        <div
          className={`search-container ${isSearchOpen ? "active" : ""}`}
          ref={searchRef}
        >
          <input
            ref={inputRef}
            className="search-input"
            type="text"
            placeholder="검색할 영화, 시리즈를 입력해보세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // 검색창이 닫혀있을 때는 탭 포커스 방지
            tabIndex={isSearchOpen ? 0 : -1}
          />
          {/* 검색 버튼 */}
          <img
            className="search_btn"
            src={search_btn}
            alt="search_btn"
            onClick={handleSearchClick}
          />
        </div>
      </nav>

      {/* 카테고리에 따른 조건부 렌더링 */}
      {isSearchOpen && searchQuery.length > 0 ? (
        <SearchResult query={searchQuery} />
      ) : (
        <>
          <Banner />
          <main>
            {category === "movie" ? (
              // 영화 메뉴 Row
              <>
                <Row
                  title="지금 뜨는 콘텐츠"
                  fetchUrl={requests.fetchMovieTrending}
                />
                <Row title="최신 영화" fetchUrl={requests.fetchMovieLatest} />
                <Row title="액션 영화" fetchUrl={requests.fetchMovieAction} />
                <Row title="공포 영화" fetchUrl={requests.fetchMovieHorror} />
                <Row
                  title="로맨스 영화"
                  fetchUrl={requests.fetchMovieRomance}
                />
              </>
            ) : (
              // 시리즈 메뉴 Row
              <>
                <Row
                  title="지금 뜨는 시리즈"
                  fetchUrl={requests.fetchTvTrending}
                />
                <Row title="인기 시리즈" fetchUrl={requests.fetchTvPopular} />
                <Row title="애니메이션" fetchUrl={requests.fetchTvAnimation} />
                <Row
                  title="미스테리 시리즈"
                  fetchUrl={requests.fetchTvMystery}
                />
              </>
            )}
          </main>
        </>
      )}
    </div>
  );
}

export default App;
