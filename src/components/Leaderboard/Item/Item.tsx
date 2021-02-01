import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartSol } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartReg } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { LeaderboardItem } from "../../../utils/types/leaderboard";
import CommonStyle from "../../../common-styles/styles";

export const Item: React.FC<{
  itemInfo: LeaderboardItem;
  onC: () => void;
  currentSwitch: boolean;
}> = ({ itemInfo, onC, currentSwitch }) => (
  <CommonStyle.Item>
    <CommonStyle.ItemColumn hidden={true}>
      <CommonStyle.ItemText>Rank</CommonStyle.ItemText>
      <CommonStyle.ItemText>
        {currentSwitch ? "Batter" : "Pitcher"} Name
      </CommonStyle.ItemText>
      <CommonStyle.ItemText>Age</CommonStyle.ItemText>
      <CommonStyle.ItemText>School</CommonStyle.ItemText>
      <CommonStyle.ItemText>Teams</CommonStyle.ItemText>
      <CommonStyle.ItemText>
        {currentSwitch ? "Exit Velocity" : "Pitch Type"}
      </CommonStyle.ItemText>
      <CommonStyle.ItemText>
        {currentSwitch ? "Launch Angle" : "Velocity"}
      </CommonStyle.ItemText>
      <CommonStyle.ItemText>
        {currentSwitch ? "Distance" : "Spin Rate"}
      </CommonStyle.ItemText>
      <CommonStyle.ItemText>Favorite</CommonStyle.ItemText>
    </CommonStyle.ItemColumn>
    <CommonStyle.ItemColumn>
      <CommonStyle.ItemText width={6.5}>{itemInfo.number}</CommonStyle.ItemText>
      <CommonStyle.ItemText width={14}>
        <Link
          style={{ color: "#56636D" }}
          to={"/profile/" + itemInfo.idProfile}
        >
          {itemInfo.name}
        </Link>
      </CommonStyle.ItemText>
      <CommonStyle.ItemText width={5}>{itemInfo.age}</CommonStyle.ItemText>
      <CommonStyle.ItemText width={14}>{itemInfo.school}</CommonStyle.ItemText>
      <CommonStyle.ItemText width={14.5}>{itemInfo.teams}</CommonStyle.ItemText>
      <CommonStyle.ItemText width={14.5}>
        {itemInfo.statsFirst}
      </CommonStyle.ItemText>
      <CommonStyle.ItemText width={14.5}>
        {itemInfo.statsSecond ? itemInfo.statsSecond : "-"}
      </CommonStyle.ItemText>
      <CommonStyle.ItemText width={10}>
        {itemInfo.statsThird}
      </CommonStyle.ItemText>
      <CommonStyle.ItemText width={5}>
        <FontAwesomeIcon
          onClick={onC}
          style={{ color: "#4abdff" }}
          icon={itemInfo.favorite ? heartSol : heartReg}
        />
      </CommonStyle.ItemText>
    </CommonStyle.ItemColumn>
  </CommonStyle.Item>
);
