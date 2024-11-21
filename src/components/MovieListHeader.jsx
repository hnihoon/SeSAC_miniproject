import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import postApi from "../api/postsApi";
import '../css/movielist.css';

export default function MovieListHeader() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router의 네비게이션 훅

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await postApi.getGenres();
        setData(result.genres); // 장르 데이터를 설정
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="headerul">
      {data.map((el, index) => (
        <div
          key={index}
          onClick={() => navigate(`/movieListPage/movieListPageList/${el.name}`)} // 올바른 경로로 이동
        >
          {el.name}
        </div>
      ))}
    </div>
  );
}
