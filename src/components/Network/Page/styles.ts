import styled from "styled-components";

const Stl = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    padding: 15px;
    overflow-y: auto;
  `,
  HeaderInputsContainer: styled.div`
    display: flex;
    height: 70px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 700px) {
      flex-direction: column;
    }
  `,
  HeaderInputs: styled.div`
    display: flex;
    padding: 0 0 0 0px;
  `,
  ShowItems: styled.div`
    width: 100px;
    display: flex;
    justify-content: space-around;
    color: #6fc7f2;
  `,
};
export default Stl;
