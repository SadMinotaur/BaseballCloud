import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { Stl } from "./styles";
import { components } from "react-select";
import { Field } from "react-final-form";

type Options = { label: string; value: any };

const Control: React.FC = (props: any) => (
  <>
    <Stl.Label isFloating={props.isFocused || props.hasValue}>
      {props.selectProps.placeholder}
    </Stl.Label>
    <components.Control {...props} />
  </>
);

export const FormsDropdown: React.FC<{
  options?: { value: string; label: string }[];
  defaultValue: Options | undefined;
  loadOptions?: Promise<any>;
  multiple?: boolean;
  placeholder: string;
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
}) => {
  // Used to prevent infinite re render
  const [state, setstate] = useState(multiple ? [defaultValue] : defaultValue);
  return (
    <>
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
                loadOptions={() => loadOptions?.then((v) => v)}
                components={{ Control }}
              />
            )}
            {meta.error && meta.touched && (
              <Stl.WarningText>{meta.error}</Stl.WarningText>
            )}
          </Stl.Margin>
        )}
      </Field>
    </>
  );
};
