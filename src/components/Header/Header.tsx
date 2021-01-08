import React, { useEffect, useState } from "react";
import {
  HeaderStyle,
  Icon,
  RightSide,
  Tabs,
  ProfileIcon,
  DropdownText,
} from "./styles";
import Logo from "./../../assets/logo.svg";
import PictureProf from "./../../assets/profileIcon.png";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
// import API from "../../grahql/api";

const LinksComp: React.FC<{ network?: boolean; leaderboard?: boolean }> = (
  p
) => {
  const nav = useHistory();
  // const [picture, setPicture] = useState();
  const [dropdownState, setDropdownState] = useState(false);

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
      <ProfileIcon src={PictureProf} onClick={() => nav.push("/profile")} />
      <Dropdown
        isOpen={dropdownState}
        toggle={() => setDropdownState((ps) => !ps)}
      >
        <DropdownToggle caret>Profile Name</DropdownToggle>
        <DropdownMenu>
          <DropdownText
            onClick={(v) => {
              nav.push("profile");
              setDropdownState((ps) => !ps);
            }}
          >
            My profile
          </DropdownText>
          <DropdownText>Log out</DropdownText>
        </DropdownMenu>
      </Dropdown>
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
