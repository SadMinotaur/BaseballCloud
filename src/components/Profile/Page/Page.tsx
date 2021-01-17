import React, { useEffect, useState } from "react";
import { Spinner } from "../../../utils/common-components/spinner";
import { Queries } from "../graphql/query";
import { StatsBlock } from "../StatsBlock";
import { ProfileForms } from "./../ProfileForms";
import { Container } from "./styles";
import { YourAccount } from "./../YourAccount";
import { ProfileTotal } from "./../ProfileTotal";
import { useParams } from "react-router-dom";
import { GraphqlProfile } from "../../../utils/types/profile";
import API from "../../../utils/api";

export const ProfilePage: React.FC = () => {
  const [profileStatus, setProfileStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<GraphqlProfile>();
  const [editState, setEditState] = useState<boolean>(false);

  const { userId } = useParams<Record<string, string | undefined>>();

  useEffect(() => {
    API.graphqlPost(Queries.getCurrentUserInfo, {}).then(
      (v: { current_profile: { id: number } }) =>
        API.graphqlPost(Queries.getUserInfo, {
          id: userId ? userId.toString() : v.current_profile.id,
        })
          .then((v: { profile: GraphqlProfile }) => {
            const pr = v.profile;
            setProfile(pr);
            if (pr.first_name !== null) setProfileStatus(true);
            setLoading(false);
          })
          .catch(() => setLoading(false))
    );
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
              ) : userId && profile ? (
                <>
                  <ProfileTotal info={profile} />
                  <StatsBlock id={profile.id} />
                </>
              ) : (
                profile && (
                  <>
                    <ProfileTotal
                      info={profile}
                      onEditPress={() => setEditState(true)}
                    />
                    <StatsBlock id={profile.id} />
                  </>
                )
              )}
            </>
          )}
        </Container>
      )}
    </>
  );
};
