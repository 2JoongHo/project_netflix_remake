import { useState, useEffect } from "react";
import Button from "./Button";
import "./Modal.css";
import tmdb from "../api/tmdb";
import close_btn from "../assets/x_btn.svg";
import YouTube from "react-youtube";
import axios from "axios"; // 유튜브 검색 API 호출을 위해 추가

function Modal({
  backdrop_path,
  title, // 제목(영화)
  overview, // 설명
  setModalOpen,
  name, // 제목(시리즈)
  vote_average, // 평점
  release_date, // 개봉일(영화)
  first_air_date, // 첫 방영일(시리즈)
  id, // 영화/시리즈 고유 id
}) {
  const [cast, setCast] = useState([]);
  const [trailerId, setTrailerId] = useState(""); // 예고편 key 저장 상태
  const [isPlaying, setIsPlaying] = useState(false); // 예고편 재생 여부 상태

  // 데이터 불러오기 (출연진 + 비디오)
  useEffect(() => {
    async function fetchData() {
      try {
        const mediaType = title ? "movie" : "tv";

        // 출연진 정보 가져오기
        const credits = await tmdb.get(`/${mediaType}/${id}/credits`);
        setCast(credits.data.cast.slice(0, 5));

        // 비디오 정보 가져오기 (한국어)
        let response = await tmdb.get(`/${mediaType}/${id}/videos`);
        let videos = response.data.results;
        // 비디오 정보 가져오기 (영어)
        if (videos.length === 0) {
          response = await tmdb.get(
            `/${mediaType}/${id}/videos?language=en-US`,
          );
          videos = response.data.results;
        }
        // 비디오 정보 가져오기 (언어 설정없이)
        if (videos.length === 0) {
          response = await tmdb.get(`/${mediaType}/${id}/videos?language=`);
          videos = response.data.results;
        }

        // 유튜브 영상 중 최적의 영상 하나 선택
        let finalVideo =
          videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
          videos.find((v) => v.site === "YouTube") ||
          videos[0];

        if (finalVideo) {
          setTrailerId(finalVideo.key);
        } else {
          // TMDB에 영상이 아예 없을 때 YouTube Search API 실행
          const YOUTUBE_API_KEY = "AIzaSyA5BN9TC2POB5YWCYZjJiPAGtjskV--mtw";
          const movieName = title || name;

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
            },
          );

          const searchedVideoId =
            youtubeSearchResponse.data.items[0]?.id?.videoId;
          if (searchedVideoId) {
            setTrailerId(searchedVideoId);
          }
        }
      } catch (error) {
        console.error("데이터 로딩 실패", error);
      }
    }
    if (id) fetchData();
  }, [id, title, name]);

  // ESC 키로 모달 닫기 및 배경 스크롤 방지 로직
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [setModalOpen]);

  // 재생 버튼 클릭 시
  const handlePlayClick = () => {
    if (trailerId) {
      setIsPlaying(true);
    } else {
      // YouTube API로도 못 찾았을 경우에만 알림
      alert("현재 재생 가능한 영상 데이터가 없습니다. 😢");
    }
  };

  return (
    <div className="modal-container">
      <div className="wrapper-modal" onClick={() => setModalOpen(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <img
            className="modal-close"
            src={close_btn}
            onClick={() => setModalOpen(false)}
            alt="close"
          />

          <div className="modal-poster-container">
            {isPlaying && trailerId ? (
              <YouTube
                videoId={trailerId}
                opts={{
                  width: "100%",
                  height: "450px",
                  playerVars: {
                    autoplay: 1, // 자동 재생
                    rel: 0, // 관련 영상 표시 X
                    mute: 1, // 음소거
                    modestbranding: 1, // 유튜브 로고 제거
                  },
                }}
                onEnd={() => setIsPlaying(false)}
              />
            ) : (
              <>
                <img
                  className="modal-poster"
                  src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                  alt="modal-poster"
                />
                <div className="modal-poster-btn">
                  <Button text="▶ 재생" type="play" onClick={handlePlayClick} />
                </div>
              </>
            )}
          </div>

          <div className="modal-content">
            <h2 className="modal-title">{title ? title : name}</h2>
            <p>⭐ 평점 : {vote_average}</p>
            <p>출연: {cast.map((actor) => actor.name).join(", ")}</p>
            <p>
              {release_date
                ? `개봉일 : ${release_date}`
                : `첫 방영일 : ${first_air_date}`}
            </p>
            <p className="modal-overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
