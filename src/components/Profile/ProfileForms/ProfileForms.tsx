import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import {
  FormsDiv,
  Row,
  Input,
  Select,
  AboutTextarea,
  SectionText,
  Hr,
  ButtonProfile,
  WarningText,
} from "./styles";
import { Queries } from "../graphql/query";
import API from "../../../api";
import { ProfilePic } from "./../common-styles/styles";

export const ProfileForms: React.FC = () => {
  const smallInputSize: number = 48;

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
        <Hr />
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
              {(p) => (
                <Select>
                  <option>Catcher</option>
                  <option>First Base</option>
                  <option>Second Base</option>
                  <option>Shortstop</option>
                  <option>Third Base</option>
                  <option>Outfield</option>
                  <option>Pitcher</option>
                </Select>
              )}
            </Field>
            {/* <WarningText>Position Required</WarningText> */}
            <Field name="secondary_position_in_game">
              {(p) => (
                <Select>
                  <option>-</option>
                  <option>Catcher</option>
                  <option>First Base</option>
                  <option>Second Base</option>
                  <option>Shortstop</option>
                  <option>Third Base</option>
                  <option>Outfield</option>
                  <option>Pitcher</option>
                </Select>
              )}
            </Field>
            {sectionText("Personal Info")}
            <Field name="age" validate={required}>
              {({ input, meta }) => (
                <div>
                  <Input {...input} type="input" placeholder="Age" />
                  {meta.error && meta.touched && (
                    <WarningText>Age Required</WarningText>
                  )}
                </div>
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
                  <Input
                    {...input}
                    type="input"
                    width={smallInputSize}
                    placeholder="Inches"
                  />
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
              <Field name="throw">
                {(p) => (
                  <Select width={smallInputSize}>
                    <option>R</option>
                    <option>L</option>
                  </Select>
                )}
              </Field>
              <Field name="bats">
                {(p) => (
                  <Select width={smallInputSize}>
                    <option>R</option>
                    <option>L</option>
                  </Select>
                )}
              </Field>
            </Row>
            {/* <WarningText>Throws Required</WarningText>
            <WarningText>Bats Required</WarningText> */}
            {sectionText("School")}
            <Field name="school">
              {(p) => (
                <Select placeholder="School">
                  {schools.map((v) => (
                    <option key={v.id}>{v.name}</option>
                  ))}
                </Select>
              )}
            </Field>
            <Field name="school_year">
              {(p) => (
                <Select>
                  <option>Freshman</option>
                  <option>Sophmore</option>
                  <option>Junior</option>
                  <option>Senior</option>
                  <option>None</option>
                </Select>
              )}
            </Field>
            <Field name="team">
              {(p) => (
                <Select>
                  {teams.map((v) => (
                    <option key={v.id}>{v.name}</option>
                  ))}
                </Select>
              )}
            </Field>
            {sectionText("Facility")}
            <Field name="facility">
              {(p) => (
                <Select>
                  {facilities.map((v) => (
                    <option key={v.id}>{v.u_name}</option>
                  ))}
                </Select>
              )}
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
