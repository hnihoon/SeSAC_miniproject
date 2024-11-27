import React, { useState, useRef } from "react";
import "../css/member.css";

export default function Member() {
  // 상태 변수 선언
  const [idCheck, setIdCheck] = useState(""); // 입력된 아이디 상태
  const [pwCheck, setPwCheck] = useState(""); // 입력된 아이디 상태
  localStorage.setItem("userId", "ghghgh")
  const storedUserId = localStorage.getItem("userId") || ""; // 저장된 아이디
  const idInputRef = useRef(null); // 아이디 입력 필드 참조

  // ID 중복 확인 함수
  function check() {
	if (idCheck < 5 || idCheck > 15) {
		alert("아이디는 5~15 글자로 작성해주세요");
 		idInputRef.current.focus(); // 입력 필드로 포커스 이동
		return false
    //////////////////////////////아이디 중복 체크 까지 구현////////////////////////////////////////
	} else if(pwCheck < 5 || pwCheck > 15){
		alert("비밀번호는 5~15 글자로 작성해주세요");
  }

    if (storedUserId === idCheck) {
		idInputRef.current.focus(); 
      alert("중복된 아이디입니다.");
    } else {
		idInputRef.current.focus(); 
      alert("사용 가능한 아이디입니다.");
    }
  }

  return (
    <>
      <table>
        <tr>
          <td>아이디*</td>
          <td>
            <input
              type="text"
              className="memid"
              name="member_id"
              id="memid"
			  ref={idInputRef}
              value={idCheck}
              onChange={(e) => setIdCheck(e.target.value)} // 상태 업데이트
            />
          </td>
          <td>
            <input
              type="button"
              id="idCheck"
              value="ID중복확인"
              onClick={check} // 중복 확인 함수 호출
            />
          </td>
        </tr>
        <tr>
          <td>비밀번호*</td>
          <td>
            <input type="password" className="mempw" name="member_pw" />
          </td>
        </tr>
        <tr>
          <td>비밀번호확인*</td>
          <td>
            <input type="password" className="mempw2" />
          </td>
        </tr>
        <tr>
          <td>이름*</td>
          <td>
            <input type="text" name="member_name" className="memname" />
          </td>
        </tr>
        <tr>
          <td>이메일*</td>
          <td>
            <input type="text" className="mememail" name="member_email" id="mememail" />
          </td>
          <td>
            <input
              type="button"
              value="email중복확인"
              onClick={() => alert("이메일 중복 확인 로직 추가")}
              id="emailCheck"
            />
          </td>
        </tr>
        <tr>
          <td>헨드폰번호*</td>
          <td>
            <input type="number" name="member_phone" className="memphone" />
          </td>
        </tr>
        <tr>
          <td>생년월일*</td>
          <td>
            <input type="number" name="member_birthdate" className="membirth" />
          </td>
        </tr>
        <tr>
          <td>성별</td>
          <td className="genderwrap">
            <div>
              <input type="radio" name="member_gender" value="1" defaultChecked />남자
              <input type="radio" name="member_gender" value="2" />여자
            </div>
          </td>
        </tr>
        <tr>
          <td>수신여부동의</td>
          <td className="snswrap">
            <div>
              <input type="checkbox" id="member_sns_check" name="member_sns_check" value="0" />SNS
              <input type="checkbox" id="member_email_check" name="member_email_check" value="0" />이메일
            </div>
          </td>
        </tr>
      </table>
      <div className="submitbut">
        <input type="submit" value="회원등록" />
        <input type="button" value="취소" onClick={() => (window.location.href = "/main")} />
      </div>
    </>
  );
}
