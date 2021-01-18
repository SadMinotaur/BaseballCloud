import styled from "styled-components";
import styledComponentsTS from "styled-components-ts";
import faLock from "./../../assets/lock-solid.svg";
import faUser from "./../../assets/user-solid.svg";
import faCheck from "./../../assets/check-solid.svg";

const CommonStyle = {
  ProfileContainer: styled.div`
    width: 100%;
    text-align: center;
    margin: 0 0 10px 0;
  `,
  ProfilePic: styled.img`
    height: 100px;
    width: 100px;
    border-radius: 50%;
    object-fit: cover;
  `,
  Toast: styled.div`
    position: absolute;
    top: 10px;
    right: 320px;
  `,
  InputFormInput: styledComponentsTS<{ imageLock: boolean }>(styled.input)`
    background-image: url(${(p) =>
      p.imageLock !== undefined ? (p.imageLock ? faLock : faUser) : faCheck});
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 13px;
    background-size: 15px;
    background-color: #eff1f3;
    padding: 6px 12px 10px 37px;
    width: 420px;
    height: 50px;
    border-radius: 4px;
    font-size: 16px;
    line-height: 1.13;
    font-weight: 400;
    color: #667784;
    border: 1px solid transparent;
    margin-bottom: 15px;
  `,
  ItemHead: styled.div`
    padding: 10px 0 10px 6px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    @media (max-width: 700px) {
      flex-direction: column;
      align-items: flex-start;
      height: fit-content;
    }
  `,
  ItemHeadText: styled.div<{ width?: number }>`
    width: ${(p) => p.width && p.width}%;
    font-size: 14px;
    font-weight: 300;
    color: #667784;
  `,
  Item: styled.div`
    padding: 10px 0 10px 6px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    background-color: #f7f8f9;
    margin: 0 0 5px 0;
    :hover {
      background-color: #ecf8ff;
    }
    @media (max-width: 700px) {
      flex-direction: column;
      align-items: flex-start;
      height: fit-content;
    }
  `,
  ItemText: styled.div<{ width?: number }>`
    width: ${(p) => p.width && p.width}%;
    font-size: 14px;
    line-height: 1.13;
    font-weight: 400;
    color: #414f5a;
  `,
  HeaderTab: styledComponentsTS<{ active: boolean }>(styled.button)`
    padding: 8px;
    margin: 8px;
    ${(p) =>
      p.active
        ? "color: #fff; background: #788b99;"
        : "color: #788b99; background: #fff;"};
    border: 2px solid #788b99;
    border-radius: 40px;
    font-size: 14px;
    line-height: 17px;
    font-weight: 700;
    &:hover {
      background: rgba(120,139,153,.4);
    }
  `,
  Pagination: styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 34px;
    margin: 16px 0;
    position: sticky;
    bottom: 0;
    user-select: none;
  `,
  PaginationButton: styledComponentsTS<{ state: string }>(styled.li)`
    ${(p) => {
      switch (p.state) {
        case "dis": {
          return "background-color: #fff;";
        }
        case "cur": {
          return "color: #fff;background-color: #48bbff;";
        }
        default:
          return "color: #414f5a; background-color: #f7f8f9;cursor: pointer;";
      }
    }}
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 100%;
    border-radius: 4px;
    margin-right: 4px;
  `,
};
export default CommonStyle;
