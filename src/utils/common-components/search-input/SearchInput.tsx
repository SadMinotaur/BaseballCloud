import React from "react";
import Search from "./../../../assets/search.svg";
import Stl from "./styles";

export const SearchInput: React.FC<{
  input?: any;
  placeholder: string;
  width: number;
}> = ({ placeholder, width, input }) => (
  <Stl.Border>
    <img src={Search} alt="search" />
    <Stl.PageInput {...input} width={width} placeholder={placeholder} />
  </Stl.Border>
);
