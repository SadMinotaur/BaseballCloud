import React, { useEffect, useState } from "react";
import { Stl } from "./styles";
import { SearchInput } from "../../../utils/common-components/search-input-right";
import { GraphqlProfile } from "../../../utils/types/profile";
import { DropdownBlue } from "../../../utils/common-components/dropdown-blue";
// import { ProfileNames } from "./../../../utils/types/profile";
import { Graphql } from "../graphql/query";
import CommonStyle from "../../../utils/common-styles/styles";
import PictureProf from "./../../../assets/profileIcon.png";
import API from "../../../utils/api";

export const Cards: React.FC<{ info: GraphqlProfile }> = ({ info }) => {
  const [picture, setPicture] = useState<string>();
  // const [playersNames, setPlayersNames] = useState<ProfileNames[]>();

  useEffect(() => {
    info?.avatar && API.getPicture(info.avatar).then((v) => setPicture(v));
    console.log();
  }, [info?.avatar]);

  const getNames = () =>
    API.graphqlPost(Graphql.getProfiles, {
      input: {
        player_name: "asd",
        position: "catcher",
      },
    });

  return (
    <Stl.Container>
      <CommonStyle.HeaderTab>Batting</CommonStyle.HeaderTab>
      <CommonStyle.HeaderTab active={true}>Comparison</CommonStyle.HeaderTab>
      <Stl.Table>
        <Stl.ResponsiveRow>
          <div>
            <Stl.Image
              src={picture ? `data:image/jpeg;base64,${picture}` : PictureProf}
              alt="avatar"
            />
            {info?.first_name} {info?.last_name}
          </div>
          <div>
            <SearchInput
              placeholder="Enter player name"
              width={150}
              widthFocused={170}
              onChange={getNames}
            />
          </div>
        </Stl.ResponsiveRow>
        <Stl.ResponsiveRow>
          <h4>Age: {info?.age}</h4>
          <h4>Age: 0</h4>
        </Stl.ResponsiveRow>
        <Stl.ResponsiveRow>
          <h4>
            Height: {info?.feet} ft {info?.inches && info?.inches + " in"}
          </h4>
          <h4>Height: 0 ft 0 in</h4>
        </Stl.ResponsiveRow>
        <Stl.ResponsiveRow>
          <h4>Weight: {info?.weight} lbs</h4>
          <h4>Weight: 0 lbs</h4>
        </Stl.ResponsiveRow>
      </Stl.Table>
      <div style={{ position: "relative" }}>
        <DropdownBlue
          options={[
            { label: "Top bating Values - Distance", value: "Distance" },
            {
              label: "Top bating Values - Launch angle",
              value: "Launch angle",
            },
            {
              label: "Top bating Values - Exit Velocity",
              value: "Exit Velocity",
            },
          ]}
          width={250}
        />
      </div>
      <Stl.ItemTable>
        <CommonStyle.Item>
          <CommonStyle.ItemText width={33}>Fastball</CommonStyle.ItemText>
          <CommonStyle.ItemText width={33}>-</CommonStyle.ItemText>
          <CommonStyle.ItemText width={33}>-</CommonStyle.ItemText>
        </CommonStyle.Item>
        <CommonStyle.Item>
          <CommonStyle.ItemText width={33}>Curveball</CommonStyle.ItemText>
          <CommonStyle.ItemText width={33}>-</CommonStyle.ItemText>
          <CommonStyle.ItemText width={33}>-</CommonStyle.ItemText>
        </CommonStyle.Item>
        <CommonStyle.Item>
          <CommonStyle.ItemText width={33}>Changeup</CommonStyle.ItemText>
          <CommonStyle.ItemText width={33}>-</CommonStyle.ItemText>
          <CommonStyle.ItemText width={33}>-</CommonStyle.ItemText>
        </CommonStyle.Item>
        <CommonStyle.Item>
          <CommonStyle.ItemText width={33}>Slider</CommonStyle.ItemText>
          <CommonStyle.ItemText width={33}>-</CommonStyle.ItemText>
          <CommonStyle.ItemText width={33}>-</CommonStyle.ItemText>
        </CommonStyle.Item>
      </Stl.ItemTable>
    </Stl.Container>
  );
};
