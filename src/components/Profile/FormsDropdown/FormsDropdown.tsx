import React from "react";
import Dropdown from "react-dropdown";
import "./dropdown.css";

export const FormsDropdown: React.FC<{
  options: string[];
  placeholder: string;
}> = ({ options, placeholder }) => (
  <Dropdown
    className="profile-dropdown-main"
    menuClassName="profile-dropdown-menu"
    options={options}
    placeholder={placeholder}
    arrowOpen={<span className="profile-dropdown-arrow-open" />}
    arrowClosed={<span className="profile-dropdown-arrow-closed" />}
  />
);
