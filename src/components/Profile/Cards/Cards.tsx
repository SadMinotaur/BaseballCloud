import React, { useEffect, useState } from "react";
import { Stl } from "./styles";
import { SearchInput } from "../../../utils/common-components/search-input-right";
import {
  BattingSummary,
  GraphqlProfile,
  TopBatting,
} from "../../../utils/types/profile";
import { DropdownBlue } from "../../../utils/common-components/dropdown-blue";
import { ProfileNames } from "./../../../utils/types/profile";
import { Graphql } from "../graphql/query";
import BeatLoader from "react-spinners/BeatLoader";
import CommonStyle from "../../../utils/common-styles/styles";
import PictureProf from "./../../../assets/profileIcon.png";
import API from "../../../utils/api";

export const Cards: React.FC<{
  info: GraphqlProfile;
  topBatting: TopBatting[];
}> = ({ info, topBatting }) => {
  const [pictureMain, setMainPicture] = useState<string>();
  const [dropdownValue, setDropdownValue] = useState<string>("Distance");
  const [searchValue, setSearchValue] = useState<string>("");

  const [playersNames, setPlayersNames] = useState<ProfileNames[]>([]);
  const [loadingNames, setLoadingNames] = useState<boolean>(false);

  const [comparePicture, setComparePicture] = useState<string>();
  const [choosedProfile, setChoosedProfile] = useState<ProfileNames>();
  const [choosedBatting, setChoosedBatting] = useState<TopBatting[]>([]);

  function getNames(input: string): void {
    setSearchValue(input);
    setLoadingNames(true);
    API.graphqlPost(Graphql.getProfiles, {
      input: {
        player_name: input,
        position: info.position,
      },
    }).then((v: { profile_names: { profile_names: ProfileNames[] } }) => {
      setPlayersNames(v.profile_names.profile_names);
      setLoadingNames(false);
    });
  }

  function chooseUser(id: string): void {
    API.graphqlPost(Graphql.getUserInfo, {
      id: id,
    }).then((v: { profile: GraphqlProfile }) => {
      setChoosedProfile(v.profile);
      setSearchValue(`${v.profile.first_name} ${v.profile.last_name}`);
      API.graphqlPost(Graphql.battingSummary, {
        id: id,
      }).then((v: BattingSummary) =>
        setChoosedBatting(v.batting_summary.top_values)
      );
      v.profile.avatar
        ? API.getPicture(v.profile.avatar).then((v) => setComparePicture(v))
        : setComparePicture(undefined);
    });
  }

  useEffect(() => {
    info?.avatar && API.getPicture(info.avatar).then((v) => setMainPicture(v));
  }, [info.avatar]);

  function showVal(v: TopBatting | undefined): string {
    if (v) {
      switch (dropdownValue) {
        case "Distance":
          return v.distance.toString();
        case "Launch angle":
          return v.launch_angle.toString();
        case "Exit Velocity":
          return v.exit_velocity.toString();
        default:
          break;
      }
    }
    return "-";
  }

  return (
    <Stl.Container>
      <CommonStyle.HeaderTab>Batting</CommonStyle.HeaderTab>
      <CommonStyle.HeaderTab active={true}>Comparison</CommonStyle.HeaderTab>
      <Stl.Table>
        <Stl.ResponsiveRow>
          <div>
            <Stl.Image
              src={
                pictureMain
                  ? `data:image/jpeg;base64,${pictureMain}`
                  : PictureProf
              }
              alt="avatar"
            />
            {info?.first_name} {info?.last_name}
          </div>
          <div style={{ position: "relative" }}>
            <Stl.Spinner>
              <BeatLoader color={"#48bbff"} loading={loadingNames} size={10} />
            </Stl.Spinner>
            <Stl.Image
              src={
                comparePicture
                  ? `data:image/jpeg;base64,${comparePicture}`
                  : PictureProf
              }
              alt="avatar"
            />
            <SearchInput
              value={searchValue}
              placeholder="Enter player name"
              width={135}
              widthFocused={170}
              onChange={getNames}
              setNames={setPlayersNames}
            />
            {playersNames.length !== 0 && (
              <Stl.InputMenu>
                {playersNames.map((prof) => (
                  <Stl.MenuItem
                    key={prof.id + prof.age}
                    onClick={() => chooseUser(prof.id)}
                  >
                    {prof.first_name} {prof.last_name}
                  </Stl.MenuItem>
                ))}
              </Stl.InputMenu>
            )}
          </div>
        </Stl.ResponsiveRow>
        <Stl.ResponsiveRow>
          <h4>Age: {info?.age}</h4>
          <h4>Age: {choosedProfile?.age}</h4>
        </Stl.ResponsiveRow>
        <Stl.ResponsiveRow>
          <h4>
            Height: {info?.feet} ft {info?.inches && info?.inches + " in"}
          </h4>
          <h4>
            Height: {choosedProfile?.feet} ft
            {choosedProfile?.inches && info?.inches + " in"}
          </h4>
        </Stl.ResponsiveRow>
        <Stl.ResponsiveRow>
          <h4>Weight: {info?.weight} lbs</h4>
          <h4>Weight: {choosedProfile?.weight} lbs</h4>
        </Stl.ResponsiveRow>
      </Stl.Table>
      <Stl.Dropdown>
        Top bating Values -
        <DropdownBlue
          input={{ value: dropdownValue, onChange: setDropdownValue }}
          options={[
            { label: "Distance", value: "Distance" },
            {
              label: "Launch angle",
              value: "Launch angle",
            },
            {
              label: "Exit Velocity",
              value: "Exit Velocity",
            },
          ]}
          width={110}
        />
      </Stl.Dropdown>
      <Stl.ItemTable>
        <CommonStyle.Item>
          <CommonStyle.ItemText width={33}>Fastball</CommonStyle.ItemText>
          <CommonStyle.ItemText width={33}>
            {showVal(topBatting.find((v) => v.pitch_type === "Fastball"))}
          </CommonStyle.ItemText>
          <CommonStyle.ItemText width={33}>
            {showVal(choosedBatting.find((v) => v.pitch_type === "Fastball"))}
          </CommonStyle.ItemText>
        </CommonStyle.Item>
        <CommonStyle.Item>
          <CommonStyle.ItemText width={33}>Curveball</CommonStyle.ItemText>
          <CommonStyle.ItemText width={33}>
            {showVal(topBatting.find((v) => v.pitch_type === "Curveball"))}
          </CommonStyle.ItemText>
          <CommonStyle.ItemText width={33}>
            {showVal(choosedBatting.find((v) => v.pitch_type === "Curveball"))}
          </CommonStyle.ItemText>
        </CommonStyle.Item>
        <CommonStyle.Item>
          <CommonStyle.ItemText width={33}>Changeup</CommonStyle.ItemText>
          <CommonStyle.ItemText width={33}>
            {showVal(topBatting.find((v) => v.pitch_type === "Changeup"))}
          </CommonStyle.ItemText>
          <CommonStyle.ItemText width={33}>
            {showVal(choosedBatting.find((v) => v.pitch_type === "Changeup"))}
          </CommonStyle.ItemText>
        </CommonStyle.Item>
        <CommonStyle.Item>
          <CommonStyle.ItemText width={33}>Slider</CommonStyle.ItemText>
          <CommonStyle.ItemText width={33}>
            {showVal(topBatting.find((v) => v.pitch_type === "Slider"))}
          </CommonStyle.ItemText>
          <CommonStyle.ItemText width={33}>
            {showVal(choosedBatting.find((v) => v.pitch_type === "Slider"))}
          </CommonStyle.ItemText>
        </CommonStyle.Item>
      </Stl.ItemTable>
    </Stl.Container>
  );
};
