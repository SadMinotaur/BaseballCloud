import React, { useState } from "react";
import {
  ButtonSubmit,
  ErrorText,
  ForgotPassword,
  FormContainer,
  FormText,
  FormTextSign,
  SignIn,
} from "./styles";
import { Form, Field } from "react-final-form";
import { Link, useHistory } from "react-router-dom";
import API from "../../../grahql/api";
import CommonStyle from "../../../utils/common-styles/styles";

export const SignInForm: React.FC = () => {
  const history = useHistory();
  const [showError, setShowError] = useState<boolean>(false);

  function required(value: string): string | undefined {
    return value ? undefined : "Required";
  }

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
            <Field name="email" validate={required}>
              {({ input }) => (
                <CommonStyle.InputFormInput
                  {...input}
                  imageLock={true}
                  type="email"
                  placeholder="Email"
                />
              )}
            </Field>
            <Field name="password" validate={required}>
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
        <Link to="registration">Sign Up</Link>
      </SignIn>
    </FormContainer>
  );
};
