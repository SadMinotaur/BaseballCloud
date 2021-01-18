import React from "react";
import { Spinner } from "../../../utils/common-components/spinner";
import { Item } from "../Item";
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
              <Item
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
