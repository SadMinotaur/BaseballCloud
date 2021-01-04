import React, { useEffect, useState } from "react";
import { HeaderStyle, Icon, RightSide, Tabs, ProfileIcon } from "./styles";
import Logo from "./../../assets/logo.svg";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import API from "../../api";

const LinksComp: React.FC<{ network?: boolean; leaderboard?: boolean }> = (
  p
) => {
  const nav = useHistory();
  const [picture, setPicture] = useState("");

  useEffect(() => {
    // API.getPicture().then((v) => {});
    return () => {};
  }, []);
  return (
    <RightSide>
      <Tabs state={p.leaderboard}>
        <Link
          style={{
            color: "rgb(120, 139, 153)",
            textDecoration: "none",
          }}
          to="/leaderboard"
        >
          Leaderboard
        </Link>
      </Tabs>
      <Tabs state={p.network}>
        <Link
          style={{
            color: "rgb(120, 139, 153)",
            textDecoration: "none",
          }}
          to="/network"
        >
          Network
        </Link>
      </Tabs>
      <ProfileIcon src={picture} onClick={() => nav.push("/profile")} />
    </RightSide>
  );
};

export const Header: React.FC = () => {
  const nav = useHistory();
  return (
    <HeaderStyle>
      <Icon src={Logo} alt="Logo" onClick={() => nav.push("/")} />
      <Switch>
        <Route path="/login" />
        <Route path="/profile">
          <LinksComp />
        </Route>
        <Route path="/network">
          <LinksComp network={true} />
        </Route>
        <Route path="/leaderboard">
          <LinksComp leaderboard={true} />
        </Route>
      </Switch>
    </HeaderStyle>
  );
};
