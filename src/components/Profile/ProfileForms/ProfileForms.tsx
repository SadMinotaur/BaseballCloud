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
} from "./styles";
import API from "../../../Api/api";

export const ProfileForms: React.FC = () => {
  const smallInputSize: number = 48;

  const [schools, setSchools] = useState([] as { id: number; name: string }[]);
  const [teams, setTeams] = useState([] as { id: number; name: string }[]);
  const [facilities, setFacilities] = useState(
    [] as { id: number; u_name: string; email: string }[]
  );

  useEffect(() => {
    API.getSchools().then((v) => setSchools(v));
    API.getTeams().then((v) => setTeams(v));
    API.getFacilities().then((v) => setFacilities(v));
  }, []);

  function sectionText(text: string) {
    return (
      <Row>
        <SectionText>{text}</SectionText>
        <Hr />
      </Row>
    );
  }

  return (
    <FormsDiv>
      <Form
        onSubmit={(values) => {
          // API.mutateProfile({ age: ca });
        }}
        render={({
          submitError,
          handleSubmit,
          submitting,
          pristine,
          values,
          invalid,
        }) => (
          <form onSubmit={handleSubmit}>
            <Row>
              <Field name="firstName">
                {(p) => (
                  <Input
                    type="input"
                    width={smallInputSize}
                    placeholder="First Name"
                  />
                )}
              </Field>
              <Field name="lastname">
                {(p) => (
                  <Input
                    type="input"
                    width={smallInputSize}
                    placeholder="Last Name"
                  />
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
            <Field name="age">
              {(p) => <Input type="input" placeholder="Age" />}
            </Field>
            <Row>
              <Field name="feet">
                {(p) => (
                  <Input
                    type="input"
                    width={smallInputSize}
                    placeholder="Feet"
                  />
                )}
              </Field>
              <Field name="inches">
                {(p) => (
                  <Input
                    type="input"
                    width={smallInputSize}
                    placeholder="Inches"
                  />
                )}
              </Field>
            </Row>
            <Field name="weight">
              {(p) => <Input type="input" placeholder="Weight" />}
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
