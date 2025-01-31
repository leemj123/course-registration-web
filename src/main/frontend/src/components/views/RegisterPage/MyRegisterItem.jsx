import React from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import {
  userInfoState,
  courseListState,
  userRegisterState,
} from "../../recoil/userDataStates";
import { currentErrorState } from "../../recoil/currentStates";
import axios from "axios";

function MyRegisterItem(props) {
  const setUserInfoG = useSetRecoilState(userInfoState);
  const setCourseListG = useSetRecoilState(courseListState);
  const setUserRG = useSetRecoilState(userRegisterState);
  const setCurrentErrorG = useSetRecoilState(currentErrorState);

  let myRegisterBtnValue = {};

  const registerButtonClicked = async () => {
    myRegisterBtnValue = props.item;
    await axios
      .post("/api/subjectDelete", { subjectId: myRegisterBtnValue.subjectId })
      .then((res) => setUserInfoG(res.data))
      .catch(function (error) {
        console.log("MyRegisterBtn Error");
        console.log(error);
        setCurrentErrorG([error.response.data.errorMessage, true]);
        setTimeout(function () {
          setCurrentErrorG([error.response.data.errorMessage, false]);
        }, 2000);
      });
    await axios.get("/api/subjectGet").then((res) => setUserRG(res.data));
    await axios
      .get("/api/courseListGet")
      .then((res) => setCourseListG(res.data.content));
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
      <Td name={props.item.register_count}>
        {props.item.register_count}&nbsp;(
        {((props.item.register_count / props.item.max_count) * 100).toFixed(2)}
        %)
      </Td>
      <Td name={props.item.subject_time}>{props.item.subject_time}</Td>
      <Td name={props.item.professor}>{props.item.professor}</Td>
      <Td>
        <CancelButtonInput
          type="button"
          value="수강취소"
          onClick={registerButtonClicked}
        />
      </Td>
    </Tr>
  );
}

export default MyRegisterItem;

const Tr = styled.tr``;
const Td = styled.td`
  border: 0px;
  padding: 4px 0;
  margin: 0px;
  font-size: 12px;
  background-color: #ffffff;
  border-bottom: 1px solid #aaaaaa;
`;
const CancelButtonInput = styled.input`
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
