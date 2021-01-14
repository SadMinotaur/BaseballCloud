import React, { useState } from "react";
import Stl from "./styles";
import arrow from "./../../../assets/arrow.svg";

export const InputBlue: React.FC<{
  input: any;
  name: string;
  width: number;
  widthFocus: number;
  type?: string;
}> = ({ name, width, type, widthFocus, input }) => {
  const [arrowState, setArrowState] = useState<boolean>(false);
  return (
    <div>
      <Stl.PageInput
        {...input}
        width={width}
        widthFocus={widthFocus}
        placeholder={name}
        onFocus={() => setArrowState(true)}
        onBlur={() => setArrowState(false)}
      />
      <Stl.Arrow state={arrowState} src={arrow} alt="arrow" />
    </div>
  );
};
