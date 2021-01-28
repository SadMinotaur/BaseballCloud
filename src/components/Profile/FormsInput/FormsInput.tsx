import React from "react";
import { Field } from "react-final-form";
import { Stl, MaterialStyles } from "./styles";
import { DropdownSpacing, WarningText } from "./styles";

export const TextF: React.FC<{
  name: string;
  label: string;
  defaultValue?: string;
  validate: (v: string) => string | undefined;
  space?: boolean;
  type?: string;
}> = ({ name, label, validate, space, type, defaultValue }) => {
  const mStyles = MaterialStyles();
  return (
    <Field
      name={name}
      validate={validate}
      defaultValue={defaultValue}
      type={type}
    >
      {({ input, meta }) => (
        <DropdownSpacing leftMargin={space}>
          <Stl.TextF
            key={name}
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
          {meta.error && meta.touched && (
            <WarningText>{meta.error}</WarningText>
          )}
        </DropdownSpacing>
      )}
    </Field>
  );
};
