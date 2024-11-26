import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import postApi from "../api/postsApi";
import '../css/movielist.css';

export default function MovieListHeader() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await postApi.getGenres();
        setData(result.genres);
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
          onClick={() => navigate(`/movieListPage/movieListPageList/${el.name}`, { state: { genreId: el.id } })}
        >{el.name}
        </div>
      ))}
    </div>
  );
}
