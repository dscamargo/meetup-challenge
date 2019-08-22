import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
`;

export const InnerContainer = styled.div`
  width: 50%;
  margin: 0 auto;
`;

export const NewMeetup = styled(Link)`
  width: 175px;
  height: 42px;
  background: #f94d6a;
  border: 0;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    strong {
      font-size: 14px;
      margin-left: 10px;
    }
  }
`;

export const MyMeetups = styled.div`
  width: 100%;
  height: 138px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  strong {
    color: #fff;
    font-size: 32px;
  }
`;

export const Meetup = styled.div`
  background: rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: #fff;
    font-size: 16px;
  }

  > div {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      color: #979797;
      font-size: 14px;
    }
  }
`;
