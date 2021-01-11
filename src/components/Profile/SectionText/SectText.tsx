import React from "react";
import { Styles } from "./styles";

export const SectText: React.FC<{ text: string }> = ({ text }) => (
  <Styles.Row>
    <Styles.SectionText>{text}</Styles.SectionText>
    <Styles.Line />
  </Styles.Row>
);
