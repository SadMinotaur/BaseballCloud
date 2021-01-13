import styled from "styled-components";

const Stl = {
  Tab: styled.div`
    padding: 5px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    background-color: #f7f8f9;
    margin: 0 0 5px 0;
  `,
  TabText: styled.div<{ width?: number }>`
    width: ${(p) => p.width && p.width}%;
    font-size: 14px;
    line-height: 1.13;
    font-weight: 400;
    color: #414f5a;
    padding: 10px 0 10px 0;
  `,
};
export default Stl;
