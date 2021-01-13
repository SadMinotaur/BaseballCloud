import React from "react";
import Dropdown from "react-dropdown";
import "./style.css";

export const DropdownLeaderboard: React.FC<{
  placeholder: string;
  options: string[];
  width: number;
}> = ({ placeholder, options, width }) => (
  <div style={{ width: width }}>
    <Dropdown
      placeholder={placeholder}
      className="leaderboard-dropdown-main"
      menuClassName="leaderboard-dropdown-menu"
      options={options}
      arrowOpen={<span className="leaderboard-dropdown-arrow-open" />}
      arrowClosed={<span className="leaderboard-dropdown-arrow-closed" />}
    />
  </div>
);
