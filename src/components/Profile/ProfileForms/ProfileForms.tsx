import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import Dropdown from "react-dropdown";
import {
  FormsDiv,
  Row,
  Input,
  AboutTextarea,
  SectionText,
  Line,
  ButtonProfile,
  WarningText,
} from "./styles";
import { Queries } from "../graphql/query";
import API from "../../../api";
import { ProfilePic } from "./../common-styles/styles";
import "./dropdown.css";

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

  function dropdown(options: string[], placeholder: string, fixed?: boolean) {
    return (
      <Dropdown
        className={"main"}
        menuClassName="menu"
        options={options}
        placeholder={placeholder}
        arrowOpen={<span className="arrow-open" />}
        arrowClosed={<span className="arrow-closed" />}
      />
    );
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
            <ProfilePic />
            <Row>
              <Field name="firstName" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <Input {...input} type="input" placeholder="First Name" />
                    {meta.error && meta.touched && (
                      <WarningText>First Name Required</WarningText>
                    )}
                  </div>
                )}
              </Field>
              <Field name="lastname" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <Input {...input} type="input" placeholder="Last Name" />
                    {meta.error && meta.touched && (
                      <WarningText>Last Name Required</WarningText>
                    )}
                  </div>
                )}
              </Field>
            </Row>
            <Field name="position_in_game">
              {(p) =>
                dropdown(
                  [
                    "Catcher",
                    "First Base",
                    "Second Base",
                    "Shortstop",
                    "Third Base",
                    "Outfield",
                    "Pitcher",
                  ],
                  "Position"
                )
              }
            </Field>
            {/* <WarningText>Position Required</WarningText> */}
            <Field name="secondary_position_in_game">
              {(p) =>
                dropdown(
                  [
                    "-",
                    "Catcher",
                    "First Base",
                    "Second Base",
                    "Shortstop",
                    "Third Base",
                    "Outfield",
                    "Pitcher",
                  ],
                  "secondary_position_in_game"
                )
              }
            </Field>
            {sectionText("Personal Info")}
            <Field name="age" validate={required}>
              {({ input, meta }) => (
                <>
                  <Input {...input} type="input" placeholder="Age" />
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
                    <Input {...input} type="input" placeholder="Feet" />
                    {meta.error && meta.touched && (
                      <WarningText>Feet Required</WarningText>
                    )}
                  </div>
                )}
              </Field>
              <Field name="inches">
                {({ input, meta }) => (
                  <div>
                    <Input {...input} type="input" placeholder="Inches" />
                    {meta.error && meta.touched && (
                      <WarningText>Inches Required</WarningText>
                    )}
                  </div>
                )}
              </Field>
            </Row>
            <Field name="weight" validate={required}>
              {({ input, meta }) => (
                <>
                  <Input {...input} type="input" placeholder="Weight" />
                  {meta.error && meta.touched && (
                    <WarningText>Weight Required</WarningText>
                  )}
                </>
              )}
            </Field>
            <Row>
              <Field name="throw">{(p) => dropdown(["R", "L"], "throw")}</Field>
              <Field name="bats">{(p) => dropdown(["R", "L"], "bats")}</Field>
            </Row>
            {/* <WarningText>Throws Required</WarningText>
            <WarningText>Bats Required</WarningText> */}
            {sectionText("School")}
            <Field name="school">
              {(p) =>
                dropdown(
                  schools.map((v) => v.name),
                  "School"
                )
              }
            </Field>
            <Field name="school_year">
              {(p) =>
                dropdown(
                  ["Freshman", "Sophomore", "Junior", "Senior", "None"],
                  "school_year"
                )
              }
            </Field>
            <Field name="team">
              {(p) =>
                dropdown(
                  teams.map((v) => v.name),
                  "team"
                )
              }
            </Field>
            {sectionText("Facility")}
            <Field name="facility">
              {(p) =>
                dropdown(
                  facilities.map((v) => v.u_name),
                  "facility"
                )
              }
            </Field>
            {sectionText("About")}
            <Field name="about" component="textarea">
              {(p) => <AboutTextarea placeholder="About" />}
            </Field>
            <WarningText>* Fill out the required fields</WarningText>
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
