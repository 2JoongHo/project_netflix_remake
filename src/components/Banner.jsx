import { useEffect, useState } from "react";
import tmdb from "../api/tmdb";
import requests from "../api/requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // 최신 영화 불러오기
      const request = await tmdb.get(requests.fetchMovieLatest);
      // 랜덤으로 선택
      const randomMovie =
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ];
      setMovie(randomMovie);
    }
    fetchData();
  }, []);

  // 설명이 길 경우 줄여주기
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="main-banner"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner-content">
        {/* 영화 제목 */}
        <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="banner-buttons">
          <button className="banner-button">▶ 재생</button>
          <button className="banner-button">ⓘ 상세 정보</button>
        </div>
        <h1 className="banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>
    </header>
  );
}

export default Banner;
