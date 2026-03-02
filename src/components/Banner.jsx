import axios from "axios";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import requests from "../api/requests";
import tmdb from "../api/tmdb";
import close_btn from "../assets/x_btn.svg";
import "./Banner.css";
import Button from "./Button";
import Modal from "./Modal";

function Banner() {
  const [movie, setMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [trailerId, setTrailerId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // 1. 영화 목록 가져오기
        const request = await tmdb.get(requests.fetchMovieLatest);
        // 2. 랜덤 영화 한 개 확정 (변수에 저장)
        const selectedMovie =
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ];

        // 3. 화면에 보여줄 영화 상태 업데이트
        setMovie(selectedMovie);

        // 4. [핵심] 확정된 selectedMovie의 ID로 즉시 비디오 찾기 시작
        if (selectedMovie) {
          const mediaType = selectedMovie.title ? "movie" : "tv";
          const currentId = selectedMovie.id;

          // TMDB에서 비디오 정보 요청
          let response = await tmdb.get(`/${mediaType}/${currentId}/videos`);
          let videos = response.data.results;

          if (videos.length === 0) {
            response = await tmdb.get(
              `/${mediaType}/${currentId}/videos?language=en-US`
            );
            videos = response.data.results;
          }
          if (videos.length === 0) {
            response = await tmdb.get(
              `/${mediaType}/${currentId}/videos?language=`
            );
            videos = response.data.results;
          }

          let finalVideo =
            videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
            videos.find((v) => v.site === "YouTube") ||
            videos[0];

          if (finalVideo) {
            setTrailerId(finalVideo.key);
          } else {
            // TMDB에 없으면 유튜브 검색
            const YOUTUBE_API_KEY = "AIzaSyA5BN9TC2POB5YWCYZjJiPAGtjskV--mtw";
            const movieName = selectedMovie.title || selectedMovie.name;
            const youtubeSearchResponse = await axios.get(
              `https://www.googleapis.com/youtube/v3/search`,
              {
                params: {
                  part: "snippet",
                  q: `${movieName} official trailer`,
                  maxResults: 1,
                  type: "video",
                  videoEmbeddable: "true",
                  key: YOUTUBE_API_KEY,
                },
              }
            );
            const searchedVideoId =
              youtubeSearchResponse.data.items[0]?.id?.videoId;
            setTrailerId(searchedVideoId || "");
          }
        }
      } catch (error) {
        console.error("데이터 로딩 중 에러 발생:", error);
      }
    }
    fetchData();
  }, []);

  const handlePlayClick = () => {
    if (trailerId) {
      setIsPlaying(true);
    } else {
      alert("현재 재생 가능한 영상 데이터가 없습니다. 😢");
    }
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <>
      <header
        className={`main-banner ${isPlaying ? "video-playing" : ""}`}
        style={{
          backgroundImage: isPlaying
            ? "none"
            : `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundColor: "black",
        }}
      >
        {isPlaying && trailerId ? (
          <div className="banner-video-wrapper">
            <YouTube
              videoId={trailerId}
              containerClassName="youtube-container"
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 1,
                  rel: 0,
                  mute: 1,
                  modestbranding: 1,
                  controls: 1,
                },
              }}
              onEnd={() => setIsPlaying(false)}
            />
            <img
              className="banner-video-close"
              src={close_btn}
              onClick={() => setIsPlaying(false)}
              alt="close-button"
            />
          </div>
        ) : (
          <div className="banner-content">
            <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
            <div className="banner-buttons">
              <Button text="▶ 재생" type="play" onClick={handlePlayClick} />
              <Button
                text="ⓘ 상세 정보"
                type="info"
                onClick={() => setModalOpen(true)}
              />
            </div>
            <h1 className="banner-description">
              {truncate(movie?.overview, 150)}
            </h1>
          </div>
        )}
      </header>

      {modalOpen && <Modal {...movie} setModalOpen={setModalOpen} />}
    </>
  );
}

export default Banner;
