import { styled } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

export const Stl = {
  TextF: styled(TextField)({
    width: "100%",
  }),
  TextFMarg: styled(TextField)({
    width: "95%",
  }),
};

export const MaterialStyles = makeStyles({
  input: {
    margin: "0 0 10px 0",
    padding: "0 0 15px 0",
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
    "&:active": {
      backgroundColor: "#fff",
      border: "1px solid rgba(72, 187, 255, 0.8);",
    },
  },
  label: {
    color: "#667784",
    margin: "-3px 0 0 0",
    fontSize: 14,
  },
});
