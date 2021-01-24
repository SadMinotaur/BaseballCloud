import React, { useState } from "react";
import { Field } from "react-final-form";
import { Stl } from "./styles";

export const FormsAbout: React.FC<{
  placeholder: string;
  biography?: string;
}> = ({ placeholder, biography }) => {
  const [state, setState] = useState(biography !== undefined);
  return (
    <Field name="biography" defaultValue={biography}>
      {({ input }) => (
        <div style={{ position: "relative" }}>
          <Stl.Label isFloating={state}>{placeholder}</Stl.Label>
          <Stl.AboutArea
            {...input}
            onBlur={(v) => {
              input.onBlur(v);
              !input.value && setState(false);
            }}
            onFocus={(v) => {
              input.onFocus(v);
              setState(true);
            }}
          />
        </div>
      )}
    </Field>
  );
};
