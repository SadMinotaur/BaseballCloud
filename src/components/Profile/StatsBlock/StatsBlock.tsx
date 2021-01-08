import React from "react";
import {
  Stats,
  StatsContainer,
  StatsInfo,
  StatsItem,
  StBlock,
  Text,
} from "./styles";
import { Progress } from "reactstrap";
import "./progress.css";

export const StatsBlock: React.FC = () => (
  <StBlock>
    <Stats>
      <Text>Top Batting Values</Text>
      <StatsContainer>
        <StatsItem>
          <StatsInfo>
            <p>Exit Velocity</p>
            <p>N/A</p>
          </StatsInfo>
          <Progress bar barClassName="progressBar" value={1} />
        </StatsItem>
        <StatsItem>
          <StatsInfo>
            <p>Exit Velocity</p>
            <p>N/A</p>
          </StatsInfo>
          <Progress bar barClassName="progressBar" value={1} />
        </StatsItem>
        <StatsItem>
          <StatsInfo>
            <p>Exit Velocity</p>
            <p>N/A</p>
          </StatsInfo>
          <Progress bar barClassName="progressBar" value={1} />
        </StatsItem>
      </StatsContainer>
    </Stats>
    <Stats>
      <Text>Recent Session Reports</Text>
      <p>No data currently linked to this profile</p>
    </Stats>
    <Stats></Stats>
  </StBlock>
);
