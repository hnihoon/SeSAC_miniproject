import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function MovieDetailPage() {
  const location = useLocation();
  const [movie, setMovie] = useState(null); // 초기 상태

  useEffect(() => {
    if (location.state?.el) {
      setMovie(location.state.el); // 상태가 없을 때만 업데이트
    }
  }, [location.state]); // movie가 업데이트되면 다시 실행되지 않음

  const imageBaseURL = 'https://image.tmdb.org/t/p/w500';

  if (!movie) {
    return <div>Loading...</div>; // movie가 로드되기 전 표시
  }

  return (
    <div>
      <div>{movie.title}</div>
      <img src={imageBaseURL + movie.poster_path} alt={movie.title} />
      <div>{movie.overview}</div>
    </div>
  );
}
