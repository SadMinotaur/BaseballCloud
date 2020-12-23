import React from "react";
import { Field, Form } from "react-final-form";
// import API from "../../../api";
import { FormsDiv, Row, Input, Select } from "./styles";

export const ProfileForms: React.FC = () => {
  // API.getUserInfo().then((v) => console.log(v));

  const smallInputSize: number = 48;

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
              {(p) => <Select placeholder="Position in game" />}
            </Field>
            <Field name="secondary_position_in_game">
              {(p) => <Select placeholder="Secondary in game" />}
            </Field>
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
                {(p) => <Select width={smallInputSize} placeholder="Throw" />}
              </Field>
              <Field name="bats">
                {(p) => <Select width={smallInputSize} placeholder="Bats" />}
              </Field>
            </Row>
            <Field name="school">
              {(p) => <Select placeholder="School" />}
            </Field>
            <Field name="school_year">
              {(p) => <Select placeholder="School Year" />}
            </Field>
            <Field name="team">{(p) => <Select placeholder="Team" />}</Field>
            <Field name="facility">
              {(p) => <Select placeholder="Facility" />}
            </Field>
            <Field name="about" component="textarea" placeholder="About" />
            <Row>
              <button type="submit">Cancel</button>
              <button type="submit">Save</button>
            </Row>
          </form>
        )}
      />
    </FormsDiv>
  );
};
