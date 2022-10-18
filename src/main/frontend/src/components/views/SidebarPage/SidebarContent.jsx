import React, { useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    padding-top: 3.5vh;
    padding-bottom:3vh;
    margin: 0px;
`;

const Content = styled.div`
    color:black;
    maring:0px;
    padding:0px;
`;

const Img = styled.img`
    width:70%;
    padding-bottom:2vh;
`;

function SidebarContent(props){

    return(
        <Wrapper>
            <Img src="assets/img/mayoUniversityLogo4.png" alt="mayoUniversityLogo2"/>
            <div>{props.userData}</div>
        </Wrapper>
    );
}

export default SidebarContent;