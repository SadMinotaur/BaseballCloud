import React from "react";
import {
  Button as ButtonSubmit,
  ForgotPassword,
  FormContainer,
  FormText,
  FormTextSign,
  InputForm,
  SignIn,
} from "./styles";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";
import API from "../../api";

export const SignInForm: React.FC = () => (
  <FormContainer>
    <FormText>
      <div>Welcome to BaseballCloud!</div>
      <FormTextSign>Sign into your account here:</FormTextSign>
    </FormText>
    <Form
      onSubmit={async (values) => API.signIn(values.email, values.password)}
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
              <InputForm
                type="text"
                onChange={p.input.onChange}
                placeholder={p.input.name}
              />
            )}
          </Field>
          <Field name="password" validate={(v) => (v ? undefined : "Required")}>
            {(p) => (
              <InputForm
                type="text"
                onChange={p.input.onChange}
                placeholder={p.input.name}
              />
            )}
          </Field>
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
