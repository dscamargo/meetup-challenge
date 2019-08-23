import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
`;

export const InnerContainer = styled.div`
  width: 50%;
  margin: 0 auto;
`;

export const EditLink = styled(Link)`
  text-decoration: none;
  background: #4dbaf9;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 4px;
  width: 115px;
  height: 40px;
  color: #fff;
  margin-right: 10px;
  font-weight: bold;
  font-size: 14px;

  span {
    margin-left: 5px;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 140px;
  align-items: center;

  strong {
    color: #fff;
    font-size: 32px;
    width: 70%;
  }

  div {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0;
      border-radius: 4px;
      width: 115px;
      height: 40px;
      color: #fff;

      span {
        font-weight: bold;
        font-size: 14px;
      }
    }
    button[name="cancel"] {
      background: #d44059;
    }
  }
`;

export const InformationsContainer = styled.div`
  width: 100%;
  height: 300px;
  img {
    width: 100%;
    height: 300px;
    background-position: center;
    border: 0;
    overflow: hidden;
  }
`;

export const Description = styled.div`
  width: 100%;
  padding: 20px 0;

  h3 {
    width: 100%;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
  }
`;

export const LocalContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Date = styled.div`
  width: 35%;
  display: flex;
  align-items: center;
  color: #979797;

  span {
    margin-left: 10px;
    font-size: 14px;
  }
`;

export const Place = styled.div`
  width: 65%;
  display: flex;
  align-items: center;
  color: #979797;
  span {
    margin-left: 10px;
    font-size: 14px;
  }
`;
