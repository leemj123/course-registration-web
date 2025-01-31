import React, { useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
  userInfoState,
  courseListState,
  userPrevRegisterState,
} from "../../recoil/userDataStates";
import { currentErrorState } from "../../recoil/currentStates";
import axios from "axios";
import styled from "styled-components";

function PrevRegisterItem(props) {
  const setUserInfoG = useSetRecoilState(userInfoState);
  const [userPRG, setUserPRG] = useRecoilState(userPrevRegisterState);
  const setCourseListG = useSetRecoilState(courseListState);
  const setCurrentErrorG = useSetRecoilState(currentErrorState);

  useEffect(() => {}, [userPRG]);

  let prevBtnValue = {};

  const registerButtonClicked = async () => {
    prevBtnValue = props.item;
    await axios
      .post("/api/prevPost", {
        id: prevBtnValue.id,
        major: prevBtnValue.major,
        subject_name: prevBtnValue.subject_name,
        grade: prevBtnValue.grade,
        subjectId: prevBtnValue.subjectId,
        subject_type: prevBtnValue.subject_type,
        score: prevBtnValue.score,
        max_count: prevBtnValue.max_count,
        prev_register_count: prevBtnValue.register_count,
        subject_time: prevBtnValue.subject_time,
        professor: prevBtnValue.professor,
      })
      .then((res) => setUserInfoG(res.data))
      .catch(function (error) {
        console.log("PrevBtn Error");
        console.log(error);
        setCurrentErrorG([error.response.data.errorMessage, true]);
        setTimeout(function () {
          setCurrentErrorG([error.response.data.errorMessage, false]);
        }, 2000);
      });
    await axios.get("/api/prevGet").then((res) => setUserPRG(res.data));
    await axios
      .get("/api/courseListGet")
      .then((res) => {setCourseListG(res.data.content);})
  };

  return (
    <Tr>
      <Td name={props.idx}>{props.idx + 1}</Td>
      <Td name={props.item.major}>{props.item.major}</Td>
      <Td name={props.item.grade}>{props.item.grade}</Td>
      <Td name={props.item.subject_name}>{props.item.subject_name}</Td>
      <Td name={props.item.subjectId}>{props.item.subjectId}</Td>
      <Td name={props.item.subject_type}>{props.item.subject_type}</Td>
      <Td name={props.item.score}>{props.item.score}</Td>
      <Td name={props.item.max_count}>{props.item.max_count}</Td>
      <Td name={props.item.prev_register_count}>
        {props.item.prev_register_count}&nbsp;(
        {(
          (props.item.prev_register_count / props.item.max_count) *
          100
        ).toFixed(2)}
        %)
      </Td>
      <Td name={props.item.subject_time}>{props.item.subject_time}</Td>
      <Td name={props.item.professor}>{props.item.professor}</Td>
      <Td>
        <RegisterButtonInput
          type="button"
          value="수강신청"
          onClick={registerButtonClicked}
        />
      </Td>
    </Tr>
  );
}

export default PrevRegisterItem;

const Tr = styled.tr``;
const Td = styled.td`
  border: 0px;
  padding: 4px 0;
  margin: 0px;
  font-size: 12px;
  background-color: #ffffff;
  border-bottom: 1px solid #aaaaaa;
`;
const RegisterButtonInput = styled.input`
  border-radius: 7px;
  background-color: rgb(253, 243, 215);
  color: #313131;
  font-size: 8px;
  padding: 5px;
  border: none;
  box-shadow: 1px 1px 1px #31313157;
  &:active {
    box-shadow: none;
    transform: translate(1px, 1px);
  }
`;
