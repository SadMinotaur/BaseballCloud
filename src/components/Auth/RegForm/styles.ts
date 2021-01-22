import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  max-width: 450px;
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

export const Button = styled.button`
  width: 100%;
  height: 52px;
  margin-bottom: 10px;
  color: #ffffff;
  border: solid 1px transparent;
  background-color: #48bbff;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 0 4px 0 rgba(72, 187, 255, 0.8);
  }
`;

export const ButtonContainer = styled.div`
  height: 51px;
  width: 100%;
  display: flex;
  margin: 0 0 20px 0;
`;

export const ButtonInCont = styled.button<{
  position?: string;
  state: boolean;
}>`
  color: #ffffff;
  ${(p) =>
    p.position === "left"
      ? "border-top-left-radius: 4px;border-bottom-left-radius: 4px;"
      : " border-top-right-radius: 4px; border-bottom-right-radius: 4px;"}
  ${(p) =>
    p.state === true
      ? "background-color: #35c32a;"
      : "background-color: white; color:#35c32a; "}    
  border: solid 1px #35c32a;
  flex: 1;
`;

export const TextRect = styled.div`
  background: #48bbff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  color: white;
  text-align: center;
`;

export const TextRectMain = styled.div`
  font-size: 36px;
  font-weight: 700;
  line-height: 0.78;
  margin-bottom: 21px;
`;

export const SignUpSwitch = styled.div`
  display: flex;
  width: 180px;
  justify-content: space-around;
`;

export const Warning = styled.p`
  margin-left: 10px;
  color: #f05f62;
`;
