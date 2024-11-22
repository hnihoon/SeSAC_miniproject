import React, { useState, useEffect } from 'react';
import postApi from "../api/postsApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function MovieListpageList() {
  const [data, setData] = useState(null); // 영화 데이터를 저장
  const [genres, setGenres] = useState(null); // 장르 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const { postId } = useParams(); // URL에서 postId 가져오기
  const posts = useSelector((state) => state.posts);
  const navigate = useNavigate(); // React Router의 네비게이션 훅

  let checkid = 0;

  posts.filter((num)=> {
    // console.log(num.name);
    
    if(postId === num.name){
      return checkid = num.id
    }
  })

  console.log(checkid);
  
  const now_playing = "movie/now_playing";
  const imageBaseURL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
  console.log(postId);
    
    async function fetchData() {
      try {
        setLoading(true); // 로딩 시작

        // 장르 데이터 가져오기
        const genresResult = await postApi.getGenres();
        setGenres(genresResult.genres);

        // 영화 데이터 가져오기
        const movieResult = await postApi.getPostById(now_playing);
        setData(movieResult);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message); // 에러 상태 설정
      } finally {
        setLoading(false); // 로딩 종료
      }
    }

    fetchData();
  }, [postId]); // postId가 변경될 때마다 실행

  if (loading) return <div>Loading...</div>; // 로딩 중
  if (error) return <div>Error: {error}</div>; // 에러 발생 시
  if (!data || !data.results) return <div>No Data Available</div>; // 데이터가 없는 경우

  return (
    <>
      <ul id="homeUl" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', padding: 0 }}>
        {data.results.map((el, index) => {
          // 해당 영화가 현재 장르 ID를 포함하는지 확인
          if (el.genre_ids.includes(parseInt(checkid))) {
            return (
              <li 
              key={index} 
              style={{ margin: '10px', listStyle: 'none', cursor: 'pointer'}}
              onClick={() => {navigate(`/movieDetailPage/movieDetail`, {state: {el} })}} // 올바른 경로로 이동
              >
                <img src={`${imageBaseURL}${el.poster_path}`} alt={el.title} />
                <p>{el.title}</p>
              </li>
            );
          }
          return null; // 조건을 만족하지 않으면 렌더링하지 않음
        })}
      </ul>
    </>
  );
}
