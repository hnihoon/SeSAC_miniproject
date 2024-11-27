import React from 'react'
import "../css/member.css"

export default function Member() {
  return (
    <>
    <table>
		<tr>
			<td>아이디*</td>
			<td><input type="text" class="memid" name="member_id" id="memid"/></td>
			<td><input type="button" id="idCheck" value="ID중복확인"/></td>
		</tr>
		<tr>
			<td>비밀번호*</td>
			<td><input type="password" class="mempw" name="member_pw"/></td>
		</tr>
		<tr>
			<td>비밀번호확인*</td>
			<td><input type="password" class="mempw2"/></td>
		</tr>
		<tr>
			<td>이름*</td>
			<td><input type="text" name="member_name" class="memname"/></td>
		</tr>
		<tr>
			<td>이메일*</td>
			<td><input type="text" class="mememail" name="member_email" id="mememail"/></td>
			<td><input type="button" value="email중복확인" onclick="emailCheck()" id="emailCheck"/></td>
		</tr>
		<tr>
			<td>헨드폰번호*</td>
			<td><input type="number" name="member_phone" class="memphone"/></td>
		</tr>
		<tr>
			<td>생년월일*</td>
			<td><input type="number" name="member_birthdate" class="membirth"/></td>
		</tr>
		<tr>
			<td>성별</td>
			<td class="genderwrap">
				<div>
					<input type="radio" name="member_gender" value="1" checked/>남자
					<input type="radio" name="member_gender" value="2"/>여자
				</div>
			</td>
		</tr>
		<tr>
			<td>수신여부동의</td>
			<td class="snswrap">
				<div>
					<input type="checkbox" id="member_sns_check" name="member_sns_check" value="0"/>SNS
					<input type="checkbox" id="member_email_check" name="member_email_check" value="0"/>이메일
				</div>
			</td>
		</tr>
	</table>
		<div class="submitbut">
			<input type="submit" value="회원등록"/>
			<input type="button" value="취소" onclick="location.href='/main'"/>
		</div>
        </>
  )
}
