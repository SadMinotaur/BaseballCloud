import styled from "styled-components";
import styledComponentsTS from "styled-components-ts";

export const FormsDiv = styled.aside`
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  padding: 16px 16px 0 16px;
  box-sizing: border-box;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const Input = styledComponentsTS<{ width: number }>(styled.input)`
  height: 40px;
  padding: 0 16px;
  width: ${(p) => (p.width ? p.width : 98)}%;
  border-radius: 4px;
  background-color: #eff1f3;
  font-weight: 400;
  color: #667784;
  border: 1px solid transparent;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

export const Select = styledComponentsTS<{ width: number }>(styled.select)`
  height: 40px;
  width: ${(p) => (p.width ? p.width : 100)}%;
  margin-bottom: 10px;
  padding-left: 16px;
  font-size: 16px;
  line-height: 38px;
  font-weight: 400;
  color: #667784;
  border: 1px solid transparent;
  background-color: #eff1f3;
  border-radius: 4px;
`;

export const AboutTextarea = styled.textarea`
  width: 100%;
  height: 110px;
  resize: none;
  border-radius: 4px;
  background-color: #eff1f3;
  padding: 11px 16px;
  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  color: #667784;
  border: 1px solid transparent;
  margin: 0 0 10px 0;
`;

export const SectionText = styled.p`
  line-height: 1.25;
  font-size: 18px;
  font-weight: 900;
  color: #414f5a;
  padding-right: 12px;
`;

export const Hr = styled.hr`
  width: 100%;
`;

export const ButtonProfile = styledComponentsTS<{ borderBlue: boolean }>(
  styled.button
)`
  width: 47%;
  padding: 7px 19px 10px 18px;
  border-radius: 4px;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  border: solid 1px #48bbff;
  ${(p) =>
    p.borderBlue
      ? "color: white; background-color: rgba(72, 187, 255, 0.8);"
      : "color: black; background-color: white;"}
  :hover {
    box-shadow: 0 0 4px 0 rgba(72, 187, 255, 0.8);
    border: solid 1px #48bbff;
    ${(p) => !p.borderBlue && "color: #48bbff;"}
  }
`;

export const WarningText = styled.p`
  color: #f05f62;
  font-size: 1.6rem;
  line-height: 1.42857143;
`;
