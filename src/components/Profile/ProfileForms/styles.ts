import styled from "styled-components";
import styledComponentsTS from "styled-components-ts";

export const FormsDiv = styled.aside`
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  padding: 61px 16px 700px 16px;
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
  transition: all 0.2s;
  width: ${(p) => (p.width ? p.width : 100)}%;
  touch-action: manipulation;
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
