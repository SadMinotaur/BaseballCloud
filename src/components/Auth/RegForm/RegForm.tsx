import React, { useState } from "react";
import {
  SignUpSwitch,
  Button,
  ButtonContainer,
  ButtonInCont,
  FormContainer,
  InputForm,
  InputFormIcon,
  InputFormInput,
  TextRect,
  TextRectMain,
} from "./styles";
import { Form, Field } from "react-final-form";
import { Link, useHistory } from "react-router-dom";
import checkbox from "./../../../assets/checkbox.svg";
import API from "../../../grahql/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

export const RegForm: React.FC = () => {
  const history = useHistory();
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
        onSubmit={(values) => {
          API.signUp(
            values.email,
            values.password,
            values.confirm_password,
            signInState ? "player" : "scout"
          );
          history.push("/profile");
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="email">
              {(p) => (
                <InputForm>
                  <InputFormIcon>
                    <FontAwesomeIcon icon={faUser} />
                  </InputFormIcon>
                  <InputFormInput
                    type="email"
                    onChange={p.input.onChange}
                    placeholder="Email"
                  />
                </InputForm>
              )}
            </Field>
            <Field name="password">
              {(p) => (
                <InputForm>
                  <InputFormIcon>
                    <FontAwesomeIcon icon={faLock} />
                  </InputFormIcon>
                  <InputFormInput
                    type="password"
                    onChange={p.input.onChange}
                    placeholder="Password"
                  />
                </InputForm>
              )}
            </Field>
            <Field name="confirm_password">
              {(p) => (
                <InputForm>
                  <InputFormIcon>
                    <FontAwesomeIcon icon={faCheck} />
                  </InputFormIcon>
                  <InputFormInput
                    type="password"
                    onChange={p.input.onChange}
                    placeholder="Confirm Password"
                  />
                </InputForm>
              )}
            </Field>
            <p>
              By clicking Sign Up, you agree to our Terms of Service and Privacy
              Policy.
            </p>
            <Button>Sign Up</Button>
          </form>
        )}
      />
      <SignUpSwitch>
        <p>Already registered?</p>
        <Link to="/login">Sign In</Link>
      </SignUpSwitch>
    </FormContainer>
  );
};
