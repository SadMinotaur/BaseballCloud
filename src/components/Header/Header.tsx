import React from "react";
import { HeaderStyle, Icon } from "./styles";
import Logo from "./../../assets/logo.svg";

export const Header: React.FC = () => (
  <HeaderStyle>
    <Icon src={Logo} alt="Logo" />
  </HeaderStyle>
);
