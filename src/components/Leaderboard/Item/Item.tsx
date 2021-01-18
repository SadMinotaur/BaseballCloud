import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartSol } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartReg } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import CommonStyle from "../../../utils/common-styles/styles";

export const Item: React.FC<{
  arr: string[];
  idProfile: number;
  onC: () => void;
  fav: boolean;
}> = ({ arr, onC, fav, idProfile }) => (
  <CommonStyle.Item>
    <CommonStyle.ItemText width={6.5}>{arr[0]}</CommonStyle.ItemText>
    <CommonStyle.ItemText width={14}>
      <Link style={{ color: "#56636D" }} to={"/profile/" + idProfile}>
        {arr[1]}
      </Link>
    </CommonStyle.ItemText>
    <CommonStyle.ItemText width={5}>{arr[2]}</CommonStyle.ItemText>
    <CommonStyle.ItemText width={14}>{arr[3]}</CommonStyle.ItemText>
    <CommonStyle.ItemText width={14.5}>{arr[4]}</CommonStyle.ItemText>
    <CommonStyle.ItemText width={14.5}>{arr[5]}</CommonStyle.ItemText>
    <CommonStyle.ItemText width={14.5}>
      {arr[6] ? arr[6] : "-"}
    </CommonStyle.ItemText>
    <CommonStyle.ItemText width={10}>{arr[7]}</CommonStyle.ItemText>
    <CommonStyle.ItemText width={5}>
      <FontAwesomeIcon
        onClick={onC}
        style={{ color: "#4abdff" }}
        icon={fav ? heartSol : heartReg}
      />
    </CommonStyle.ItemText>
  </CommonStyle.Item>
);
