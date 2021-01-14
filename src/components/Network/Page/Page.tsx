import React from "react";
import { DropdownBlue } from "../../../utils/common-components/dropdown-blue";
import { InputBlue } from "../../../utils/common-components/input-blue";
import CommonStyle from "../../../utils/common-styles/styles";
import Stl from "./styles";

export const NetworkPage: React.FC = () => {
  return (
    <Stl.Container>
      {/* <Stl.HeaderInputsContainer>
        <h3>Network</h3>
        <Stl.HeaderInputs>
          <InputBlue
            name="School"
            width={55}
            widthFocus={180}
            onChange={() => {}}
          />
          <InputBlue
            name="Team"
            width={60}
            widthFocus={180}
            onChange={() => {}}
          />
          <DropdownBlue
            placeholder="Position"
            width={100}
            options={[
              "All",
              "Last Week",
              "First Base",
              "Second Base",
              "Sportstop",
              "Third Base",
              "Outfield",
              "Pitcher",
            ]}
          />
          <InputBlue
            name="Age"
            width={35}
            widthFocus={80}
            onChange={() => {}}
          />
          <DropdownBlue
            width={80}
            placeholder="All"
            options={["All", "Favorite"]}
          />
          <DropdownBlue
            width={80}
            placeholder="Show:10"
            options={["10", "15", "20"]}
          />
        </Stl.HeaderInputs>
      </Stl.HeaderInputsContainer>
      <Stl.HeaderInputsContainer>
        <p>Available Players (.)</p>
        <InputBlue
          name="Player Name"
          width={60}
          widthFocus={180}
          onChange={() => {}}
        />
      </Stl.HeaderInputsContainer>
      <CommonStyle.TabHead>
        <CommonStyle.TabHeadText width={19.5}>
          Player Name
        </CommonStyle.TabHeadText>
        <CommonStyle.TabHeadText width={10}>Sessions</CommonStyle.TabHeadText>
        <CommonStyle.TabHeadText width={23}>School</CommonStyle.TabHeadText>
        <CommonStyle.TabHeadText width={23}>Teams</CommonStyle.TabHeadText>
        <CommonStyle.TabHeadText width={15}>Age</CommonStyle.TabHeadText>
        <CommonStyle.TabHeadText width={8}>Favorite</CommonStyle.TabHeadText>
      </CommonStyle.TabHead> */}
    </Stl.Container>
  );
};
