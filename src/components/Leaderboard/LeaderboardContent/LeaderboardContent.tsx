import React from "react";
import { Spinner } from "../../../utils/common-components/spinner";
import { ItemTab } from "../ItemTab";
import { BattingUser, PitchingUser } from "../../../utils/types/leaderboard";
import CommonStyle from "../../../utils/common-styles/styles";
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
    <CommonStyle.TabHead>
      <CommonStyle.TabHeadText width={6.5}>Rank</CommonStyle.TabHeadText>
      <CommonStyle.TabHeadText width={14}>
        {currentSwitch ? "Batter" : "Pitcher"} Name
      </CommonStyle.TabHeadText>
      <CommonStyle.TabHeadText width={5}>Age</CommonStyle.TabHeadText>
      <CommonStyle.TabHeadText width={14}>School</CommonStyle.TabHeadText>
      <CommonStyle.TabHeadText width={14.5}>Teams</CommonStyle.TabHeadText>
      <CommonStyle.TabHeadText width={14.5}>
        {currentSwitch ? "Exit Velocity" : "Pitch Type"}
      </CommonStyle.TabHeadText>
      <CommonStyle.TabHeadText width={14.5}>
        {currentSwitch ? "Launch Angle" : "Velocity"}
      </CommonStyle.TabHeadText>
      <CommonStyle.TabHeadText width={10}>
        {currentSwitch ? "Distance" : "Spin Rate"}
      </CommonStyle.TabHeadText>
      <CommonStyle.TabHeadText width={5}>Favorite</CommonStyle.TabHeadText>
    </CommonStyle.TabHead>
    {loadingContent ? (
      <Spinner loading={loadingContent} />
    ) : (
      <>
        {currentSwitch
          ? contentBatting.map((v: BattingUser, i: number) => (
              <ItemTab
                key={i}
                idProfile={v.batter_datraks_id}
                arr={[
                  (i + 1).toString(),
                  v.batter_name,
                  v.age.toString(),
                  v.school.name,
                  v.teams[0].name,
                  v.exit_velocity.toString(),
                  v.launch_angle ? v.launch_angle.toString() : "-",
                  v.distance.toString(),
                ]}
                onC={() => onClickFavB(v)}
                fav={v.favorite}
              />
            ))
          : contentPitching.map((v, i: number) => (
              <ItemTab
                key={i}
                idProfile={v.pitcher_datraks_id}
                arr={[
                  (i + 1).toString(),
                  v.pitcher_name,
                  v.age.toString(),
                  v.school.name,
                  v.teams[0].name,
                  v.pitch_type,
                  v.velocity.toString(),
                  v.spin_rate.toString(),
                ]}
                onC={() => onClickFavP(v)}
                fav={v.favorite}
              />
            ))}
      </>
    )}
  </Stl.Content>
);
