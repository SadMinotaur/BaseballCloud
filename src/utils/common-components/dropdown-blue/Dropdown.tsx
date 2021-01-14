import React from "react";
import Dropdown from "react-dropdown";
import "./style.css";

export const DropdownBlue: React.FC<{
  input: any;
  options: { value: string; label: string }[];
  width: number;
}> = ({ options, width, input }) => (
  <div style={{ width: width }}>
    <Dropdown
      {...input}
      onChange={(p) => input.onChange(p.value)}
      className="leaderboard-dropdown-main"
      menuClassName="leaderboard-dropdown-menu"
      arrowOpen={<span className="leaderboard-dropdown-arrow-open" />}
      arrowClosed={<span className="leaderboard-dropdown-arrow-closed" />}
      options={options}
      placeholder={options[0].label}
    />
  </div>
);
