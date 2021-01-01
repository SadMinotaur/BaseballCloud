import React from "react";
import { StatsBlock } from "../StatsBlock";
import { ProfileForms } from "./../ProfileForms";
import { Container } from "./styles";

export const Page: React.FC = () => {
  return (
    <Container>
      <ProfileForms />
      <StatsBlock />
    </Container>
  );
};
