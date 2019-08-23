import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const InnerContainer = styled.div`
  width: 50%;
  margin: 0 auto;
`;
export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    flex-direction: column;
    margin-top: 50px;

    &:first-child {
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);

      input:last-child {
        margin-bottom: 25px;
      }
    }

    &:last-child {
      margin-top: 25px;
      border-bottom: 0;
    }

    input {
      width: 100%;
      height: 50px;
      background: rgba(0, 0, 0, 0.15);
      border: 0;
      border-radius: 4px;
      margin-bottom: 10px;
      padding: 10px;
      color: #fff;
      font-size: 14px;

      &::placeholder {
        color: #979797;
      }
    }
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  button {
    background: #f94d6a;
    display: flex;
    text-align: right;
    justify-content: center;
    align-items: center;
    border: 0;
    border-radius: 4px;
    width: 160px;
    height: 40px;
    color: #fff;
    font-weight: bold;
    font-size: 14px;

    span {
      margin-left: 10px;
    }
  }
`;
