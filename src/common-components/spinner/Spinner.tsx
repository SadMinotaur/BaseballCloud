import React from "react";
import Stl from "./styles";
import PulseLoader from "react-spinners/PulseLoader";

export const Spinner: React.FC<{ loading: true }> = (props) => (
  <Stl.Container>
    <PulseLoader color={"#e42020"} loading={props.loading} size={100} />
  </Stl.Container>
);
