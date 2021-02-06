import React from "react";
import { Styles } from "./styles";

export const SectText: React.FC<{ text: string; textSize?: number }> = ({
  text,
  textSize,
}) => (
  <Styles.Row>
    <Styles.SectionText textSize={textSize}>{text}</Styles.SectionText>
    <Styles.Line />
  </Styles.Row>
);
