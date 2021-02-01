import React, { useState } from "react";
import {
  ButtonSubmit,
  ErrorText,
  ForgotPassword,
  FormContainer,
  FormText,
  FormTextSign,
  SignIn,
  SignUp,
} from "./styles";
import { Form, Field } from "react-final-form";
import { Link, useHistory } from "react-router-dom";
import { requiredValue } from "./../../../utils/validation/common";
import API from "../../../utils/api";
import CommonStyle from "../../../common-styles/styles";

export const SignInForm: React.FC = () => {
  const history = useHistory();
  const [showError, setShowError] = useState<boolean>(false);

  return (
    <FormContainer>
      <FormText>
        <div>Welcome to BaseballCloud!</div>
        <FormTextSign>Sign into your account here:</FormTextSign>
      </FormText>
      <Form
        onSubmit={(values) => {
          API.signIn(values.email, values.password)
            .then(() => history.push("/profile", "test"))
            .catch(() => setShowError(true));
        }}
        render={({ handleSubmit, submitting, invalid }) => (
          <form onSubmit={handleSubmit}>
            <Field name="email" validate={requiredValue()}>
              {({ input }) => (
                <CommonStyle.InputFormInput
                  {...input}
                  imageLock={true}
                  type="email"
                  placeholder="Email"
                />
              )}
            </Field>
            <Field name="password" validate={requiredValue()}>
              {({ input }) => (
                <CommonStyle.InputFormInput
                  {...input}
                  imageLock={false}
                  type="password"
                  placeholder="Password"
                />
              )}
            </Field>
            {showError && (
              <ErrorText>
                Invalid login credentials. Please try again.
              </ErrorText>
            )}
            <ButtonSubmit type="submit" disabled={submitting || invalid}>
              Sign In
            </ButtonSubmit>
            <ForgotPassword>
              <Link to="forgotpassword">Forgotten password?</Link>
            </ForgotPassword>
          </form>
        )}
      />
      <SignIn>
        <p>Don’t have an account?</p>
        <SignUp>
          <Link to="registration">Sign Up</Link>
        </SignUp>
      </SignIn>
    </FormContainer>
  );
};
