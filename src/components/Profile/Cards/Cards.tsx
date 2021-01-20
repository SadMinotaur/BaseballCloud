import React from "react";
import { Stl } from "./styles";
import CommonStyle from "../../../utils/common-styles/styles";
import { SearchInput } from "../../../utils/common-components/search-input";
import { GraphqlProfile } from "../../../utils/types/profile";
import { DropdownBlue } from "../../../utils/common-components/dropdown-blue";

export const Cards: React.FC<{ info?: GraphqlProfile }> = ({ info }) => {
  return (
    <Stl.Container>
      <CommonStyle.HeaderTab>Batting</CommonStyle.HeaderTab>
      <CommonStyle.HeaderTab active={true}>Comparison</CommonStyle.HeaderTab>
      <Stl.Table>
        <Stl.ResponsiveRow>
          <div></div>
          <div>
            <SearchInput placeholder="" width={80} />
          </div>
        </Stl.ResponsiveRow>
        <Stl.ResponsiveRow>
          <h4>Age: {info?.age}</h4>
          <h4>Age: 0</h4>
        </Stl.ResponsiveRow>
        <Stl.ResponsiveRow>
          <h4>
            Height: {info?.feet} ft {info?.inches} in
          </h4>
          <h4>Height: 0 ft 0 in</h4>
        </Stl.ResponsiveRow>
        <Stl.ResponsiveRow>
          <h4>Weight: {info?.weight} lbs</h4>
          <h4>Weight: 0 lbs</h4>
        </Stl.ResponsiveRow>
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
        <CommonStyle.Item>
          <CommonStyle.ItemText>Fastball</CommonStyle.ItemText>
        </CommonStyle.Item>
        <CommonStyle.Item>
          <CommonStyle.ItemText>Curveball</CommonStyle.ItemText>
        </CommonStyle.Item>
        <CommonStyle.Item>
          <CommonStyle.ItemText>Changeup</CommonStyle.ItemText>
        </CommonStyle.Item>
        <CommonStyle.Item>
          <CommonStyle.ItemText>Slider</CommonStyle.ItemText>
        </CommonStyle.Item>
      </Stl.Table>
    </Stl.Container>
  );
};
