// import React from "react";
// import { Link,useNavigate } from "react-router-dom";
// import { login, logout } from "../store/slices/authSlice";
// import { useSelector,useDispatch } from "react-redux";
// import '../css/header.css'


// export default function Header() {
//   const navigate = useNavigate();
//   const {isLoggedIn} = useSelector((state) => state.auth);
//   const posts = useSelector((state) => state.posts);

//   const dispatch = useDispatch();
  
//   return (
// <div id="headerMain">
//     <div className='logo'
//     onClick={() => {
//       navigate("/")
//     }}>
//     <img src="/images/logo.png" alt="로고" id="logoimg"></img>
//     </div>


//   <div className='mainch'
//   onClick={() => {
//               navigate("/")
//             }}>Home
//   </div>
//   <div className='mainch'
//   onClick={() => {
//     navigate(`/movieListPage/movieListPageList/${posts[0].name}`, { state: { genreId : posts[0].id } })
//   }}>MovieList
//   </div>
// <div className="loglogo">
//    {isLoggedIn ? (
//           <div
//             onClick={() => {
//               dispatch(logout());
//             }}
//           >
//             로그아웃
//           </div>
//         ) : (
//           <div
//             onClick={() => {
//               navigate("/loginPage")
//             }}
//           >
//             로그인
//           </div>
//         )}
//     </div>
// </div>
// )
// }

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, logout } from "../store/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import '../css/header.css';

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  // 햄버거 메뉴 상태
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div id="headerMain">
      {/* 로고 */}
      <div
        className="logo"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src="/images/logo.png" alt="로고" id="logoimg"></img>
      </div>

      {/* 햄버거 아이콘 */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        &#9776;
      </div>

      {/* 메뉴 아이템 */}
      <div className={`menu-items ${menuOpen ? "show" : ""}`}>
        <div className="search"><input type="text" className="searchinput"/>검색</div>
        <div
          className="mainch"
          onClick={() => {
            setMenuOpen(false);
            navigate("/");
          }}
        >
          Home
        </div>
        <div
          className="mainch"
          onClick={() => {
            setMenuOpen(false);
            navigate(`/movieListPage/movieListPageList/${posts[0].name}`, {
              state: { genreId: posts[0].id },
            });
          }}
        >
          MovieList
        </div>
        <div className="loglogo">
          {isLoggedIn ? (
            <div
              onClick={() => {
                dispatch(logout());
                setMenuOpen(false);
              }}
            >
              로그아웃
            </div>
          ) : (
            <div
              onClick={() => {
                navigate("/loginPage");
                setMenuOpen(false);
              }}
            >
              로그인
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
