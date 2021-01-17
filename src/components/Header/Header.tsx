import React, { useEffect, useState } from "react";
import {
  HeaderStyle,
  Icon,
  RightSide,
  Tabs,
  ProfileIcon,
  DropdownText,
  DropStyle,
} from "./styles";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Queries } from "./graphql/query";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { GetCurrentUserInfo } from "./../../utils/types/header";
import Logo from "./../../assets/logo.svg";
import PictureProf from "./../../assets/profileIcon.png";
import API from "../../utils/api";

const LinksComp: React.FC<{ network?: boolean; leaderboard?: boolean }> = (
  p
) => {
  const nav = useHistory();
  const [picture, setPicture] = useState<string>();
  const [dropdownState, setDropdownState] = useState<boolean>(false);
  const [profileName, setProfileName] = useState<string>();

  useEffect(() => {
    API.graphqlPost(Queries.getCurrentUserInfo, {}).then(
      (v: GetCurrentUserInfo) => {
        const avatarAddress = v.current_profile.avatar;
        setProfileName(
          `${v.current_profile.first_name} ${v.current_profile.last_name}`
        );
        avatarAddress &&
          API.getPicture(avatarAddress).then((v) => setPicture(v));
      }
    );
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
      <ProfileIcon
        src={picture ? `data:image/jpeg;base64,${picture}` : PictureProf}
        onClick={() => nav.push("/profile")}
      />
      <Dropdown
        isOpen={dropdownState}
        toggle={() => setDropdownState((ps) => !ps)}
      >
        <DropdownToggle style={DropStyle}>
          {profileName ? profileName : "Profile Name"}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownText
            onClick={(v) => {
              nav.push("/profile");
              setDropdownState((ps) => !ps);
            }}
          >
            My profile
          </DropdownText>
          <DropdownText
            onClick={(v) => {
              API.logout().then(() => nav.push("/login"));
              setDropdownState((ps) => !ps);
            }}
          >
            Log out
          </DropdownText>
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
