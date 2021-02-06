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
  display: flex;
  align-items: center;
  margin: 0 10px 0 0;
  width: 100%;
  height: 100%;
  font-size: 16px;
  ${(p) => p.state && "border-bottom: 3px solid rgb(120, 139, 153);"}
  &:hover {
    ${(p) => !p.state && "border-bottom: 3px solid lightgrey;"}
`;

export const RightSide = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px 0 0;
`;

export const ProfileIcon = styled.img`
  margin: 0 10px 0 0;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const DropdownText = styled.div`
  padding: 5px 0 5px 10px;
  :hover {
    background-color: #ecf8ff;
  }
`;

export const DropStyle = {
  background: "#fff",
  color: "#788b99",
  border: 0,
  width: 100,
};
