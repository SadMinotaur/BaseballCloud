import styled from "styled-components";

const Stl = {
  PageInput: styled.input<{ width: number; widthFocus: number }>`
    transition: width 0.5s ease-in-out;
    width: ${(p) => p.width}px;
    border: 0;
    font-size: 16px;
    line-height: 19px;
    font-weight: 500;
    :focus {
      border-bottom: 1px solid #6fc7f2;
      color: #788b99;
      width: ${(p) => p.widthFocus}px;
      ::placeholder {
        color: #b6c1c8;
      }
    }
    ::placeholder {
      color: #48bbff;
    }
  `,
};
export default Stl;
