import React, { useState, useEffect } from 'react';
import postApi from "../api/postsApi";
import { useNavigate } from "react-router-dom";

export default function MovieTher({ path }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageBaseURL = 'https://image.tmdb.org/t/p/w500';
  const navigate = useNavigate();

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
    <div style={{ position: 'relative', width: '100%', padding: '20px' }}>
      <div
        className="slider-container"
        style={{
          display: 'flex',
          flexWrap: 'wrap', // 한 줄에 공간이 부족하면 다음 줄로 넘어감
          gap: '10px',
          justifyContent: 'center', // 중앙 정렬
          textAlign: 'center',
        }}
      >
        {data &&
          data.results.map((el, index) => (
            <div
              key={index}
              style={{
                flex: '0 1 calc(33.33% - 20px)', // 3개씩 배치 (100% / 3)
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // 중앙 정렬
                justifyContent: 'center',
                margin: '10px 0',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/movieDetailPage/movieDetail`, { state: { el } })}
            >
              <img
                src={imageBaseURL + el.poster_path}
                alt={el.title}
                style={{
                  width: '60%', // 부모 요소에 맞춤
                  height: 'auto', // 비율 유지
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
