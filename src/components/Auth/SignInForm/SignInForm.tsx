import React, { useState } from "react";
import {
  ButtonSubmit,
  ErrorText,
  ForgotPassword,
  FormContainer,
  FormText,
  FormTextSign,
  InputForm,
  InputFormIcon,
  InputFormInput,
  SignIn,
} from "./styles";
import { Form, Field } from "react-final-form";
import { Link, useHistory } from "react-router-dom";
import API from "../../../Api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

export const SignInForm: React.FC = () => {
  const history = useHistory();
  const [showError, setShowError] = useState(false);

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
        render={({
          submitError,
          handleSubmit,
          submitting,
          pristine,
          values,
          invalid,
        }) => (
          <form onSubmit={handleSubmit}>
            <Field name="email" validate={(v) => (v ? undefined : "Required")}>
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
            <Field
              name="password"
              validate={(v) => (v ? undefined : "Required")}
            >
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
        <div>Don’t have an account? </div>
        <Link to="registration"> Sign Up</Link>
      </SignIn>
    </FormContainer>
  );
};
