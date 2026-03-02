import { useEffect, useState } from "react";
import tmdb from "../api/tmdb";
import Modal from "./Modal";
import "./SearchResult.css";

function SearchResult({ query }) {
  const [searchResults, setSearchResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        // 영화, TV 통합 검색 API
        const response = await tmdb.get(
          `/search/multi?query=${query}&include_adult=false&language=ko-KR`
        );
        // 포스터가 있는 결과만 필터링
        setSearchResults(
          response.data.results.filter(
            (movie) => movie.backdrop_path || movie.poster_path
          )
        );
      } catch (error) {
        console.error("검색 에러:", error);
      }
    };

    if (query) {
      // 너무 잦은 API 호출을 방지하기 위한 디바운싱 처리 (선택사항이나 권장)
      const delaySearch = setTimeout(() => {
        fetchSearch();
      }, 500);
      return () => clearTimeout(delaySearch);
    }
  }, [query]);

  const handleClick = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  return (
    <section className="search-result-container">
      {searchResults.length > 0 ? (
        <div className="search-results">
          {searchResults.map((movie) => (
            <div
              key={movie.id}
              className="search-movie"
              onClick={() => handleClick(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                alt={movie.title || movie.name}
                className="search-movie-poster"
              />
              <p className="search-movie-title">{movie.title || movie.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>"{query}"에 맞는 검색 결과가 없습니다. 😢</p>
        </div>
      )}
      {modalOpen && <Modal {...selectedMovie} setModalOpen={setModalOpen} />}
    </section>
  );
}

export default SearchResult;
