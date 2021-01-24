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
  Text: styled.div`
    line-height: 1.42857143;
    color: #333;
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
  Spinner: styled.div`
    position: absolute;
    top: 10px;
    left: -60px;
  `,
  Dropdown: styled.div`
    color: #6fc7f2;
    width: 228px;
    display: flex;
    justify-content: space-between;
    position: relative;
  `,
  InputMenu: styled.div`
    z-index: 100;
    color: #788b99;
    position: absolute;
    background-color: white;
    font-size: 16px;
    line-height: 38px;
    font-weight: 400;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.15);
    border: solid 1px #ebebeb;
    top: 30px;
    left: 40px;
    border-radius: 5px;
    padding: 5px 0 5px 0;
    ::before {
      content: "";
      width: 0;
      height: 0;
      position: absolute;
      top: -8px;
      left: 25px;
      border-style: solid;
      border-width: 0 8px 8px 8px;
      border-color: transparent transparent #b8b8b8 transparent;
    }
  `,
  MenuItem: styled.div`
    line-height: 30px;
    padding: 0 10px 0 10px;
    :hover {
      background: #ecf8ff;
    }
  `,
};
