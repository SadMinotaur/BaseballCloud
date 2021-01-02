import React from "react";
import { Stats, StBlock, Text } from "./styles";

export const StatsBlock: React.FC = () => (
  <StBlock>
    <Stats>
      <Text>Top Batting Values</Text>
    </Stats>
    <Stats>
      <Text>Recent Session Reports</Text>
      <p>No data currently linked to this profile</p>
    </Stats>
    <Stats></Stats>
  </StBlock>
);
