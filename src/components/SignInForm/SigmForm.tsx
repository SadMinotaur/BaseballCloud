import React from "react";
import {
  Button,
  FormContainer,
  FormText,
  FormTextSign,
  InputForm,
} from "./styles";
import { Form, Field } from "react-final-form";

export const SignInForm: React.FC = () => (
  <FormContainer>
    <FormText>
      <div>Welcome to BaseballCloud!</div>
      <FormTextSign>Sign into your account here:</FormTextSign>
    </FormText>
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
          <Button>Sign In</Button>
          <a href="forgotpassword">Forgotten password?</a>
        </form>
      )}
    />
    <p>Don’t have an account?</p>
    <a href="registration">Sign Up</a>
  </FormContainer>
);
