import React from "react";
import { FormContainer, FormText, FormTextSign } from "./styles";
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
          <div>
            <label>Email</label>

            {/* width: 100%;
height: 50px;
border-radius: 4px;
background-color: #eff1f3;
padding: 6px 12px 10px 37px;
font-size: 16px;
line-height: 1.13;
font-weight: 400;
color: #667784;
border: 1px solid transparent; */}
            <Field
              name="firstName"
              component="input"
              type="text"
              placeholder="Email"
            />
          </div>
          <div>
            <label>Password</label>
            <Field
              name="password"
              component="input"
              type="text"
              placeholder="Password"
            />
          </div>
        </form>
      )}
    />
  </FormContainer>
);
