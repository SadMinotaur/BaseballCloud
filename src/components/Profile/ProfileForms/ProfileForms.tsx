import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { FormsDropdown } from "./../FormsDropdown";
import {
  FormsDiv,
  Row,
  AboutTextarea,
  SectionText,
  Line,
  ButtonProfile,
  WarningText,
  RowEnd,
} from "./styles";
import { Queries } from "../graphql/query";
import { ProfilePic } from "./../common-styles/styles";
import { TextF } from "./../FormsInput";
import API from "../../../grahql/api";
import PictureProf from "./../../../assets/profileIcon.png";

export const ProfileForms: React.FC = () => {
  useEffect(() => {}, []);

  function sectionText(text: string) {
    return (
      <Row>
        <SectionText>{text}</SectionText>
        <Line />
      </Row>
    );
  }

  function required(value: string) {
    return value ? undefined : "Required";
  }

  return (
    <FormsDiv>
      <Form
        onSubmit={(values) => {}}
        render={({
          submitError,
          handleSubmit,
          submitting,
          pristine,
          values,
          invalid,
        }) => (
          <form onSubmit={handleSubmit}>
            <ProfilePic src={PictureProf} />
            <Row>
              <Field name="firstName" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <TextF input={input} label="First Name*" moved={true} />
                    {meta.error && meta.touched && (
                      <WarningText>First Name Required</WarningText>
                    )}
                  </div>
                )}
              </Field>
              <Field name="lastname" validate={required}>
                {({ input, meta }) => (
                  <RowEnd>
                    <TextF input={input} label="Last Name*" moved={true} />
                    {meta.error && meta.touched && (
                      <WarningText>Last Name Required</WarningText>
                    )}
                  </RowEnd>
                )}
              </Field>
            </Row>
            <Field name="position_in_game">
              {(p) => (
                <FormsDropdown
                  options={[
                    { label: "Catcher", value: "Catcher" },
                    { label: "First Base", value: "First Base" },
                    { label: "Second Base", value: "Second Base" },
                    { label: "Shortstop", value: "Shortstop" },
                    { label: "Third Base", value: "Third Base" },
                    { label: "Outfield", value: "Outfield" },
                    { label: "Pitcher", value: "Pitcher" },
                  ]}
                  placeholder={"Position in Game*"}
                  onInputChange={() => {}}
                />
              )}
            </Field>
            {/* <WarningText>Position Required</WarningText> */}
            <Field name="secondary_position_in_game">
              {(p) => (
                <FormsDropdown
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
                  placeholder={"Secondary Position in Game"}
                  onInputChange={() => {}}
                />
              )}
            </Field>
            {sectionText("Personal Info")}
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
                  <div>
                    <TextF input={input} moved={true} label="Feet*" />
                    {meta.error && meta.touched && (
                      <WarningText>Feet Required</WarningText>
                    )}
                  </div>
                )}
              </Field>
              <Field name="inches">
                {({ input, meta }) => (
                  <RowEnd>
                    <TextF input={input} moved={true} label="Inches" />
                    {meta.error && meta.touched && (
                      <WarningText>Inches Required</WarningText>
                    )}
                  </RowEnd>
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
              <Field name="throw">
                {(p) => (
                  <FormsDropdown
                    options={[
                      { value: "R", label: "R" },
                      { value: "L", label: "L" },
                    ]}
                    placeholder="Throw*"
                    onInputChange={() => {}}
                  />
                )}
              </Field>
              <Field name="bats">
                {(p) => (
                  <FormsDropdown
                    options={[
                      { value: "R", label: "R" },
                      { value: "L", label: "L" },
                    ]}
                    placeholder="Bats*"
                    onInputChange={() => {}}
                  />
                )}
              </Field>
            </Row>
            {/* <WarningText>Throws Required</WarningText>
            <WarningText>Bats Required</WarningText> */}
            {sectionText("School")}
            <Field name="school">
              {(p) => (
                <FormsDropdown
                  placeholder="School"
                  onInputChange={() => {}}
                  loadOptions={API.graphqlPost(Queries.getSchools, {
                    search: "",
                  }).then((v) =>
                    v.data.schools.schools.map(
                      (resp: { id: number; name: string }) => ({
                        value: resp.id,
                        label: resp.name,
                      })
                    )
                  )}
                />
              )}
            </Field>
            <Field name="school_year">
              {(p) => (
                <FormsDropdown
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
              {(p) => (
                <FormsDropdown
                  placeholder="Team"
                  onInputChange={() => {}}
                  loadOptions={API.graphqlPost(Queries.getTeams, {
                    search: "",
                  }).then((v) =>
                    v.data.teams.teams.map(
                      (resp: { id: number; name: string }) => ({
                        value: resp.id,
                        label: resp.name,
                      })
                    )
                  )}
                />
              )}
            </Field>
            {sectionText("Facility")}
            <Field name="facility">
              {(p) => (
                <FormsDropdown
                  placeholder="Facility"
                  multiple={true}
                  onInputChange={() => {}}
                  loadOptions={API.graphqlPost(Queries.getFacilities, {
                    search: "",
                  }).then((v) =>
                    v.data.facilities.facilities.map(
                      (resp: {
                        id: number;
                        u_name: string;
                        email: string;
                      }) => ({
                        value: resp.id,
                        label: resp.u_name,
                      })
                    )
                  )}
                />
              )}
            </Field>
            {sectionText("About")}
            <Field name="about" component="textarea">
              {(p) => (
                <AboutTextarea placeholder="Describe yourself in a few words" />
              )}
            </Field>
            {/* <WarningText>* Fill out the required fields</WarningText> */}
            <Row>
              <ButtonProfile type="submit">Cancel</ButtonProfile>
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
