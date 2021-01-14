import React, { useEffect, useState } from "react";
import { Spinner } from "../../../utils/common-components/spinner";
import { Queries } from "../graphql/query";
import { StatsBlock } from "../StatsBlock";
import { ProfileForms } from "./../ProfileForms";
import { Container } from "./styles";
import { YourAccount } from "./../YourAccount";
import { ProfileTotal } from "./../ProfileTotal";
import { useParams } from "react-router-dom";
import { GraphqlProfile } from "../../../utils/profile-types/Profile";
import API from "../../../utils/api";

export const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profileStatus, setProfileStatus] = useState<boolean>(false);
  const [profile, setProfile] = useState<GraphqlProfile>();
  const [editState, setEditState] = useState<boolean>(false);

  const { userId } = useParams<Record<string, string | undefined>>();

  useEffect(() => {
    API.graphqlPost(Queries.getCurrentUserInfo, {}).then((v) =>
      API.graphqlPost(Queries.getUserInfo, {
        id: userId ? userId.toString() : v.data.current_profile.id,
      })
        .then((v) => {
          const pr = v.data.profile;
          setProfile(pr);
          if (pr.first_name !== null) setProfileStatus(true);
          setLoading(false);
        })
        .catch(() => setLoading(false))
    );
    return () => {};
  }, [userId]);

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <Container>
          {!profileStatus ? (
            <>
              <ProfileForms />
              <YourAccount />
            </>
          ) : (
            <>
              {editState ? (
                <>
                  <ProfileForms />
                  <StatsBlock />
                </>
              ) : userId ? (
                <>
                  <ProfileTotal info={profile as GraphqlProfile} />
                  <StatsBlock />
                </>
              ) : (
                <>
                  <ProfileTotal
                    info={profile as GraphqlProfile}
                    onEditPress={() => setEditState(true)}
                  />
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
