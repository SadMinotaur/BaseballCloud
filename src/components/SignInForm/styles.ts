import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  max-width: 450px;
  /* height: 400px; */
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
  margin: 8px 0 40px 0;
`;

export const InputForm = styled.input`
  width: 99%;
  height: 50px;
  border-radius: 4px;
  background-color: #eff1f3;
  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  color: #667784;
  border: 1px solid transparent;
  margin-bottom: 15px;
`;

export const Button = styled.button`
  width: 100%;
  height: 52px;
  margin-bottom: 15px;
  color: #ffffff;
  border: solid 1px transparent;
  background-color: #48bbff;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 0 4px 0 rgba(72, 187, 255, 0.8);
  }
`;

export const ForgotPassword = styled.div`
  margin-left: 65%;
  margin-bottom: 15px;
  color: #23527c;
`;

export const SignIn = styled.div`
  font-size: 16px;
  display: flex;
  color: #667784;
`;
