import React from "react";
import { Footer } from "../Footer/Footer";
import { MainComp } from "./styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header } from "../Header/Header";

import "./../../css/reset.css";
import { LoginPage } from "../LoginPage/LoginPage";

export const App: React.FC = () => (
  <MainComp>
    <Header />
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
      </Switch>
    </BrowserRouter>
    <Footer />
  </MainComp>
);
