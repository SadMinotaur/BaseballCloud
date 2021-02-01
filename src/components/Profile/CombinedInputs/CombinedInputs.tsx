import React, { useState } from "react";
import { useField } from "react-final-form";
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

  const first = useField(nameFirst, {
    validate: validateFirst,
    defaultValue: defaultValueFirst,
    type: type,
  });

  const second = useField(nameSecond, {
    validate: validateSecond,
    defaultValue: defaultValueSecond,
    type: type,
  });

  return (
    <>
      <Row>
        <Stl.TextF
          {...first.input}
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
                first.input.value && stateFirst ? "hidden" : "visible",
            },
          }}
        />
        <DropdownSpacing leftMargin={true}>
          <Stl.TextF
            {...second.input}
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
                  second.input.value && stateSecond ? "hidden" : "visible",
              },
            }}
          />
        </DropdownSpacing>
      </Row>
      {first.meta.error && first.meta.touched && (
        <WarningText>{first.meta.error}</WarningText>
      )}
      {second.meta.error && second.meta.touched && (
        <WarningText>{second.meta.error}</WarningText>
      )}
    </>
  );
};
