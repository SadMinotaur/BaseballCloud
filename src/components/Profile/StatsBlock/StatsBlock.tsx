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
import { Queries } from "../graphql/query";
import {
  ProfileEvents,
  BattingSummary,
  Event,
  Summary,
} from "../../../utils/types/profile";
import API from "../../../utils/api";
import "./progress.css";

export const StatsBlock: React.FC<{ id?: string }> = ({ id }) => {
  const [events, setEvents] = useState<Event[]>();
  const [battingSummary, setBattingSummary] = useState<Summary>();

  useEffect(() => {
    API.graphqlPost(Queries.profileEvents, {
      input: { count: 10, offset: 0, profile_id: id },
    }).then((v: ProfileEvents) => setEvents(v.profile_events.events));
    API.graphqlPost(Queries.battingSummary, {
      id: id,
    }).then((v: BattingSummary) => {
      setBattingSummary(v.batting_summary);
    });
  }, [id]);

  return (
    <StBlock>
      <Stats>
        <Text>Top Batting Values</Text>
        <StatsContainer>
          <StatsItem>
            <StatsInfo>
              <p>Exit Velocity</p>
              <p>
                {battingSummary?.top_values.length !== 0
                  ? battingSummary?.top_values[0].exit_velocity
                  : "N/A"}
              </p>
            </StatsInfo>
            <Progress
              style={{ background: "#f5d142" }}
              bar
              barClassName="progressBar"
              value={1}
            />
          </StatsItem>
          <StatsItem>
            <StatsInfo>
              <p>Carry Distance</p>
              <p>
                {battingSummary?.top_values.length !== 0
                  ? battingSummary?.top_values[0].distance
                  : "N/A"}
              </p>
            </StatsInfo>
            <Progress
              style={{ background: "#f5d142" }}
              bar
              barClassName="progressBar"
              value={1}
            />
          </StatsItem>
          <StatsItem>
            <StatsInfo>
              <p>Launch Angle</p>
              <p>
                {battingSummary?.top_values.length !== 0
                  ? battingSummary?.top_values[0].launch_angle
                  : "N/A"}
              </p>
            </StatsInfo>
            <Progress
              style={{ background: "#f5d142" }}
              bar
              barClassName="progressBar"
              value={1}
            />
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
};
