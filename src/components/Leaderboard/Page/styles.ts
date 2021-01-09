import styled from "styled-components";
import styledComponentsTS from "styled-components-ts";

const Stl = {
  Container: styled.div`
    height: 100%;
  `,
  Toast: styled.div`
    position: absolute;
    top: 10px;
    right: 320px;
  `,
  Header: styled.div`
    align-items: center;
    padding: 5px 16px 16px 16px;
    display: flex;
    justify-content: space-between;
  `,
  InputGroup: styled.div`
    display: flex;
  `,
  HeaderTabs: styled.div`
    align-items: center;
    margin: 0 50px 10px 0;
    display: flex;
    justify-content: space-between;
  `,
  TabsContainer: styled.div`
    display: flex;
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
  Content: styled.div`
    width: 100%;
    height: 100%;
    padding: 16px;
  `,
  TabHead: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  `,
  TabHeadText: styledComponentsTS<{ width?: number }>(styled.div)`
    width: ${(p) => p.width && p.width}%;
    font-size: 14px;
    font-weight: 300;
    color: #667784;
  `,
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
  TabText: styledComponentsTS<{ width?: number }>(styled.div)`
    width: ${(p) => p.width && p.width}%;
    font-size: 14px;
    line-height: 1.13;
    font-weight: 400;
    color: #414f5a;
    padding: 10px 0 10px 0;
 `,
};
export default Stl;
