import styled from "styled-components";

const Stl = {
  Container: styled.div`
    height: 100%;
    overflow-y: auto;
  `,
  Header: styled.div`
    align-items: center;
    padding: 5px 16px 16px 16px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 700px) {
      flex-direction: column;
    }
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
  Content: styled.div`
    width: 100%;
    height: 100%;
    padding: 16px;
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
