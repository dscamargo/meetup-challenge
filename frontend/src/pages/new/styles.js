import styled from "styled-components";

import "react-datepicker/dist/react-datepicker.css";

export const Container = styled.div`
  width: 100%;
`;

export const InnerContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  label{
    width: 100%;
    height: 300px;
    cursor: pointer;
    margin-top: 20px;

    &:hover{
      opacity:0.7
    }

    div{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.15);
      flex-direction: column;
        color: #979797;

      p{
        margin-top: 20px;
        font-size: 25px;
      }
    }

    img{
      width: 100%;
      height: 300px;
      border: 3px solid rgba(0,0,0,0.2)
    }
  }



  input {
    background: rgba(0, 0, 0, 0.15);
    width: 100%;
    border: 0;
    margin-top: 20px;
    padding: 20px;
    color: #fff;
    font-size: 14px;

    &::placeholder {
      color: #979797;
    }
  }
  

    &::placeholder {
      color: #979797;
    }
  }
  input[type="file"] {
    height: 200px;
    background: rgba(0, 0, 0, 0.15);
    display: none;
  }


  input[name="title"] {
    height: 50px;
  }
  input[name="place"] {
    width: 100%;
    margin-left: 20px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SaveButton = styled.button`
  background: #f94d6a;
  border-radius: 4px;
  border: 0;
  margin-top: 20px;
  width: 180px;
  height: 42px;
  color: #fff;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;

  strong {
    margin-left: 10px;
  }
`;
