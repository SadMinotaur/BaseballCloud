import React from "react";
import Stl from "./styles";
import Search from "./../../../assets/search.svg";

export const SearchInput: React.FC<{
  placeholder: string;
  width: number;
  widthFocused: number;
  onChange: () => void;
}> = ({ placeholder, width, widthFocused, onChange }) => {
  return (
    <>
      <Stl.PageInput
        width={width}
        widthFocus={widthFocused}
        placeholder={placeholder}
        onChange={onChange}
      />
      <img src={Search} alt="Search" />
    </>
  );
};
