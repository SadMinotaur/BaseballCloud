import React, { useState } from "react";
import Stl from "./styles";
import arrow from "./../../../assets/arrow.svg";

export const PageInput: React.FC<{
  name: string;
  width: number;
  onChange: () => void;
}> = ({ name, width, onChange }) => {
  const [arrowState, setArrowState] = useState(false);
  return (
    <div>
      <Stl.PageInput
        width={width}
        placeholder={name}
        onFocus={() => setArrowState(true)}
        onChange={() => {
          onChange();
        }}
        onBlur={() => setArrowState(false)}
      />
      <Stl.Arrow state={arrowState} src={arrow} alt="arrow" />
    </div>
  );
};
