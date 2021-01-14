import React, { useState } from "react";
import { Stl } from "./styles";

export const FormsAbout: React.FC<{ placeholder: string; input: any }> = ({
  input,
  placeholder,
}) => {
  const [state, setState] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <Stl.Label isFloating={state}>{placeholder}</Stl.Label>
      <Stl.AboutArea
        {...input}
        onBlur={() => setState(false)}
        onFocus={() => setState(true)}
      />
    </div>
  );
};
