import React, { useRef } from "react";
import { Footer } from "../Footer/Footer";
import { LoginPageStyle, MainComp, Toaster } from "./styles";
import { Switch, Route, useHistory } from "react-router-dom";
import { Header } from "../Header";
import { SignInForm } from "../Auth/SignInForm";
import { RegForm } from "../Auth/RegForm";
import { ProfilePage } from "./../Profile/Page";
import { LeaderboardPage } from "./../Leaderboard/Page";
import { NetworkPage } from "./../Network/Page";
import { ToastContainer, ToastMessageAnimated } from "react-toastr";
import API from "../../utils/api";
import "./../../css/global.css";

const timeout: number = 3000;

export const App: React.FC = () => {
  const refC = useRef<ToastContainer>(null);
  const history = useHistory();

  API.validateToken().catch(() => history.push("/login"));

  function ShowSuccessToast(text: string): void {
    refC.current &&
      refC.current.success(text, "Success", {
        closeButton: true,
        timeOut: timeout,
      });
  }

  function ShowErrorToast(text: string): void {
    refC.current &&
      refC.current.error(text, "Error", {
        closeButton: true,
        timeOut: timeout,
      });
  }

  return (
    <>
      <Header />
      <Toaster>
        <ToastContainer
          ref={refC}
          toastMessageFactory={React.createFactory(ToastMessageAnimated)}
        />
      </Toaster>
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
          <Route path="/profile" exact={true}>
            <ProfilePage
              ShowErrorToast={ShowErrorToast}
              ShowSuccessToast={ShowSuccessToast}
            />
          </Route>
          <Route path="/leaderboard">
            <LeaderboardPage
              ShowErrorToast={ShowErrorToast}
              ShowSuccessToast={ShowSuccessToast}
            />
          </Route>
          <Route path="/network">
            <NetworkPage
              ShowErrorToast={ShowErrorToast}
              ShowSuccessToast={ShowSuccessToast}
            />
          </Route>
          <Route path="/profile/:userId">
            <ProfilePage
              ShowErrorToast={ShowErrorToast}
              ShowSuccessToast={ShowSuccessToast}
            />
          </Route>
          <Route path="/">
            {() => (API.id ? history.push("/profile") : history.push("/login"))}
          </Route>
        </Switch>
      </MainComp>
      <Footer />
    </>
  );
};
