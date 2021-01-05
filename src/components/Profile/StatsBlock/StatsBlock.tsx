import React from "react";
import { Stats, StBlock, Text } from "./styles";
import Progress from "./../../../assets/profile/progressLine.svg";

export const StatsBlock: React.FC = () => (
  <StBlock>
    <Stats>
      <Text>Top Batting Values</Text>
      <p>Exit Velocity</p>
      <p>Carry Distance</p>
      <p>Launch Angle</p>
      {/* TODO: Figure it out */}
      {/* <img src={Progress} alt="" /> */}
    </Stats>
    <Stats>
      <Text>Recent Session Reports</Text>
      <p>No data currently linked to this profile</p>
    </Stats>
    <Stats></Stats>
  </StBlock>
);
