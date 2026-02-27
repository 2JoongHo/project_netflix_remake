import { useEffect, useState } from "react";
import tmdb from "../api/tmdb";
import "./Row.css";

// 영화 리스트 컴포넌트
function Row({ title, fetchUrl }) {
  // 영화 목록을 담는 상태
  const [movies, setMovies] = useState([]);

  // 컴포넌트가 나다나거나 fetchUrl이 변경될 때 실행
  useEffect(() => {
    async function fetchData() {
      // tmdb 서버에 데이터 요청
      const request = await tmdb.get(fetchUrl);
      // 받아온 데이터에서 결과를 배열에 저장
      setMovies(request.data.results);
      return request;
    }
    fetchData();
    // fetchUrl이 변경 시 다시 불러오기
  }, [fetchUrl]);

  return (
    <div className="row">
      <h3>{title}</h3>
      <div>
        {movies.map((movie) => (
          <img
            className="poster"
            key={movie.id}
            // 이미지 경로
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title || movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
