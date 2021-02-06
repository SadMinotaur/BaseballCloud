import React from "react";
import Stl from "./styles";
import Search from "./../../assets/search.svg";

export const SearchInput: React.FC<{
  placeholder: string;
  width: number;
  widthFocused: number;
  value: string;
  onChange: (v: string) => void;
  setNames: (v: []) => void;
}> = ({ placeholder, width, widthFocused, onChange, value, setNames }) => (
  <>
    <Stl.PageInput
      width={width}
      widthFocus={widthFocused}
      placeholder={placeholder}
      value={value}
      onBlur={() =>
        // Blur blocks items onClick
        setTimeout(() => {
          setNames([]);
        }, 1000)
      }
      onChange={(v) => onChange(v.target.value)}
    />
    <img src={Search} alt="Search" />
  </>
);
