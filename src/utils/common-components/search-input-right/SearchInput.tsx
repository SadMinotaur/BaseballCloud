import React from "react";
import Stl from "./styles";
import Search from "./../../../assets/search.svg";

export const SearchInput: React.FC<{
  placeholder: string;
  width: number;
  widthFocused: number;
}> = ({ placeholder, width, widthFocused }) => {
  return (
    <>
      <Stl.PageInput
        width={width}
        widthFocus={widthFocused}
        placeholder={placeholder}
      />
      <img src={Search} alt="Search" />
    </>
  );
};
