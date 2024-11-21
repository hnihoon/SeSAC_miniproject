import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3', // 기본 URL
  params: {
    api_key: apiKey,
    language: 'ko',
  },
}
);

export default instance;
