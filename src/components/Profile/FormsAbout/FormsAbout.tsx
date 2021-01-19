import React, { useState } from "react";
import { Field } from "react-final-form";
import { Stl } from "./styles";

export const FormsAbout: React.FC<{
  placeholder: string;
  biography?: string;
}> = ({ placeholder, biography }) => {
  const [state, setState] = useState(false);
  return (
    <Field name="about" component="textarea" defaultValue={biography}>
      {({ input }) => (
        <div style={{ position: "relative" }}>
          <Stl.Label isFloating={state}>{placeholder}</Stl.Label>
          <Stl.AboutArea
            {...input}
            onBlur={() => setState(false)}
            onFocus={() => setState(true)}
          />
        </div>
      )}
    </Field>
  );
};
