import "../css/login.css";
import { login } from '../store/slices/authSlice';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState(""); // 초기값을 빈 문자열로 설정
  const [loginPw, setLoginPw] = useState("");

  // 유효성 검사 함수
  function logincheck() {
    if (loginId.length < 5 || loginId.length >= 15) {
      alert("아이디는 5~15 글자로 작성해주세요");
      return false;
    }
    if (loginPw.length < 5 || loginPw.length >= 15) {
      alert("비밀번호는 5~15 글자로 작성해주세요");
      return false;
    }
    return true;
  }

  return (
    <div>
      <div className="logwrap">
        <div className="login">
          <a href="/"><img alt="" src="/images/logo.png" /></a>
        </div>
        <div className="loginput">
          <div className="userid">
            <input
              id="member_id"
              type="text"
              name="member_id"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)} // 상태 업데이트
            />
          </div>
          <div className="userpw">
            <input
              id="member_pw"
              type="password"
              name="member_pw"
              value={loginPw}
              onChange={(e) => setLoginPw(e.target.value)} // 상태 업데이트
            />
          </div>
        </div>
        <div>
          <span>
            <input type="checkbox" id="idcheckbox" name="idcheckbox" />
            <label className="check_label" htmlFor="idcheckbox" onSelectStart={() => false}>
              아이디저장
            </label>
          </span>
          <span id="member_span">
            <a href="/member">회원가입</a><span> | </span>
            <a href="#">아이디찾기</a><span> | </span>
            <a href="#">비밀번호찾기</a>
          </span>
        </div>
        <div className="logbox">
          <button
            className="fmos"
            onClick={() => {
              if (logincheck()) { // 유효성 검사 성공 시만 실행
                dispatch(login()); // Redux 액션 호출
                navigate("/"); // 경로 이동
              }
            }}
          >
          </button>
          <div className="sociallog"></div>
        </div>
      </div>
    </div>
  );
}
