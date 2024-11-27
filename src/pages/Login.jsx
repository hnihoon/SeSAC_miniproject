import React from 'react'
import "../css/login.css";
import { login } from '../store/slices/authSlice';
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

  return (
    <div>
	 <div class="logwrap">
	 	<div class="login">
	 		<a href="/"><img alt="" src="/images/logo.png"></img></a>
	 	</div>
	 	<div class="loginput">
	 	<div class="userid">
		     <input id="member_id" type="text" name="member_id"></input>
		</div>
		<div class="userpw">
		     <input id="member_pw" type="password" name="member_pw"></input>
		 </div>
 	</div>
 	<div>
 		<span>
	    <input type="checkbox" id="idcheckbox" name="idcheckbox"></input>
	    <label class="check_label" for="idcheckbox" th:onclick="toggleCheckbox()" onselectstart="return false;">아이디저장</label>
	    </span>
	    <span>
		    <a href="/member/member.do">회원가입 | </a>
		    <a href="#">아이디찾기 | </a>
		    <a href="#">비밀번호찾기</a>
	    </span>
	</div>
	<div class="logbox">
			<button class="fmos"
			onClick={() => {
				dispatch(login());
				navigate("/")
			  }}
			></button>
		<div class="sociallog">
		</div>
	</div>
 </div>
 </div>
  )
}
