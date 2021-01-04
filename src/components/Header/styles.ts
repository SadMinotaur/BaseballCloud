import styled from "styled-components";
import styledComponentsTS from "styled-components-ts";

export const HeaderStyle = styled.header`
  grid-area: hd;
  grid-column-end: span 2;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const Icon = styled.img`
  margin: 5px 0 0 8px;
`;

export const Tabs = styledComponentsTS<{
  state?: boolean;
}>(styled.div)`
  padding: 0 8px ${(p) => (p.state ? "12" : "15")}px 8px;
  font-size: 16px;
  margin: 7px 8px 0 8px;
  ${(p) => p.state && "border-bottom: 3px solid rgb(120, 139, 153);"}
  ::hover {
    ${(p) => !p.state && "border-bottom: 3px solid #788b99;"}
`;

export const RightSide = styled.div`
  display: flex;
`;

export const ProfileIcon = styled.img`
  margin: 5px 0 0 0;
  height: 32px;
  width: 32px;
`;
