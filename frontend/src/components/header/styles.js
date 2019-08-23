import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  height: 75px;
  display: flex;
  justify-content: center;

  > div {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 42px;
      height: 42px;
    }

    > div {
      display: flex;
      flex-direction: row;

      button {
        width: 71px;
        height: 42px;
        background: #d44059;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        border: 0;
        border-radius: 4px;
        margin-left: 20px;
      }

      > div {
        display: flex;
        flex-direction: column;
        text-align: right;

        strong {
          color: #fff;
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 5px;
          text-decoration: none;
        }

        span {
          color: #979797;
          font-size: 14px;
        }
      }
    }
  }
`;
