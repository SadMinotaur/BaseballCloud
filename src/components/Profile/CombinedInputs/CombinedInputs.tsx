import React, { useState } from "react";
import { Field } from "react-final-form";
import {
  Stl,
  MaterialStyles,
  Row,
  DropdownSpacing,
  WarningText,
} from "../../../utils/common-styles/input-styles";

export const CombinedInputs: React.FC<{
  nameFirst: string;
  nameSecond: string;
  labelFirst: string;
  labelSecond: string;
  defaultValueFirst: string;
  defaultValueSecond: string;
  validateFirst: (v: string) => string | undefined;
  validateSecond: (v: string) => string | undefined;
  type: string;
}> = ({
  nameFirst,
  nameSecond,
  labelFirst,
  labelSecond,
  defaultValueFirst,
  defaultValueSecond,
  validateFirst,
  validateSecond,
  type,
}) => {
  const mStyles = MaterialStyles();
  const [stateFirst, setFirstState] = useState<boolean>(true);
  const [stateSecond, setSecondState] = useState<boolean>(true);
  return (
    <Field
      name={nameFirst}
      validate={validateFirst}
      defaultValue={defaultValueFirst}
      type={type}
    >
      {({ input, meta }) => (
        <Field
          name={nameSecond}
          validate={validateSecond}
          defaultValue={defaultValueSecond}
          type={type}
        >
          {(i) => (
            <>
              <Row>
                <Stl.TextF
                  {...input}
                  id="filled-basic"
                  label={labelFirst}
                  variant="filled"
                  onFocus={() => setFirstState(false)}
                  onBlur={() => setFirstState(true)}
                  InputProps={{
                    disableUnderline: true,
                    className: mStyles.input,
                  }}
                  InputLabelProps={{
                    className: mStyles.label,
                    style: {
                      visibility:
                        input.value && stateFirst ? "hidden" : "visible",
                    },
                  }}
                />
                <DropdownSpacing leftMargin={true}>
                  <Stl.TextF
                    {...i.input}
                    id="filled-basic"
                    label={labelSecond}
                    variant="filled"
                    onFocus={() => setSecondState(false)}
                    onBlur={() => setSecondState(true)}
                    InputProps={{
                      disableUnderline: true,
                      className: mStyles.input,
                    }}
                    InputLabelProps={{
                      className: mStyles.label,
                      style: {
                        visibility:
                          input.value && stateSecond ? "hidden" : "visible",
                      },
                    }}
                  />
                </DropdownSpacing>
              </Row>
              {meta.error && meta.touched && (
                <WarningText>{meta.error}</WarningText>
              )}
              {i.meta.error && i.meta.touched && (
                <WarningText>{i.meta.error}</WarningText>
              )}
            </>
          )}
        </Field>
      )}
    </Field>
  );
};
