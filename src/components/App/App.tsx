import React from "react";
import { Footer } from "../Footer/Footer";
import { LoginPageStyle, MainComp } from "./styles";
import { Switch, Route, useHistory } from "react-router-dom";
import { Header } from "../Header";

import "./../../css/global.css";
import { SignInForm } from "../AuthScreen/SignInForm";
import { RegForm } from "../AuthScreen/RegForm";
import API from "../../api";

export const App: React.FC = () => {
  const history = useHistory();

  return (
    <MainComp>
      <Header />
      <MainComp>
        <Switch>
          <Route path="/login">
            <LoginPageStyle>
              <SignInForm />
            </LoginPageStyle>
          </Route>
          <Route exact path="/registration">
            <LoginPageStyle>
              <RegForm />
            </LoginPageStyle>
          </Route>
          <Route path="/">
            {() =>
              API.token === ""
                ? history.push("/login")
                : history.push("/profile")
            }
          </Route>
          <Route path="/profile"></Route>
        </Switch>
      </MainComp>
      <Footer />
    </MainComp>
  );
};
