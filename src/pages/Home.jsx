import React, { useEffect } from 'react';

import '../css/outlet.css'
import MovieList from '../components/MovieList';
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  
  return (
    <>
    <div className='hometitle'>NowPlatying <sapn
    className="homespan"
    onClick={() => navigate("/TherPage", { state: { endpoint: "movie/now_playing" } })}
    
    >더보기</sapn></div>
      <MovieList path="movie/now_playing"></MovieList>
   
    <div className='hometitle'>Popular <span
    className="homespan"
    onClick={() => navigate("/TherPage", { state: { endpoint: "movie/popular" } })}

    >더보기</span></div>
     <MovieList path="movie/popular"></MovieList>
    
    <div className='hometitle'>TopRetd <span
    className="homespan"
    onClick={() => navigate("/TherPage", { state: { endpoint: "movie/top_rated" } })}

    >더보기</span></div>
      <MovieList path="movie/top_rated"></MovieList>
    </>
  )
}
