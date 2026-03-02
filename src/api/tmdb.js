import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_KEY;

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
    language: "ko-KR",
  },
});

export default tmdb;
