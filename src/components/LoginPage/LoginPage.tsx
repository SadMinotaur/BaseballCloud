import React from "react";
import { SignInForm } from "../SignInForm/SigmForm";
import { LoginPageStyle } from "./styles";

export const LoginPage: React.FC = () => (
  <LoginPageStyle>
    <SignInForm />
  </LoginPageStyle>
);
