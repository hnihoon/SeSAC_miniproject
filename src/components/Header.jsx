import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { login, logout } from "../store/slices/authSlice";
import { useSelector,useDispatch } from "react-redux";
import '../css/header.css'


export default function Header() {
  const navigate = useNavigate();
  const {isLoggedIn} = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  
  return (
<div id="headerMain">
  <div className='logo loglogo'
  onClick={() => {
    navigate("/")
  }}>로고
  </div>

  <div className='mainch'
  onClick={() => {
              navigate("/")
            }}>Home
  </div>
  <div className='mainch'
  onClick={() => {
    navigate(`/movieListPage/movieListPageList/${posts[0].name}`)
  }}>MovieList
  </div>
<div className="loglogo">
   {isLoggedIn ? (
          <div
            onClick={() => {
              dispatch(logout());
              // 홈으로 보내
            }}
          >
            로그아웃
          </div>
        ) : (
          <div
            onClick={() => {
              dispatch(login());

            }}
          >
            로그인
          </div>
        )}
    </div>
</div>
)
}
