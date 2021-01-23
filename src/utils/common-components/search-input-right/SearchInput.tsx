import React from "react";
import Stl from "./styles";
import Search from "./../../../assets/search.svg";

export const SearchInput: React.FC<{
  placeholder: string;
  width: number;
  widthFocused: number;
  onChange: (v: string) => void;
  setNames: (v: []) => void;
}> = ({ placeholder, width, widthFocused, onChange, setNames }) => (
  <>
    <Stl.PageInput
      width={width}
      widthFocus={widthFocused}
      placeholder={placeholder}
      onBlur={() => setNames([])}
      onChange={(v) => onChange(v.target.value)}
    />
    <img src={Search} alt="Search" />
  </>
);
