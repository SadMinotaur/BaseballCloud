import styled from "styled-components";

export const Styles = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    background: #788b99;
    display: flex;
  `,
  WhiteContainer: styled.div`
    background-color: #ffffff;
    flex: 1;
    height: 570px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  `,
  HeadText: styled.h3`
    color: #667784;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 16px;
  `,
  Text: styled.p`
    width: 420px;
  `,
};
