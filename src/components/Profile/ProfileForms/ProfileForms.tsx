import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { FormsDropdown } from "./../FormsDropdown";
import {
  FormsDiv,
  Row,
  ButtonProfile,
  WarningText,
  DropdownSpacing,
} from "./styles";
import { FormsAbout } from "./../FormsAbout";
import { Queries } from "../graphql/query";
import { TextF } from "./../FormsInput";
import { SectText } from "./../SectionText";
import { Facilities, School, Team } from "../../../utils/types/req-types";
import CommonStyle from "../../../utils/common-styles/styles";
import PictureProf from "./../../../assets/profileIcon.png";
import API from "../../../utils/api";

export const ProfileForms: React.FC = () => {
  const [picture, setPicture] = useState(PictureProf);

  function required(value: string): string | undefined {
    return value ? undefined : "Required";
  }

  return (
    <FormsDiv>
      <Form
        onSubmit={(values) => {}}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <CommonStyle.ProfileContainer>
              <CommonStyle.ProfilePic src={picture} />
              <div>
                <input
                  style={{ display: "none" }}
                  id="my-file"
                  type="file"
                  onChange={(e) =>
                    e.target.files &&
                    setPicture(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </div>
              <label htmlFor="my-file">Choose photo</label>
            </CommonStyle.ProfileContainer>
            <Row>
              <Field name="firstName" validate={required}>
                {({ input, meta }) => (
                  <DropdownSpacing>
                    <TextF input={input} label="First Name*" />
                    {meta.error && meta.touched && (
                      <WarningText>First Name Required</WarningText>
                    )}
                  </DropdownSpacing>
                )}
              </Field>
              <Field name="lastname" validate={required}>
                {({ input, meta }) => (
                  <DropdownSpacing leftMargin={true}>
                    <TextF input={input} label="Last Name*" />
                    {meta.error && meta.touched && (
                      <WarningText>Last Name Required</WarningText>
                    )}
                  </DropdownSpacing>
                )}
              </Field>
            </Row>
            <Field name="position_in_game" validate={required}>
              {({ input, meta }) => (
                <>
                  <FormsDropdown
                    input={input}
                    placeholder={"Position in Game*"}
                    onInputChange={() => {}}
                    options={[
                      { label: "Catcher", value: "Catcher" },
                      { label: "First Base", value: "First Base" },
                      { label: "Second Base", value: "Second Base" },
                      { label: "Shortstop", value: "Shortstop" },
                      { label: "Third Base", value: "Third Base" },
                      { label: "Outfield", value: "Outfield" },
                      { label: "Pitcher", value: "Pitcher" },
                    ]}
                  />
                  {meta.error && meta.touched && (
                    <WarningText>Position Required</WarningText>
                  )}
                </>
              )}
            </Field>
            <Field name="secondary_position_in_game">
              {({ input, meta }) => (
                <FormsDropdown
                  input={input}
                  placeholder="Secondary Position in Game"
                  onInputChange={() => {}}
                  options={[
                    { value: "-", label: "-" },
                    { value: "Catcher", label: "Catcher" },
                    { value: "First Base", label: "First Base" },
                    { value: "Second Base", label: "Second Base" },
                    { value: "Shortstop", label: "Shortstop" },
                    { value: "Third Base", label: "Third Base" },
                    { value: "Outfield", label: "Outfield" },
                    { value: "Pitcher", label: "Pitcher" },
                  ]}
                />
              )}
            </Field>
            <SectText text="Personal Info" />
            <Field name="age" validate={required}>
              {({ input, meta }) => (
                <>
                  <TextF input={input} label="Age*" />
                  {meta.error && meta.touched && (
                    <WarningText>Age Required</WarningText>
                  )}
                </>
              )}
            </Field>
            <Row>
              <Field name="feet" validate={required}>
                {({ input, meta }) => (
                  <DropdownSpacing>
                    <TextF input={input} label="Feet*" />
                    {meta.error && meta.touched && (
                      <WarningText>Feet Required</WarningText>
                    )}
                  </DropdownSpacing>
                )}
              </Field>
              <Field name="inches">
                {({ input, meta }) => (
                  <DropdownSpacing leftMargin={true}>
                    <TextF input={input} label="Inches" />
                    {meta.error && meta.touched && (
                      <WarningText>Inches Required</WarningText>
                    )}
                  </DropdownSpacing>
                )}
              </Field>
            </Row>
            <Field name="weight" validate={required}>
              {({ input, meta }) => (
                <>
                  <TextF input={input} label="Weight*" />
                  {meta.error && meta.touched && (
                    <WarningText>Weight Required</WarningText>
                  )}
                </>
              )}
            </Field>
            <Row>
              <Field name="throw" validate={required}>
                {({ input, meta }) => (
                  <DropdownSpacing>
                    <FormsDropdown
                      input={input}
                      options={[
                        { value: "R", label: "R" },
                        { value: "L", label: "L" },
                      ]}
                      placeholder="Throw*"
                      onInputChange={() => {}}
                    />
                    {meta.error && meta.touched && (
                      <WarningText>Throws Required</WarningText>
                    )}
                  </DropdownSpacing>
                )}
              </Field>
              <Field name="bats" validate={required}>
                {({ input, meta }) => (
                  <DropdownSpacing leftMargin={true}>
                    <FormsDropdown
                      input={input}
                      options={[
                        { value: "R", label: "R" },
                        { value: "L", label: "L" },
                      ]}
                      placeholder="Bats*"
                      onInputChange={() => {}}
                    />
                    {meta.error && meta.touched && (
                      <WarningText>Bats Required</WarningText>
                    )}
                  </DropdownSpacing>
                )}
              </Field>
            </Row>
            <SectText text="School" />
            <Field name="school">
              {({ input, meta }) => (
                <FormsDropdown
                  input={input}
                  placeholder="School"
                  onInputChange={() => {}}
                  loadOptions={API.graphqlPost(Queries.getSchools, {
                    search: "",
                  }).then((v) =>
                    v.schools.schools.map((resp: School) => ({
                      value: resp.id,
                      label: resp.name,
                    }))
                  )}
                />
              )}
            </Field>
            <Field name="school_year">
              {({ input }) => (
                <FormsDropdown
                  input={input}
                  options={[
                    { value: "Freshman", label: "Freshman" },
                    { value: "Sophomore", label: "Sophomore" },
                    { value: "Junior", label: "Junior" },
                    { value: "Senior", label: "Senior" },
                    { value: "None", label: "None" },
                  ]}
                  placeholder={"School Year"}
                  onInputChange={() => {}}
                />
              )}
            </Field>
            <Field name="team">
              {({ input }) => (
                <FormsDropdown
                  input={input}
                  placeholder="Team"
                  onInputChange={() => {}}
                  loadOptions={API.graphqlPost(Queries.getTeams, {
                    search: "",
                  }).then((v) =>
                    v.teams.teams.map((resp: Team) => ({
                      value: resp.id,
                      label: resp.name,
                    }))
                  )}
                />
              )}
            </Field>
            <SectText text="Facility" />
            <Field name="facility">
              {({ input }) => (
                <FormsDropdown
                  input={input}
                  placeholder="Facility"
                  multiple={true}
                  onInputChange={() => {}}
                  loadOptions={API.graphqlPost(Queries.getFacilities, {
                    search: "",
                  }).then((v) =>
                    v.facilities.facilities.map((resp: Facilities) => ({
                      value: resp.id,
                      label: resp.u_name,
                    }))
                  )}
                />
              )}
            </Field>
            <SectText text="About" />
            <Field name="about" component="textarea">
              {({ input, meta }) => (
                <FormsAbout
                  input={input}
                  placeholder="Describe yourself in a few words"
                />
              )}
            </Field>
            <WarningText>* Fill out the required fields</WarningText>
            <Row>
              <ButtonProfile type="reset">Cancel</ButtonProfile>
              <ButtonProfile borderBlue={true} type="submit">
                Save
              </ButtonProfile>
            </Row>
          </form>
        )}
      />
    </FormsDiv>
  );
};
