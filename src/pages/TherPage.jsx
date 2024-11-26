import React from 'react';
import { useLocation } from 'react-router-dom';
import MovieTher from '../components/MovieTher';
import Header from '../components/Header';

export default function TherPage() {
  const location = useLocation();
  const endpoint = location.state?.endpoint; // 전달받은 엔드포인트

  return (
    <div>
      {endpoint ? (
        <MovieTher path={endpoint} />
      ) : (
        <div>경로 정보가 없습니다.</div>
      )}
    </div>
  );
}
