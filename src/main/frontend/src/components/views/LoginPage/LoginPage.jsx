import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  let courseList = null;
  let userData = null;

  const handleInputId = (e) => {
    setUserId(e.target.value);
  };
  const handleInputPw = (e) => {
    setUserPw(e.target.value);
  };

  const onClickLogin = async () => {
    // 금주's code
    // if(userId==='mayo' && userPw==='mayo'){
    //   props.getIsLogin(true);
    // } else { // 로그인 시 생길 수 있는 예외들 처리 (아이디 미입력, 비번 미입력, 틀린 아이디 혹은)
    //   alert("문제");
    // }

    await axios.get("/main").then((res) => {
      courseList = res.data.content;
      console.log(res.data.content);
    });

    console.log(userId);
    console.log(userPw);
    await axios
      .post("/login", null, {
        params: {
          userId,
          userPw,
        },
      })
      .then((res) => {
        console.log(res.data);
        userData = res.data;
      })
      .catch(function (error) {
        console.log(error);
        // 오류발생시 실행
      })
      .then(function () {
        // 항상 실행
      });

    if (userData !== null) {
      console.log("로그인되렴");
      navigate("/main", { state: { userData, courseList } });
    } else if (userData === null) {
      console.log("로그인 안돼!");
    } else {
      console.log("뭐가 잘못이여?");
    }
  };

  //  useEffect(() => {
  //      axios.get('/user_inform/login')
  //      .then(res => console.log(res))
  //      .catch()
  //  },[])

  return (
    <Wrapper>
      <LogoImg
        src="assets/img/mayoUniversityLogo.png"
        alt="mayoUniversityLogo1"
      />
      <Form>
        <IDPWDiv>
          {/* 가로폭 길이 심하게 줄이면 서로 어긋나면서 뒤틀리는 문제 해결하기 */}
          <InputID
            type="text"
            name="input_id"
            value={userId}
            onChange={handleInputId}
            placeholder="ID"
          />
          <PWButtonDiv>
            <InputPW
              type="password"
              name="input_pw"
              value={userPw}
              onChange={handleInputPw}
              placeholder="Password"
            />
            <Button type="button" onClick={onClickLogin}>
              <ButtonImg src="assets/img/sign-in.png" alt="signIn" />
            </Button>
          </PWButtonDiv>
        </IDPWDiv>
      </Form>
      <P>
        게스트로 로그인 하시려면 아이디와 비밀번호를 <Span>mayo</Span> 로
        입력하세요.
      </P>
    </Wrapper>
  );
}

export default LoginPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  backroud: #eee !important;
`;

const LogoImg = styled.img`
  width: 6.1%;
  height: auto;
`;

const ButtonImg = styled.img`
  width: 65%;
  height: 55%;
  min-height: 15px;
  margin-top: auto;
  margin-bottom: auto;
  opacity: 0.4;
`;

const Form = styled.div`
  max-width: 20vm;
  min-width: 393px;
  margin: 0 auto;
  background-color: #fff;
`;

const IDPWDiv = styled.div`
  display: flex;
  flex-direction: column;
  // width: 30vw;
  width: 15.5vw;
  height: 9vh;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;

  margin-top: 5.5vh;
  margin-bottom: 4.4vh;
`;

const PWButtonDiv = styled.div`
  display: flex;
  flex-direction: row;

  // width: 13vw;
  // height: auto;
  width: 100%;
  height: 50%;
  justify-content: center;
`;

// chrome의 아이디 비밀번호 저장 기능 이용시 css 변화 문제 해결해야 됨
const InputID = styled.input`
  position: relative;
  font-size: 0.9rem;
  // 금주's code
  // height: 5vh;
  // width: 13vw;
  height: 50%;
  width: 100%;
  min-width: 144px;
  padding: 12px;
  padding-left: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  @include box-sizing(border-box);
  &:focus {
    z-index: 2;
  }
  &::-webkit-input-placeholder {
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.3);
  }
`;

const InputPW = styled.input`
  position: relative;
  font-size: 0.9rem;
  // 금주's code
  // height: 5vh;
  // width: 12vw;
  height: 100%;
  width: 87%;
  min-width: 109px;
  padding: 12px;
  padding-left: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 6px;
  @include box-sizing(border-box);
  &:focus {
    z-index: 2;
  }
  &::-webkit-input-placeholder {
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.3);
  }
`;

const Button = styled.button`
  position: relative;
  font-size: 16px;
  min-height: 26px;
  // 금주's code
  // height: 5vh;
  // width: 2.8vw;
  height: 100%;
  width: 13%;
  min-width: 35px;

  padding-top: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom-right-radius: 6px;
  cursor: pointer;
  @include box-sizing(border-box);
  &:focus {
    z-index: 2;
  }
  &:hover {
    background: rgb(223, 223, 223, 0.9);
  }
`;

const P = styled.p`
  padding: 0;
  margin: 0;
  margin-bottom: 10px;
  font-size: 0.8rem;
`;

const Span = styled.span`
  color: #d32f2fcb;
  font-weight: 600;
`;
