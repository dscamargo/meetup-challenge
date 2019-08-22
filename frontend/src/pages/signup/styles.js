import styled from "styled-components";

import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 305px;
    display: flex;
    flex-direction: column;

    img {
      width: 100%;
      height: 42px;
      margin-bottom: 50px;
    }

    input {
      width: 100%;
      height: 50px;
      padding: 10px;
      border-radius: 4px;
      border: 0;
      background: rgba(0, 0, 0, 0.4);
      margin-bottom: 10px;
      font-size: 14px;
      color: #fff;

      &::placeholder {
        color: #979797;
      }
    }
    button {
      width: 100%;
      height: 50px;
      background: #f94d6a;
      color: #fff;
      font-weight: bold;
      border-radius: 4px;
      border: 0;
      font-size: 16px;
    }
  }
`;

export const SignupLink = styled(Link)`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: #979797;
  font-weight: bold;
  text-decoration: none;
`;
