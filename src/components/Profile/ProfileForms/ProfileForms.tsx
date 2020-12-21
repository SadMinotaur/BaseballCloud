import React from "react";
import { Field, Form } from "react-final-form";
import API from "../../../api";
import { Button } from "../../Auth/RegForm/styles";
import { FormsDiv, Row } from "./styles";

export const ProfileForms: React.FC = () => {
  // API.getUserInfo().then((v) => console.log(v));
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
              <Field
                name="firstName"
                component="input"
                placeholder="First Name"
              />
              <Field
                name="lastname"
                component="input"
                placeholder="Last name"
              />
            </Row>
            <Field
              name="position_in_game"
              component="select"
              placeholder="Position in game"
            />
            <Field
              name="secondary_position_in_game"
              component="select"
              placeholder="Secondary position in game"
            />
            <Field name="age" component="input" placeholder="Age" />
            <Row>
              <Field name="feet" component="input" placeholder="Feet" />
              <Field name="inches" component="input" placeholder="Inches" />
            </Row>
            <Field name="weight" component="input" placeholder="Weight" />
            <Row>
              <Field name="throw" component="select" placeholder="Throw" />
              <Field name="bats" component="select" placeholder="Bats" />
            </Row>
            <Field name="school" component="select" placeholder="School" />
            <Field
              name="school_year"
              component="select"
              placeholder="School Year"
            />
            <Field name="team" component="select" placeholder="Team" />
            <Field name="facility" component="select" placeholder="Facility" />
            <Field name="about" component="textarea" placeholder="About" />
            <Row>
              <Button type="submit">Cancel</Button>
              <Button type="submit">Save</Button>
            </Row>
          </form>
        )}
      />
    </FormsDiv>
  );
};
