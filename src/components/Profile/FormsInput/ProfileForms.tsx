import React from "react";
import { Stl, MaterialStyles } from "./styles";

export const TextF: React.FC<{
  input: any;
  label: string;
}> = ({ input, label }) => {
  const mStyles = MaterialStyles();
  return (
    <Stl.TextF
      {...input}
      id="filled-basic"
      label={label}
      variant="filled"
      InputProps={{
        disableUnderline: true,
        className: mStyles.input,
      }}
      InputLabelProps={{
        className: mStyles.label,
      }}
    />
  );
};
