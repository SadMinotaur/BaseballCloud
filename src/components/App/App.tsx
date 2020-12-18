import React from "react";
import { Footer } from "../Footer/Footer";
import { MainComp } from "./styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export const App: React.FC = () => (
  <>
    <MainComp>
      <BrowserRouter>
        <Switch>
          <Route exact path="/"></Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </MainComp>
  </>
);
