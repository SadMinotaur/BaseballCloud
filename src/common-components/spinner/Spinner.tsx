import React from "react";
import Stl from "./styles";
import PulseLoader from "react-spinners/PulseLoader";

export const Spinner: React.FC<{ loading: boolean; size?: number }> = ({
  loading,
  size,
}) => (
  <Stl.Container>
    <PulseLoader color={"#48bbff"} loading={loading} size={size ? size : 15} />
  </Stl.Container>
);
