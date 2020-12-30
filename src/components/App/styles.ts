import styled from "styled-components";
import back from "./../../assets/loginScreenBack.png";

export const MainComp = styled.div`
  height: 100%;
`;

export const LoginPageStyle = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-image: url(${back});
  background-position: top center;
  background-size: cover;
`;
