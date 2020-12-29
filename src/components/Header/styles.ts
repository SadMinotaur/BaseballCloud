import styled from "styled-components";
import styledComponentsTS from "styled-components-ts";

export const HeaderStyle = styled.header`
  position: fixed;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: white;
`;

export const Icon = styled.img`
  margin-left: 8px;
`;

export const Tabs = styledComponentsTS<{
  state?: boolean;
}>(styled.div)`
  padding: 10px 8px 6px 8px;
  font-size: 16px;
  margin: 0 8px 0 8px;
  ${(p) => p.state && "border-bottom: 3px solid rgb(120, 139, 153);"}
`;

export const RightSide = styled.div`
  display: flex;
`;
