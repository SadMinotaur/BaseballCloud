import React, { useState } from "react";
import { StatsBlock } from "../StatsBlock";
import { ProfileForms } from "./../ProfileForms";
import { Container } from "./styles";

export const Page: React.FC = () => {
  const [profileStatus, setProfileStatus] = useState(false);

  return (
    <Container>
      <ProfileForms />
      {profileStatus && <StatsBlock />}
    </Container>
  );
};
