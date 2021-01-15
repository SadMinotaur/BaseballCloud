import React, { Dispatch, SetStateAction } from "react";
import { Spinner } from "../../../utils/common-components/spinner";
import { Queries } from "../graphql/query";
import { ItemTab } from "../ItemTab";
import CommonStyle from "../../../utils/common-styles/styles";
import API from "../../../utils/api";
import Stl from "./styles";
import { ToastContainer } from "react-toastr";
import {
  BattingUser,
  PitchingUser,
} from "../../../utils/leaderboard-types/types";
import {
  ShowSuccessToast,
  ShowErrorToast,
} from "./../../../utils/common-components/toast/toast";

export const LeaderboardContent: React.FC<{
  currentSwitch: boolean;
  loadingContent: boolean;
  contentBatting: BattingUser[];
  contentPitching: PitchingUser[];
  setBattingContent: Dispatch<SetStateAction<BattingUser[]>>;
  setPitchingContent: Dispatch<SetStateAction<PitchingUser[]>>;
  container: ToastContainer | null;
}> = ({
  currentSwitch,
  container,
  contentPitching,
  contentBatting,
  loadingContent,
  setBattingContent,
  setPitchingContent,
}) => {
  function onClickB(v: BattingUser) {
    API.graphqlPost(Queries.favorite, {
      form: {
        favorite: !v.favorite,
        profile_id: v.batter_datraks_id,
      },
    })
      .then(() => {
        ShowSuccessToast(v.favorite, container as ToastContainer);
        setBattingContent((ps) =>
          ps.map((item) =>
            item.batter_datraks_id !== v.batter_datraks_id
              ? item
              : { ...v, favorite: !v.favorite }
          )
        );
      })
      .catch(() => ShowErrorToast(container as ToastContainer));
  }

  function onClickP(v: PitchingUser) {
    API.graphqlPost(Queries.favorite, {
      form: {
        favorite: !v.favorite,
        profile_id: v.pitcher_datraks_id,
      },
    })
      .then(() => {
        ShowSuccessToast(v.favorite, container as ToastContainer);
        setPitchingContent((ps) =>
          ps.map((item) =>
            item.pitcher_datraks_id !== v.pitcher_datraks_id
              ? item
              : { ...v, favorite: !v.favorite }
          )
        );
      })
      .catch(() => ShowErrorToast(container as ToastContainer));
  }

  return (
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
                  onC={() => onClickB(v)}
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
                  onC={() => onClickP(v)}
                  fav={v.favorite}
                />
              ))}
        </>
      )}
    </Stl.Content>
  );
};
