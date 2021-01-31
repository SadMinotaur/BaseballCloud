import { styled as sc } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import styledComponentsTS from "styled-components-ts";
import styled from "styled-components";

export const Stl = {
  TextF: sc(TextField)({
    width: "100%",
  }),
};

export const DropdownSpacing = styledComponentsTS<{ leftMargin: boolean }>(
  styled.div
)`
  margin: 0 0 0  ${(p) => p.leftMargin && "10"}px;
  width: 100%;
`;

export const WarningText = styled.p`
  color: #f05f62;
  font-size: 1.6rem;
`;

export const MaterialStyles = makeStyles({
  input: {
    margin: "0 0 10px 0",
    padding: "0  0 7px 0",
    height: 40,
    borderRadius: 4,
    backgroundColor: "#eff1f3",
    color: "#667784",
    fontWeight: 400,
    border: "1px solid transparent",
    fontSize: 14,
    "&:hover": {
      backgroundColor: "#fff",
      border: "1px solid rgba(72, 187, 255, 0.8);",
    },
    "&:focus": {
      backgroundColor: "#fff",
      border: "1px solid rgba(72, 187, 255, 0.8);",
    },
  },
  label: {
    color: "#667784",
    margin: "-7px 0 0 0",
    fontSize: 14,
    transition: "0.2s ease all",
  },
});
