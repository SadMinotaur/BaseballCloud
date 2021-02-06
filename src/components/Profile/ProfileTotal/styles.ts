import styled from "styled-components";

export const Styles = {
  Container: styled.aside`
    min-width: 300px;
    max-width: 300px;
    overflow-y: auto;
    padding: 16px 16px 0 16px;
    box-sizing: border-box;
    position: relative;
  `,
  FloatingIcon: styled.img`
    position: absolute;
    left: 230px;
  `,
  ItemsRow: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0 16px 0;
  `,
  ItemText: styled.span`
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 1.6rem;
    line-height: 1.42857143;
    color: #333;
  `,
  ItemImage: styled.img`
    width: 24px;
    height: 24px;
    margin: 0 20px 0 0;
  `,
  NameContainer: styled.div`
    text-align: center;
    width: 100%;
  `,
  ProfileName: styled.div`
    font-size: 20px;
    line-height: 24px;
    color: #414f5a;
  `,
};
