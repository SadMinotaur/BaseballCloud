import styled from "styled-components";
import styledComponentsTS from "styled-components-ts";

const Stl = {
  PageInput: styled.input<{ width: number; widthFocus: number }>`
    transition: width 0.5s ease-in-out;
    width: ${(p) => p.width}px;
    height: 20px;
    border: 0;
    font-size: 16px;
    line-height: 19px;
    font-weight: 500;
    color: #48bbff;
    :focus {
      border-bottom: 1px solid #6fc7f2;
      color: #788b99;
      width: ${(p) => p.widthFocus}px;
    }
    ::placeholder {
      color: #6fc7f2;
    }
  `,
  Arrow: styledComponentsTS<{ state: boolean }>(styled.img)`
    ${(p) => p.state && "transform: rotate(180deg);"}
    margin: -7px 10px 0 0; 
  `,
};
export default Stl;
