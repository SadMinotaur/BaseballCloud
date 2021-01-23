import styled from "styled-components";

export const Stl = {
  Container: styled.div`
    width: 100%;
    height: 100%;
  `,
  Comparison: styled.div`
    width: 100%;
    height: 100%;
  `,
  Table: styled.div`
    margin: 15px 0 15px 0;
  `,
  ResponsiveRow: styled.div`
    min-height: 44px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  `,
  ItemTable: styled.div`
    margin: 20px 0 0 0;
  `,
  Image: styled.img`
    margin: 0 10px 0 0;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    object-fit: cover;
  `,
  Dropdown: styled.div`
    color: #6fc7f2;
    width: 228px;
    display: flex;
    justify-content: space-between;
    position: relative;
  `,
};
