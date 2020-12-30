import React from "react";
import { HeaderStyle, Icon, RightSide, Tabs, ProfileIcon } from "./styles";
import Logo from "./../../assets/logo.svg";
import IconProfile from "./../../assets/profileIcon.png";
import Switch from "react-bootstrap/esm/Switch";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const LinksComp: React.FC<{ network?: boolean; leaderboard?: boolean }> = (
  p
) => {
  const nav = useHistory();
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
      <ProfileIcon src={IconProfile} onClick={() => nav.push("/profile")} />
      <Link to="/profile">Profile</Link>
    </RightSide>
  );
};

export const Header: React.FC = () => (
  <HeaderStyle>
    <Icon src={Logo} alt="Logo" />
    <Switch>
      <Route path="/login"></Route>
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
