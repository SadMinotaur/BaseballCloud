import React, { useEffect, useState } from "react";
import { Spinner } from "../../../utils/common-components/spinner";
import { Graphql } from "../graphql/query";
import { StatsBlock } from "../StatsBlock";
import { ProfileForms } from "./../ProfileForms";
import { Container } from "./styles";
import { YourAccount } from "./../YourAccount";
import { ProfileTotal } from "./../ProfileTotal";
import { useParams } from "react-router-dom";
import { GraphqlProfile } from "../../../utils/types/profile";
import API from "../../../utils/api";

export const ProfilePage: React.FC<{
  ShowErrorToast: (text: string) => void;
  ShowSuccessToast: (text: string) => void;
}> = ({ ShowErrorToast, ShowSuccessToast }) => {
  const [profileStatus, setProfileStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<GraphqlProfile>();
  const [editState, setEditState] = useState<boolean>(false);

  const { userId } = useParams<Record<string, string | undefined>>();

  function onEditEnd(profile: GraphqlProfile): void {
    setProfile(profile);
    setEditState(false);
  }

  useEffect(() => {
    API.graphqlPost(Graphql.getCurrentUserInfo, {}).then(
      (v: { current_profile: { id: number } }) =>
        API.graphqlPost(Graphql.getUserInfo, {
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
          {profileStatus ? (
            <>
              {profile &&
                (editState ? (
                  <>
                    <ProfileForms
                      ShowSuccessToast={ShowSuccessToast}
                      ShowErrorToast={ShowErrorToast}
                      info={profile}
                      onEditEnd={onEditEnd}
                    />
                    <StatsBlock info={profile} />
                  </>
                ) : userId ? (
                  <>
                    <ProfileTotal info={profile} />
                    <StatsBlock info={profile} />
                  </>
                ) : (
                  <>
                    <ProfileTotal
                      info={profile}
                      onEditPress={() => setEditState(true)}
                    />
                    <StatsBlock info={profile} />
                  </>
                ))}
            </>
          ) : (
            <>
              <ProfileForms
                ShowSuccessToast={ShowSuccessToast}
                ShowErrorToast={ShowErrorToast}
                onEditEnd={onEditEnd}
              />
              <YourAccount />
            </>
          )}
        </Container>
      )}
    </>
  );
};
