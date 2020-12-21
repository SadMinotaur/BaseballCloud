import styled from "styled-components";
import back from "./../../assets/e2b853b6994b3e23d56d2dc1139f8d75.png";

export const MainComp = styled.div`
  min-height: 88vh;
`;

export const LoginPageStyle = styled.div`
  display: flex;
  min-height: 88vh;
  justify-content: center;
  align-items: center;
  background-image: url(${back});
  background-position: top center;
  background-size: cover;
`;
