import React from "react";
import { Spinner } from "../../../common-components/spinner";
import { Item } from "../Item";
import { BattingUser, PitchingUser } from "../../../utils/types/leaderboard";
import CommonStyle from "../../../common-styles/styles";
import Stl from "./styles";

export const LeaderboardContent: React.FC<{
  currentSwitch: boolean;
  loadingContent: boolean;
  contentBatting: BattingUser[];
  contentPitching: PitchingUser[];
  onClickFavP: (v: PitchingUser) => void;
  onClickFavB: (v: BattingUser) => void;
}> = ({
  currentSwitch,
  contentPitching,
  contentBatting,
  loadingContent,
  onClickFavB,
  onClickFavP,
}) => (
  <Stl.Content>
    <CommonStyle.ItemHead>
      <CommonStyle.ItemHeadText width={6.5}>Rank</CommonStyle.ItemHeadText>
      <CommonStyle.ItemHeadText width={14}>
        {currentSwitch ? "Batter" : "Pitcher"} Name
      </CommonStyle.ItemHeadText>
      <CommonStyle.ItemHeadText width={5}>Age</CommonStyle.ItemHeadText>
      <CommonStyle.ItemHeadText width={14}>School</CommonStyle.ItemHeadText>
      <CommonStyle.ItemHeadText width={14.5}>Teams</CommonStyle.ItemHeadText>
      <CommonStyle.ItemHeadText width={14.5}>
        {currentSwitch ? "Exit Velocity" : "Pitch Type"}
      </CommonStyle.ItemHeadText>
      <CommonStyle.ItemHeadText width={14.5}>
        {currentSwitch ? "Launch Angle" : "Velocity"}
      </CommonStyle.ItemHeadText>
      <CommonStyle.ItemHeadText width={10}>
        {currentSwitch ? "Distance" : "Spin Rate"}
      </CommonStyle.ItemHeadText>
      <CommonStyle.ItemHeadText width={5}>Favorite</CommonStyle.ItemHeadText>
    </CommonStyle.ItemHead>
    {loadingContent ? (
      <Spinner loading={loadingContent} />
    ) : (
      <>
        {currentSwitch
          ? contentBatting.map((v: BattingUser, i: number) => (
              <Item
                key={i}
                itemInfo={{
                  number: (i + 1).toString(),
                  name: v.batter_name,
                  age: v.age.toString(),
                  school: v.school.name,
                  teams: v.teams[0].name,
                  statsFirst: v.exit_velocity.toString(),
                  statsSecond: v.launch_angle ? v.launch_angle.toString() : "-",
                  statsThird: v.distance.toString(),
                  favorite: v.favorite,
                  idProfile: v.batter_datraks_id,
                }}
                currentSwitch={currentSwitch}
                onC={() => onClickFavB(v)}
              />
            ))
          : contentPitching.map((v, i: number) => (
              <Item
                key={i}
                itemInfo={{
                  number: (i + 1).toString(),
                  name: v.pitcher_name,
                  age: v.age.toString(),
                  school: v.school.name,
                  teams: v.teams[0].name,
                  statsFirst: v.pitch_type,
                  statsSecond: v.velocity ? v.velocity.toString() : "-",
                  statsThird: v.spin_rate.toString(),
                  favorite: v.favorite,
                  idProfile: v.pitcher_datraks_id,
                }}
                currentSwitch={currentSwitch}
                onC={() => onClickFavP(v)}
              />
            ))}
      </>
    )}
  </Stl.Content>
);
