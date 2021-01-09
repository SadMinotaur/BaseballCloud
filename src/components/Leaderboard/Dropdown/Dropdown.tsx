import React from "react";
import Dropdown from "react-dropdown";
import "./style.css";

export const DropdownLeaderboard: React.FC<{
  value: string;
  options: string[];
  onChange: () => void;
}> = ({ onChange, value, options }) => {
  return (
    <div>
      <Dropdown
        className="leaderboard-dropdown-main"
        menuClassName="leaderboard-dropdown-menu"
        options={options}
        value={value}
        arrowOpen={<span className="leaderboard-dropdown-arrow-open" />}
        arrowClosed={<span className="leaderboard-dropdown-arrow-closed" />}
        onChange={onChange}
      />
    </div>
  );
};
