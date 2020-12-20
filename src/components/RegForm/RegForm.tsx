import React, { useState } from "react";
import {
  Button,
  ButtonContainer,
  ButtonInCont,
  FormContainer,
  InputForm,
  TextRect,
  TextRectMain,
} from "./styles";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";
import checkbox from "./../../assets/checkbox.svg";

export const RegForm: React.FC = () => {
  const [signInState, setSignInState] = useState(true);

  return (
    <FormContainer>
      <ButtonContainer>
        <ButtonInCont
          state={signInState}
          position="left"
          onClick={() => setSignInState(true)}
        >
          <img src={checkbox} alt="Checkbox" /> Sign Up as Player
        </ButtonInCont>
        <ButtonInCont
          state={!signInState}
          onClick={() => setSignInState(false)}
        >
          <img src={checkbox} alt="Checkbox" /> Sign Up as Scout
        </ButtonInCont>
      </ButtonContainer>
      <TextRect>
        <TextRectMain>{signInState ? "Players" : "Scouts"}</TextRectMain>
        {signInState
          ? "Players have their own profile within the system and plan on having data collected."
          : "Coaches and scouts can view players in the system but do not have their own profile."}
      </TextRect>
      <Form
        onSubmit={() => {}}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="Email">
              {(p) => <InputForm type="text" placeholder={p.input.name} />}
            </Field>
            <Field name="Password">
              {(p) => <InputForm type="text" placeholder={p.input.name} />}
            </Field>
            <Field name="Confirm Password">
              {(p) => <InputForm type="text" placeholder={p.input.name} />}
            </Field>
            <p>
              By clicking Sign Up, you agree to our Terms of Service and Privacy
              Policy.
            </p>
            <Button>Sign In</Button>
          </form>
        )}
      />
      <p>Already registered?</p>
      <Link to="login">Sign In</Link>
    </FormContainer>
  );
};
