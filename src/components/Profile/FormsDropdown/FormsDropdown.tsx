import React from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { Stl } from "./styles";
import { components } from "react-select";

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
  loadOptions?: Promise<any>;
  multiple?: boolean;
  placeholder: string;
  input: any;
  onInputChange: () => void;
}> = ({
  options,
  loadOptions,
  onInputChange,
  placeholder,
  multiple,
  input,
}) => (
  <Stl.Margin>
    {options ? (
      <Select
        {...input}
        theme={Stl.DropdownTheme}
        styles={Stl.Styles}
        onInputChange={onInputChange}
        options={options}
        placeholder={placeholder}
        components={{ Control }}
      />
    ) : (
      <AsyncSelect
        {...input}
        isMulti={multiple}
        theme={Stl.DropdownTheme}
        styles={Stl.Styles}
        defaultOptions
        cacheOptions
        loadOptions={async () => loadOptions && loadOptions.then((v) => v)}
        onInputChange={onInputChange}
        options={options}
        placeholder={placeholder}
        components={{ Control }}
      />
    )}
  </Stl.Margin>
);
// https://github.com/JedWatson/react-select/issues/4221#issuecomment-700617916
