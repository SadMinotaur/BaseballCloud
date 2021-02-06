import React, { useEffect, useState } from "react";
import {
  Stats,
  StatsContainer,
  StatsInfo,
  StatsItem,
  StBlock,
  Text,
} from "./styles";
import { Progress } from "reactstrap";
import { Graphql } from "../graphql/query";
import {
  // ProfileEvents,
  BattingSummary,
  // Event,
  Summary,
  GraphqlProfile,
  TopBattingBlock,
} from "../../../utils/types/profile";
import { Cards } from "./../Cards";
import API from "../../../utils/api";
import "./progress.css";

export const StatsBlock: React.FC<{ info: GraphqlProfile }> = ({ info }) => {
  // const [events, setEvents] = useState<Event[]>();
  const [battingSummary, setBattingSummary] = useState<Summary>();
  const [topBattingBlock, setTopBattingBlock] = useState<TopBattingBlock>();

  useEffect(() => {
    // API.graphqlPost(Graphql.profileEvents, {
    //   input: { count: 10, offset: 0, profile_id: info?.id },
    // }).then((v: ProfileEvents) => setEvents(v && v.profile_events.events));
    API.graphqlPost(Graphql.battingSummary, {
      id: info.id,
    }).then((v: BattingSummary) => {
      let topBSEV: number = 0;
      let topBSCD: number = 0;
      let topBSLA: number = 0;
      v.batting_summary.top_values.forEach((v) => {
        if (v.exit_velocity > topBSEV) topBSEV = v.exit_velocity;
      });
      v.batting_summary.top_values.forEach((v) => {
        if (v.distance > topBSCD) topBSCD = v.distance;
      });
      v.batting_summary.top_values.forEach((v) => {
        if (v.launch_angle > topBSLA) topBSLA = v.launch_angle;
      });
      setBattingSummary(v?.batting_summary);
      topBSEV !== 0 &&
        setTopBattingBlock({
          exit_velocity: topBSEV,
          launch_angle: topBSLA,
          distance: topBSCD,
        });
    });
  }, [info.id]);

  return (
    <StBlock>
      <Stats>
        <Text>Top Batting Values</Text>
        <StatsContainer>
          <StatsItem>
            <StatsInfo>
              <p>Exit Velocity</p>
              <p>{topBattingBlock ? topBattingBlock.exit_velocity : "N/A"}</p>
            </StatsInfo>
            <Progress
              style={{ background: "#f5d142" }}
              bar
              barClassName="progressBar"
              value={
                topBattingBlock
                  ? (topBattingBlock.exit_velocity / 176) * 100
                  : 1
              }
            />
          </StatsItem>
          <StatsItem>
            <StatsInfo>
              <p>Carry Distance</p>
              <p>{topBattingBlock ? topBattingBlock.distance : "N/A"}</p>
            </StatsInfo>
            <Progress
              style={{ background: "#f5d142" }}
              bar
              barClassName="progressBar"
              value={
                topBattingBlock ? (topBattingBlock.distance / 536.4) * 100 : 1
              }
            />
          </StatsItem>
          <StatsItem>
            <StatsInfo>
              <p>Launch Angle</p>
              <p>{topBattingBlock ? topBattingBlock.launch_angle : "N/A"}</p>
            </StatsInfo>
            <Progress
              style={{ background: "#f5d142" }}
              bar
              barClassName="progressBar"
              value={
                topBattingBlock
                  ? (topBattingBlock.launch_angle / 54.6) * 100
                  : 1
              }
            />
          </StatsItem>
        </StatsContainer>
      </Stats>
      <Stats>
        <Text>Recent Session Reports</Text>
        <p>No data currently linked to this profile</p>
      </Stats>
      <Stats height={"500px"}>
        <Cards
          info={info}
          topBatting={
            battingSummary?.top_values ? battingSummary?.top_values : []
          }
        />
      </Stats>
    </StBlock>
  );
};
