import React, { useState } from "react";
import { Field } from "react-final-form";
import { Stl } from "./styles";

export const FormsAbout: React.FC<{
  placeholder: string;
  biography?: string;
}> = ({ placeholder, biography }) => {
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <Field name="biography" defaultValue={biography}>
      {({ input }) => (
        <div style={{ position: "relative" }}>
          <Stl.Label isFocused={focus} hasValue={input.value ? true : false}>
            {placeholder}
          </Stl.Label>
          <Stl.AboutArea
            {...input}
            onBlur={(v) => {
              input.onBlur(v);
              setFocus(false);
            }}
            onFocus={(v) => {
              input.onFocus(v);
              setFocus(true);
            }}
          />
        </div>
      )}
    </Field>
  );
};
