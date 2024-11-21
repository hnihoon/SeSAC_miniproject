import React, { useEffect } from 'react';

import '../css/outlet.css'
import MovieList from '../components/MovieList';

export default function Home() {
  return (
    <>
    <div className='hometitle'>NowPlatying </div>
      <MovieList path="movie/now_playing"></MovieList>
   
    <div className='hometitle'>Popular</div>
     <MovieList path="movie/popular"></MovieList>
    
    <div className='hometitle'>TopRetd</div>
      <MovieList path="movie/top_rated"></MovieList>
    </>
  )
}
