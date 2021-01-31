import React, { useState } from "react";
import { Stl } from "./styles";
import { components } from "react-select";
import { Field } from "react-final-form";
import { Options } from "../../../utils/types/profile";
import AsyncSelect from "react-select/async";
import Select from "react-select";

const Control: React.FC = (props: any) => (
  <>
    <Stl.Label isFocused={props.isFocused} hasValue={props.hasValue}>
      {props.selectProps.placeholder}
    </Stl.Label>
    <components.Control {...props} />
  </>
);

export const FormsDropdown: React.FC<{
  placeholder: string;
  name: string;
  defaultValue: Options | Options[] | undefined;
  loadOptions?: () => Promise<any>;
  validate: (v: any) => undefined | string;
  options?: { value: string; label: string }[];
  multiple?: boolean;
}> = ({
  options,
  loadOptions,
  placeholder,
  multiple,
  defaultValue,
  validate,
  name,
}) => {
  //Used to prevent infinite re render
  const [state] = useState(
    multiple
      ? Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue]
      : defaultValue
  );
  return (
    <Field name={name} validate={validate} defaultValue={state}>
      {({ input, meta }) => (
        <Stl.Margin>
          {options ? (
            <Select
              {...input}
              key={placeholder}
              theme={Stl.DropdownTheme}
              styles={Stl.Styles}
              options={options}
              placeholder={placeholder}
              components={{ Control }}
            />
          ) : (
            <AsyncSelect
              {...input}
              key={placeholder}
              isMulti={multiple}
              placeholder={placeholder}
              theme={Stl.DropdownTheme}
              styles={Stl.Styles}
              defaultOptions
              cacheOptions
              loadOptions={(inputValue, callback) => {
                loadOptions?.call(this).then((v) => {
                  callback(v);
                });
              }}
              components={{ Control }}
            />
          )}
          {meta.error && meta.touched && (
            <Stl.WarningText>{meta.error}</Stl.WarningText>
          )}
        </Stl.Margin>
      )}
    </Field>
  );
};
