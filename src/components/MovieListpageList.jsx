import React, { useState, useEffect } from 'react';
import postApi from "../api/postsApi";
import { useNavigate, useLocation } from "react-router-dom";

export default function MovieListPageList() {
  const [allMovies, setAllMovies] = useState([]); // 전체 영화 데이터를 저장
  const [filteredMovies, setFilteredMovies] = useState([]); // 현재 장르에 해당하는 영화 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const moviesPerPage = 20; // 페이지당 영화 수

  const navigate = useNavigate();
  const location = useLocation();
  const genreId = location.state?.genreId;
  const now_playing = "movie/now_playing";
  const imageBaseURL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    // 전체 영화 데이터 병렬로 가져오기
    async function fetchAllMovies() {
      try {
        setLoading(true);

        const firstPageResponse = await postApi.getPostById(`${now_playing}?page=1`);
        const totalPages = Math.min(firstPageResponse.total_pages, 30);

        const pageRequests = [];
        for (let i = 2; i <= totalPages; i++) {
          pageRequests.push(postApi.getPostById(`${now_playing}?page=${i}`));
        }

        const pageResponses = await Promise.all(pageRequests);
        const allResults = [
          ...firstPageResponse.results,
          ...pageResponses.flatMap((res) => res.results),
        ];
        const moviesWithPosters = allResults.filter((movie) => movie.poster_path);

        setAllMovies(moviesWithPosters);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAllMovies();
  }, []);

  useEffect(() => {
    // 전달받은 장르 ID로 필터링
    if (genreId) {
      const genreMovies = allMovies.filter((movie) => movie.genre_ids.includes(genreId));
      setFilteredMovies(genreMovies);
      setCurrentPage(1);
    }
  }, [genreId, allMovies]);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => Math.max(1, prev + direction));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const startIndex = (currentPage - 1) * moviesPerPage;
  const paginatedMovies = filteredMovies.slice(startIndex, startIndex + moviesPerPage);

  return (
    <div>
      {/* 영화 목록 */}
      <ul id="homeUl" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 0 }}>
        {paginatedMovies.map((el, index) => (
          <li
            key={index}
            style={{ margin: '10px', listStyle: 'none', cursor: 'pointer' }}
            onClick={() => { navigate(`/MovieDetailPage`, { state: { el } }) }}
          >
            <img src={`${imageBaseURL}${el.poster_path}`} alt={el.title} />
            <p>{el.title}</p>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => handlePageChange(-1)}
          disabled={currentPage === 1}
          style={{ margin: '5px', padding: '10px', cursor: 'pointer' }}
        >
          이전
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredMovies.length / moviesPerPage)}
        </span>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage >= Math.ceil(filteredMovies.length / moviesPerPage)}
          style={{ margin: '5px', padding: '10px', cursor: 'pointer' }}
        >
          다음
        </button>
      </div>
    </div>
  );
}
