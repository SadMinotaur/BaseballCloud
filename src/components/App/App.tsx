import React from "react";
import { Footer } from "../Footer/Footer";
import { LoginPageStyle, MainComp } from "./styles";
import { Switch, Route } from "react-router-dom";
import { Header } from "../Header";

import "./../../css/global.css";
import { SignInForm } from "../SignInForm";
import { RegForm } from "../RegForm";

export const App: React.FC = () => (
  <MainComp>
    <Header />
    <LoginPageStyle>
      <Switch>
        <Route exact path="/login">
          <SignInForm />
        </Route>
        <Route exact path="/registration">
          <RegForm />
        </Route>
      </Switch>
    </LoginPageStyle>
    <Footer />
  </MainComp>
);
