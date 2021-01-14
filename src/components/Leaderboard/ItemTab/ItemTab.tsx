import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartSol } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartReg } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import CommonStyle from "../../../utils/common-styles/styles";

export const ItemTab: React.FC<{
  arr: string[];
  idProfile: number;
  onC: () => void;
  fav: boolean;
}> = ({ arr, onC, fav, idProfile }) => (
  <CommonStyle.Tab>
    <CommonStyle.TabText width={6.5}>{arr[0]}</CommonStyle.TabText>
    <CommonStyle.TabText width={14}>
      <Link style={{ color: "#56636D" }} to={"/profile/" + idProfile}>
        {arr[1]}
      </Link>
    </CommonStyle.TabText>
    <CommonStyle.TabText width={5}>{arr[2]}</CommonStyle.TabText>
    <CommonStyle.TabText width={14}>{arr[3]}</CommonStyle.TabText>
    <CommonStyle.TabText width={14.5}>{arr[4]}</CommonStyle.TabText>
    <CommonStyle.TabText width={14.5}>{arr[5]}</CommonStyle.TabText>
    <CommonStyle.TabText width={14.5}>
      {arr[6] ? arr[6] : "-"}
    </CommonStyle.TabText>
    <CommonStyle.TabText width={10}>{arr[7]}</CommonStyle.TabText>
    <CommonStyle.TabText width={5}>
      <FontAwesomeIcon
        onClick={onC}
        style={{ color: "#4abdff" }}
        icon={fav ? heartSol : heartReg}
      />
    </CommonStyle.TabText>
  </CommonStyle.Tab>
);
