import React from "react";
import { Button, FormContainer, InputForm } from "./styles";
import { Form, Field } from "react-final-form";

export const RegForm: React.FC = () => (
  <FormContainer>
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
        </form>
      )}
    />
  </FormContainer>
);
