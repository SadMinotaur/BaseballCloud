import styled from "styled-components";

export const FooterStyle = styled.footer`
  grid-area: ft;
  width: 100%;
  display: flex;
  padding: 10px 10px 10px 10px;
  background-color: #fff;
  box-sizing: border-box;
  color: #333;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 700px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const Span = styled.label`
  font-weight: 400;
`;

export const Legal = styled.div`
  display: flex;
`;

export const Links = styled.a`
  margin-left: 8px;
  color: #337ab7;
  text-decoration: none;
`;

export const Social = styled.div`
  text-align: end;
  flex: 1;
  @media (max-width: 600px) {
    text-align: center;
  }
`;
