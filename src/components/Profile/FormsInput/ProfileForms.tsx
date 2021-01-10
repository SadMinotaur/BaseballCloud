import React from "react";
import { Stl, MaterialStyles } from "./styles";

export const TextF: React.FC<{
  input: any;
  label: string;
  moved?: boolean;
}> = ({ input, label, moved }) => {
  const mStyles = MaterialStyles();
  // Ugly solution
  return (
    <>
      {moved ? (
        <Stl.TextFMarg
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
      ) : (
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
      )}
    </>
  );
};
