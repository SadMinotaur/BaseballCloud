import React from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { Stl } from "./styles";
import { components } from "react-select";
import { Field } from "react-final-form";

const Control: React.FC = (props: any) => (
  <>
    <Stl.Label isFloating={props.isFocused || props.hasValue}>
      {props.selectProps.placeholder}
    </Stl.Label>
    <components.Control {...props} />
  </>
);

export const FormsDropdown: React.FC<{
  loadOptions?: Promise<any>;
  options?: { value: string; label: string }[];
  multiple?: boolean;
  placeholder: string;
  defaultValue: any;
  name: string;
  validate: (v: any) => undefined | string;
}> = ({
  options,
  loadOptions,
  placeholder,
  multiple,
  defaultValue,
  validate,
  name,
}) => (
  <Field name={name} validate={validate} defaultValue={defaultValue}>
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
            onChange={(v) => {
              input.onChange(v?.value);
            }}
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
            loadOptions={async () => loadOptions && loadOptions.then((v) => v)}
            onChange={(v) => {
              input.onChange(v?.value);
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
