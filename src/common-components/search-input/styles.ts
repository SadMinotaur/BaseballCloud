import styled from "styled-components";

const Stl = {
  PageInput: styled.input<{ width: number; widthFocus: number }>`
    padding: 0 0 5px 10px;
    width: ${(p) => p.width}px;
    border: 0;
    font-size: 16px;
    line-height: 19px;
    font-weight: 500;
    ::placeholder {
      color: #b6c1c8;
    }
  `,
  Border: styled.div`
    border-bottom: 1px #48bbff solid;
  `,
};
export default Stl;
