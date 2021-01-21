import React from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { Stl } from "./styles";
import { components } from "react-select";
import { Field } from "react-final-form";
import { Options } from "../../../utils/types/profile";

const Control: React.FC = (props: any) => (
  <>
    <Stl.Label isFloating={props.isFocused || props.hasValue}>
      {props.selectProps.placeholder}
    </Stl.Label>
    <components.Control {...props} />
  </>
);

export const FormsDropdown: React.FC<{
  validate: (v: any) => undefined | string;
  defaultValue: Options | undefined;
  placeholder: string;
  name: string;
  loadOptions?: () => Promise<any>;
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
}) => (
  <Field
    name={name}
    validate={validate}
    defaultValue={multiple ? [defaultValue] : defaultValue}
  >
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
