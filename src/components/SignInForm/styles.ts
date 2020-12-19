import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  max-width: 450px;
  height: 400px;
  background-color: hsla(0, 0%, 100%, 0.8);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  padding: 16px;
  border-radius: 8px;
  backdrop-filter: blur(5px);
`;

export const FormText = styled.div`
  font-size: 24px;
  line-height: 1.25;
  font-weight: 400;
  color: #667784;
`;

export const FormTextSign = styled.div`
  text-align: center;
  font-size: 16px;
  margin: 8px;
`;
