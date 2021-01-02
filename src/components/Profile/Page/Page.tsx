import React, { useEffect, useState } from "react";
import API from "../../../api";
import { Queries } from "../graphql/query";
import { StatsBlock } from "../StatsBlock";
import { ProfileForms } from "./../ProfileForms";
import { Container } from "./styles";

export const ProfilePage: React.FC = () => {
  const [profileStatus, setProfileStatus] = useState(false);

  useEffect(() => {
    // API.graphqlPost(Queries.getUserInfo, {});
    return () => {};
  }, []);

  return (
    <Container>
      <ProfileForms />
      {profileStatus && <StatsBlock />}
    </Container>
  );
};
