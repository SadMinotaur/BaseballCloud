import React, { useEffect, useState } from "react";
import API from "../../../grahql/api";
import { Spinner } from "../../../common-components/spinner";
import { Queries } from "../graphql/query";
import { StatsBlock } from "../StatsBlock";
import { ProfileForms } from "./../ProfileForms";
import { Container } from "./styles";
import { YourAccount } from "./../YourAccount";
import { ProfileTotal } from "./../ProfileTotal";
import { useParams } from "react-router-dom";
import { GraphqlProfile } from "./../common-types/Profile";

export const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profileStatus, setProfileStatus] = useState<boolean>(false);
  const [profile, setProfile] = useState<GraphqlProfile>();
  const [editState, setEditState] = useState<boolean>(false);

  const { userId } = useParams<Record<string, string | undefined>>();

  useEffect(() => {
    API.graphqlPost(Queries.getUserInfo, {
      id: userId ? userId.toString() : API.id.toString(),
    })
      .then((v) => {
        const pr = v.data.profile;
        setProfile(pr);
        if (pr.first_name == null) setProfileStatus(true);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => {};
  }, [userId]);

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
              {editState ? (
                <ProfileForms />
              ) : API.id.toString() === profile?.id ? (
                <>
                  <ProfileTotal
                    info={profile as GraphqlProfile}
                    onEditPress={() => setEditState(true)}
                  />
                  <StatsBlock />
                </>
              ) : (
                <>
                  <ProfileTotal info={profile as GraphqlProfile} />
                  <StatsBlock />
                </>
              )}
            </>
          )}
        </Container>
      )}
    </>
  );
};
