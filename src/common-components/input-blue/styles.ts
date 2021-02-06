import styled from "styled-components";
import styledComponentsTS from "styled-components-ts";

const Stl = {
  PageInput: styled.input<{ width: number; widthFocus: number }>`
    transition: width 0.5s ease-in-out;
    width: ${(p) => p.width}px;
    height: 20px;
    border: 0;
    font-size: 15px;
    line-height: 19px;
    font-weight: 500;
    ::placeholder {
      color: #6fc7f2;
    }
    :focus {
      border-bottom: 1px solid #6fc7f2;
      width: ${(p) => p.widthFocus}px;
      ::placeholder {
        color: #788b99;
      }
    }
  `,
  Arrow: styledComponentsTS<{ state: boolean }>(styled.img)`
    ${(p) => p.state && "transform: rotate(180deg);"}
    margin: -7px 10px 0 0; 
  `,
};
export default Stl;
