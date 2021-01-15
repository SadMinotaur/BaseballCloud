import React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { DropdownBlue } from "../../../utils/common-components/dropdown-blue";
import { InputBlue } from "../../../utils/common-components/input-blue";
import { SearchInput } from "../../../utils/common-components/search-input";
import CommonStyle from "../../../utils/common-styles/styles";
import Stl from "./styles";

export const NetworkPage: React.FC = () => {
  return (
    <Stl.Container>
      <Form
        onSubmit={() => {}}
        render={() => (
          <>
            <Stl.HeaderInputsContainer>
              <h3>Network</h3>
              <Stl.HeaderInputs>
                <Field name="school" type="input">
                  {({ input }) => (
                    <InputBlue
                      input={input}
                      name="School"
                      width={55}
                      widthFocus={180}
                    />
                  )}
                </Field>
                <Field name="team" type="input">
                  {({ input }) => (
                    <InputBlue
                      input={input}
                      name="Team"
                      width={45}
                      widthFocus={180}
                    />
                  )}
                </Field>
                <Field name="position">
                  {({ input }) => (
                    <DropdownBlue
                      input={input}
                      width={100}
                      options={[
                        { label: "All", value: "" },
                        { label: "Catcher", value: "catcher" },
                        { label: "First Base", value: "first_base" },
                        { label: "Second Base", value: "second_base" },
                        { label: "Sportstop", value: "shortstop" },
                        { label: "Third Base", value: "third_base" },
                        { label: "Outfield", value: "outfield" },
                        { label: "Pitcher", value: "pitcher" },
                      ]}
                    />
                  )}
                </Field>
                <Field name="age" type="number">
                  {({ input }) => (
                    <InputBlue
                      input={input}
                      name="Age"
                      width={35}
                      widthFocus={80}
                    />
                  )}
                </Field>
                <Field name="favorite">
                  {({ input }) => (
                    <DropdownBlue
                      input={input}
                      width={80}
                      options={[
                        { label: "All", value: "" },
                        { label: "Favorite", value: "1" },
                      ]}
                    />
                  )}
                </Field>
                <Field name="favorite">
                  {({ input }) => (
                    <DropdownBlue
                      input={input}
                      width={100}
                      options={[
                        { label: "Show: 10", value: "10" },
                        { label: "Show: 15", value: "15" },
                        { label: "Show: 20", value: "20" },
                      ]}
                    />
                  )}
                </Field>
              </Stl.HeaderInputs>
            </Stl.HeaderInputsContainer>
            <Stl.HeaderInputsContainer>
              <p>Available Players (.)</p>
              <Field name="player_name" type="input">
                {({ input }) => (
                  <SearchInput
                    input={input}
                    placeholder="Player Name"
                    width={100}
                  />
                )}
              </Field>
            </Stl.HeaderInputsContainer>
            <FormSpy subscription={{ values: true }} onChange={() => {}} />
          </>
        )}
      />
      <CommonStyle.TabHead>
        <CommonStyle.TabHeadText width={19.5}>
          Player Name
        </CommonStyle.TabHeadText>
        <CommonStyle.TabHeadText width={10}>Sessions</CommonStyle.TabHeadText>
        <CommonStyle.TabHeadText width={23}>School</CommonStyle.TabHeadText>
        <CommonStyle.TabHeadText width={23}>Teams</CommonStyle.TabHeadText>
        <CommonStyle.TabHeadText width={15}>Age</CommonStyle.TabHeadText>
        <CommonStyle.TabHeadText width={8}>Favorite</CommonStyle.TabHeadText>
      </CommonStyle.TabHead>
    </Stl.Container>
  );
};
