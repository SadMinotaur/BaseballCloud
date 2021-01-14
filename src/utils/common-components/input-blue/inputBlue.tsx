import React, { useState } from "react";
import Stl from "./styles";
import arrow from "./../../../assets/arrow.svg";

export const InputBlue: React.FC<{
  name: string;
  width: number;
  widthFocus: number;
  onChange: () => void;
}> = ({ name, width, onChange, widthFocus }) => {
  const [arrowState, setArrowState] = useState<boolean>(false);
  return (
    <div>
      <Stl.PageInput
        width={width}
        widthFocus={widthFocus}
        placeholder={name}
        onFocus={() => setArrowState(true)}
        onChange={() => onChange()}
        onBlur={() => setArrowState(false)}
      />
      <Stl.Arrow state={arrowState} src={arrow} alt="arrow" />
    </div>
  );
};
