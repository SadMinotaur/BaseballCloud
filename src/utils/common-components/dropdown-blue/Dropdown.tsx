import React from "react";
import Dropdown from "react-dropdown";
import "./style.css";

export const DropdownBlue: React.FC<{
  input: any;
  placeholder: string;
  options: { value: string; label: string }[];
  width: number;
}> = ({ placeholder, options, width, input }) => (
  <div style={{ width: width }}>
    <Dropdown
      {...input}
      onChange={(p) => input.onChange(p.value)}
      placeholder={placeholder}
      className="leaderboard-dropdown-main"
      menuClassName="leaderboard-dropdown-menu"
      options={options}
      arrowOpen={<span className="leaderboard-dropdown-arrow-open" />}
      arrowClosed={<span className="leaderboard-dropdown-arrow-closed" />}
    />
  </div>
);
