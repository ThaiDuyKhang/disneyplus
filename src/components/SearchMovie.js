import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchMovie(props) {
  const navigate = useNavigate();

  return (
    <Container>
      <BackBtn className="back">
        <button onClick={() => navigate(-1)}>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg> Back
        </button>
      </BackBtn>
      <Content>
        <input type="text" placeholder="Enter movie's name..." />
      </Content>
      <BgImage />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: calc(100vh - 90px);
  overflow-x: hidden;
  top: 90px;
  padding: 0 calc(3.5vw + 5px);

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const BackBtn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  overflow-x: hidden;
  top: 30px;
  min-height: 100px;

  button {
    opacity: 0.6;
    display:flex;
    align-items:center;
    font-size: 25px;
    background: transparent;
    border:none;
    cursor:pointer;
    color: white;
    transition: opacity .2s ease;

    svg {
      margin-right: 10px;
    }

    &:hover{
      opacity: 1;
    }

    @media (max-width: 768px) {
      font-size: 16px;
      top:0px;
      padding: 0 calc(3.5vw + 5px);
      svg {
        margin-right: 0px;
        width:25px;
        height:25px;
      }
    }
  }
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  overflow-x: hidden;
  top: 90px;
  padding: 0 calc(3.5vw + 5px);

  input {
    height: 100px;
    width: 100%;
    max-width: 600px;
    border-radius: 50px;
    border: 1px solid #f9f9f9;
    padding: 30px;
    font-size: 25px;
    font-weight: 500;
    color: #000;
    background: rgb(249,249,249);

    &:focus-visible{
      outline-offset: -1px;
      color: #000;
    }

    @media (max-width: 768px) {
      height: 70px;
      font-size:14px;
    }
  }

`;

const BgImage = styled.div`
  height: 100%;
  opacity:0.8;
  background-image: url("/images/login-background.jpg");
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
`;