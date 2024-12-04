import React, { useState, useEffect, useRef } from 'react';
import postApi from "../api/postsApi";
import { useNavigate } from "react-router-dom";
import "../css/movielist.css";

export default function MovieList({ path }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageBaseURL = 'https://image.tmdb.org/t/p/w500';
  const navigate = useNavigate();

  const sliderRef = useRef(null); // 슬라이더 참조
  const isDragging = useRef(false); // 드래그 상태를 추적
  const startX = useRef(0); // 드래그 시작 지점 X 좌표
  const scrollLeft = useRef(0); // 드래그 시작 시 슬라이더의 스크롤 위치
  const speedMultiplier = 3; // 드래그 속도 배율 (값이 클수록 빠름)

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

  // 드래그 시작 이벤트
  const handleMouseDown = (e) => {
    isDragging.current = false; // 드래그 시작 시 초기화
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  // 드래그 중 이벤트
  const handleMouseMove = (e) => {
    if (startX.current === null) return;
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * speedMultiplier; // 속도 배율 적용
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
    isDragging.current = true; // 드래그 중임을 표시
  };

  // 드래그 종료 이벤트
  const handleMouseUp = () => {
    startX.current = null; // 드래그 종료 시 초기화
  };

  const handleClick = (el) => {
    if (!isDragging.current) {
      // 드래그 중이 아닐 때만 이동
      navigate(`/MovieDetailPage`, { state: { el } });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ width: '100%' }}>
      <div
        className="slider-container"
        ref={sliderRef} // 슬라이더 참조 연결
        onMouseDown={handleMouseDown} // 마우스 클릭 이벤트
        onMouseMove={handleMouseMove} // 마우스 이동 이벤트
        onMouseUp={handleMouseUp} // 마우스 업 이벤트
        onMouseLeave={handleMouseUp} // 마우스가 슬라이더 영역을 떠날 때
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
          padding: '10px',
          overflowX: 'auto',
          cursor: 'grab',
        }}
      >
        {data &&
          data.results.map((el, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center',
                margin: '10px',
                cursor: 'pointer',
              }}
              onClick={() => handleClick(el)} // 클릭 핸들러 추가
            >
              <img
                src={imageBaseURL + el.poster_path}
                alt={el.title}
                style={{
                  width: '200px',
                  height: '225px',
                  borderRadius: '8px',
                  display: 'block',
                }}
                draggable="false" // 이미지 드래그 방지
              />
              <div style={{ marginTop: '10px', fontSize: '16px', color: '#333' }}>
                {el.title}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
