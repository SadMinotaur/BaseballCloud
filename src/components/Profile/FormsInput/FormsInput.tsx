import React, { useState } from "react";
import { Field } from "react-final-form";
import { Stl, MaterialStyles } from "../../../common-styles/input-styles";
import {
  DropdownSpacing,
  WarningText,
} from "../../../common-styles/input-styles";

export const TextF: React.FC<{
  name: string;
  label: string;
  defaultValue?: string;
  validate: (v: string) => string | undefined;
  space?: boolean;
  type?: string;
}> = ({ name, label, validate, space, type, defaultValue }) => {
  const mStyles = MaterialStyles();
  const [state, setState] = useState<boolean>(true);
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
            onFocus={() => setState(false)}
            onBlur={() => setState(true)}
            InputProps={{
              disableUnderline: true,
              className: mStyles.input,
            }}
            InputLabelProps={{
              className: mStyles.label,
              style: {
                visibility: input.value && state ? "hidden" : "visible",
              },
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
