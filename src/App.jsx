import "./App.css";
import logo from "./assets/Netflix_logo.svg";
import search_btn from "./assets/search_btn.svg";

function App() {
  return (
    <div className="App">
      {/* 네비게이션 바 */}
      <nav className="nav-bar">
        <img className="nav-logo" src={logo} alt="NETFLIX" />
        <div className="nav-left">
          <button>시리즈</button>
          <button>영화</button>
        </div>
        {/* 검색 버튼 */}
        <img className="search_btn" src={search_btn} alt="search_btn" />
      </nav>

      {/* 메인 배너 */}
      <header className="main-banner">
        <h2>영화 제목</h2>
        <div className="banner-buttons">
          <button>▶ 재생</button>
          <button>ⓘ 상세 정보</button>
        </div>
      </header>

      {/* 영화 리스트 슬라이드 */}
      <section className="row">
        <h3>지금 뜨는 콘텐츠</h3>
        <div className="posters">
          <div className="poster">이미지 1</div>
          <div className="poster">이미지 2</div>
        </div>
      </section>
    </div>
  );
}

export default App;
