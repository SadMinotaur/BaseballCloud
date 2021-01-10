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
  const [schools, setSchools] = useState([] as { id: number; name: string }[]);
  const [teams, setTeams] = useState([] as { id: number; name: string }[]);
  const [facilities, setFacilities] = useState(
    [] as { id: number; u_name: string; email: string }[]
  );

  useEffect(() => {
    API.graphqlPost(Queries.getSchools, { search: "" }).then((v) =>
      setSchools(v.data.schools.schools)
    );
    API.graphqlPost(Queries.getTeams, { search: "" }).then((v) =>
      setTeams(v.data.teams.teams)
    );
    API.graphqlPost(Queries.getFacilities, { search: "" }).then((v) =>
      setFacilities(v.data.facilities.facilities)
    );
  }, []);

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
                    "Catcher",
                    "First Base",
                    "Second Base",
                    "Shortstop",
                    "Third Base",
                    "Outfield",
                    "Pitcher",
                  ]}
                  placeholder={"Position in Game"}
                />
              )}
            </Field>
            {/* <WarningText>Position Required</WarningText> */}
            <Field name="secondary_position_in_game">
              {(p) => (
                <FormsDropdown
                  options={[
                    "-",
                    "Catcher",
                    "First Base",
                    "Second Base",
                    "Shortstop",
                    "Third Base",
                    "Outfield",
                    "Pitcher",
                  ]}
                  placeholder={"Secondary Position in Game"}
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
                  <TextF input={input} label="Weight" />
                  {meta.error && meta.touched && (
                    <WarningText>Weight Required</WarningText>
                  )}
                </>
              )}
            </Field>
            <Row>
              <Field name="throw">
                {(p) => (
                  <FormsDropdown options={["R", "L"]} placeholder="Throw" />
                )}
              </Field>
              <Field name="bats">
                {(p) => (
                  <FormsDropdown options={["R", "L"]} placeholder="Bats" />
                )}
              </Field>
            </Row>
            {/* <WarningText>Throws Required</WarningText>
            <WarningText>Bats Required</WarningText> */}
            {sectionText("School")}
            <Field name="school">
              {(p) => (
                <FormsDropdown
                  options={schools.map((v) => v.name)}
                  placeholder={"School"}
                />
              )}
            </Field>
            <Field name="school_year">
              {(p) => (
                <FormsDropdown
                  options={[
                    "Freshman",
                    "Sophomore",
                    "Junior",
                    "Senior",
                    "None",
                  ]}
                  placeholder={"School Year"}
                />
              )}
            </Field>
            <Field name="team">
              {(p) => (
                <FormsDropdown
                  options={teams.map((v) => v.name)}
                  placeholder={"Team"}
                />
              )}
            </Field>
            {sectionText("Facility")}
            <Field name="facility">
              {(p) => (
                <FormsDropdown
                  options={facilities.map((v) => v.u_name)}
                  placeholder={"Facility"}
                />
              )}
            </Field>
            {sectionText("About")}
            <Field name="about" component="textarea">
              {(p) => <AboutTextarea placeholder="About" />}
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
