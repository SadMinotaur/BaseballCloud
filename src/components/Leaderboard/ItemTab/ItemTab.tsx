import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartSol } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartReg } from "@fortawesome/free-regular-svg-icons";
import Stl from "./styles";

export const ItemTab: React.FC<{
  arr: string[];
  onC: () => void;
  fav: boolean;
}> = ({ arr, onC, fav }) => (
  <Stl.Tab>
    <Stl.TabText width={6.5}>{arr[0]}</Stl.TabText>
    <Stl.TabText width={14}>{arr[1]}</Stl.TabText>
    <Stl.TabText width={5}>{arr[2]}</Stl.TabText>
    <Stl.TabText width={14}>{arr[3]}</Stl.TabText>
    <Stl.TabText width={14.5}>{arr[4]}</Stl.TabText>
    <Stl.TabText width={14.5}>{arr[5]}</Stl.TabText>
    <Stl.TabText width={14.5}>{arr[6] ? arr[6] : "-"}</Stl.TabText>
    <Stl.TabText width={10}>{arr[7]}</Stl.TabText>
    <Stl.TabText width={5}>
      <FontAwesomeIcon
        onClick={onC}
        style={{ color: "#4abdff" }}
        icon={fav ? heartSol : heartReg}
      />
    </Stl.TabText>
  </Stl.Tab>
);
