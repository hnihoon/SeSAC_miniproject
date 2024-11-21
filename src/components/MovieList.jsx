import React, { useState, useEffect, useRef } from 'react';
import postApi from "../api/postsApi";
import { Link, useNavigate } from "react-router-dom";

export default function MovieList({ path }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageBaseURL = 'https://image.tmdb.org/t/p/w500';
  const sliderRef = useRef(null); // 슬라이더 컨테이너를 참조
  const navigate = useNavigate(); // React Router의 네비게이션 훅

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await postApi.getPostById(path);
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [path]);

  // 좌측 이동 함수
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  // 우측 이동 함수
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* 좌측 버튼 */}
      <button 
        onClick={scrollLeft}
        style={{
          position: 'absolute',
          left: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
        }}
      >
        &#9664; {/* 왼쪽 화살표 */}
      </button>

      {/* 슬라이더 */}
      <div
        ref={sliderRef}
        className="slider-container"
        style={{
          display: 'flex',
          overflowX: 'hidden', // 스크롤 바 숨김
          scrollBehavior: 'smooth',
          gap: '10px',
          padding: '10px',
        }}
      >
        {data &&
          data.results.map((el, index) => (
            <div
              key={index}
              style={{
                flex: '0 0 auto',
                textAlign: 'center',
                margin: '10px',
                cursor: 'pointer', // 클릭 가능하도록 설정
              }}
                onClick={() => {navigate(`/movieDetailPage/movieDetail`, {state: {el} })}} // 올바른 경로로 이동
            >
              <img
                src={imageBaseURL + el.poster_path}
                alt={el.title}
                style={{
                  width: '150px',
                  height: '225px',
                  borderRadius: '8px',
                  display: 'block',
                }}
              />
              <div style={{ marginTop: '10px', fontSize: '16px', color: '#333' }}>
                {el.title}
              </div>
            </div>
          ))}
      </div>

      {/* 우측 버튼 */}
      <button 
        onClick={scrollRight}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
        }}
      >
        &#9654; {/* 오른쪽 화살표 */}
      </button>
    </div>
  );
}
