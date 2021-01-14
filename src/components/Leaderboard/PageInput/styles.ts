import styled from "styled-components";
import styledComponentsTS from "styled-components-ts";

const Stl = {
  PageInput: styledComponentsTS<{ width: number }>(styled.input)`
    transition: width 0.5s ease-in-out;
    padding: 5px 5px 7px 0;
    width: ${(p) => p.width && p.width}px;
    height: 20px;
    border: 0;
    font-size: 16px;
    line-height: 19px;
    font-weight: 500;
    color: #6fc7f2;
    :focus {
      border-bottom: 1px solid #6fc7f2;
      color: #788b99;
      width: 180px;
    }
  `,
  Arrow: styledComponentsTS<{ state: boolean }>(styled.img)`
    ${(p) => p.state && "transform: rotate(180deg);"}
    margin: -7px 10px 0 0; 
  `,
};
export default Stl;
