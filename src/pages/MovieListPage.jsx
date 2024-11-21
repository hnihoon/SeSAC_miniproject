import React from 'react'
import MovieListHeader from '../components/MovieListHeader'
import { Outlet } from 'react-router-dom'
export default function MovieListPage() {
    
  return (
    <>
    <MovieListHeader></MovieListHeader>
    <Outlet></Outlet>
    </>
  )
}
