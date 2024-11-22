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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        className="slider-container"
        style={{
          display: 'flex',
          gap: '10px',
          padding: '10px',
        }}
      >
        {data &&
          data.results.slice(0, 11).map((el, index) => (
            <div
              key={index}
              style={{
                flex: '0 0 auto',
                textAlign: 'center',
                margin: '10px',
                cursor: 'pointer', 
              }}
                onClick={() => {navigate(`/movieDetailPage/movieDetail`, {state: {el} })}} // 올바른 경로로 이동
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
