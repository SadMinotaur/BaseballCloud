import React, { useState } from "react";
import {
  SignUpSwitch,
  Button,
  ButtonContainer,
  ButtonInCont,
  FormContainer,
  TextRect,
  TextRectMain,
  Warning,
} from "./styles";
import { Form, Field } from "react-final-form";
import { Link, useHistory } from "react-router-dom";

import checkbox from "./../../../assets/checkbox.svg";
import API from "../../../utils/api";
import CommonStyle from "../../../utils/common-styles/styles";

export const RegForm: React.FC = () => {
  const history = useHistory();

  const [signInState, setSignInState] = useState<boolean>(true);

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
        onSubmit={(values) =>
          API.signUp(
            values.email,
            values.password,
            values.confirm_password,
            signInState ? "player" : "scout"
          )
            .then(() => history.push("/profile"))
            .catch(() => {})
        }
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="email"
              type="email"
              validate={(value) => (value ? undefined : "Required")}
            >
              {({ input, meta }) => (
                <>
                  <CommonStyle.InputFormInput
                    imageLock={false}
                    {...input}
                    placeholder="Email"
                  />
                  {meta.error && meta.touched && (
                    <Warning>{meta.error}</Warning>
                  )}
                </>
              )}
            </Field>
            <Field
              name="password"
              type="password"
              validate={(value) =>
                value && value.length > 7
                  ? undefined
                  : value
                  ? "Required"
                  : "Must contain more than 8 characters"
              }
            >
              {({ input, meta }) => (
                <>
                  <CommonStyle.InputFormInput
                    imageLock={true}
                    {...input}
                    placeholder="Password"
                  />
                  {meta.error && meta.touched && (
                    <Warning>{meta.error}</Warning>
                  )}
                </>
              )}
            </Field>
            <Field
              name="confirm_password"
              type="password"
              validate={(value) =>
                value === values.password
                  ? undefined
                  : "Passwords are not equal"
              }
            >
              {({ input, meta }) => (
                <>
                  <CommonStyle.InputFormInput
                    {...input}
                    placeholder="Confirm Password"
                  />
                  {meta.error && meta.touched && (
                    <Warning>{meta.error}</Warning>
                  )}
                </>
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
