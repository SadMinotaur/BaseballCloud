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
  ProfileEvents,
  BattingSummary,
  Event,
  Summary,
  GraphqlProfile,
} from "../../../utils/types/profile";
import { Cards } from "./../Cards";
import API from "../../../utils/api";
import "./progress.css";

export const StatsBlock: React.FC<{ info?: GraphqlProfile }> = ({ info }) => {
  const [events, setEvents] = useState<Event[]>();
  const [battingSummary, setBattingSummary] = useState<Summary>();

  useEffect(() => {
    API.graphqlPost(Graphql.profileEvents, {
      input: { count: 10, offset: 0, profile_id: info?.id },
    }).then((v: ProfileEvents) => setEvents(v && v.profile_events.events));
    API.graphqlPost(Graphql.battingSummary, {
      id: info?.id,
    }).then((v: BattingSummary) => {
      setBattingSummary(v && v.batting_summary);
    });
  }, [info?.id]);

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
      <Stats height={"600px"}>
        <Cards info={info} />
      </Stats>
    </StBlock>
  );
};
