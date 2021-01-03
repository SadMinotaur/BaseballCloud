import React, { useEffect, useState } from "react";
import API from "../../../api";
import { Spinner } from "../../../common-components/spinner";
import { Queries } from "../graphql/query";
import { StatsBlock } from "../StatsBlock";
import { ProfileForms } from "./../ProfileForms";
import { Container } from "./styles";
import { YourAccount } from "./../YourAccount";
import { ProfileTotal } from "./../ProfileTotal";

export const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [profileStatus, setProfileStatus] = useState(false);

  useEffect(() => {
    API.graphqlPost(Queries.getUserInfo, {}).then((v) => {
      const profile = v.data.current_profile;
      if (profile.first_name === null) setProfileStatus(true);
      setLoading(false);
    });
    return () => {};
  }, []);

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <Container>
          {profileStatus ? (
            <>
              <ProfileForms />
              <YourAccount />
            </>
          ) : (
            <>
              <ProfileTotal />
              <StatsBlock />
            </>
          )}
        </Container>
      )}
    </>
  );
};
