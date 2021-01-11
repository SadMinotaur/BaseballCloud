import React from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { Stl } from "./styles";

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
      />
    )}
  </Stl.Margin>
);
