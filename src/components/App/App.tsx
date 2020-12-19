import React from "react";
import { Footer } from "../Footer/Footer";
import { LoginPageStyle, MainComp } from "./styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header } from "../Header";

import "./../../css/global.css";
import { SignInForm } from "../SignInForm/SigmForm";

export const App: React.FC = () => (
  <MainComp>
    <Header />
    <LoginPageStyle>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <SignInForm />
          </Route>
          <Route exact path="/registration"></Route>
        </Switch>
      </BrowserRouter>
    </LoginPageStyle>
    <Footer />
  </MainComp>
);
