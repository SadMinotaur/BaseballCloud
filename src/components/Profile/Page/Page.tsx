import React, { useEffect, useState } from "react";
import { Spinner } from "../../../common-components/spinner";
import { Graphql } from "../graphql/query";
import { StatsBlock } from "../StatsBlock";
import { ProfileForms } from "./../ProfileForms";
import { CommonGraphql } from "./../../../utils/common-query";
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
  const { userId } = useParams<Record<string, string | undefined>>();

  const [profileStatus, setProfileStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<GraphqlProfile>();
  const [editState, setEditState] = useState<boolean>(false);

  function onEditEnd(profile: GraphqlProfile): void {
    setEditState(false);
    setProfileStatus(true);
    setProfile(profile);
  }

  useEffect(() => {
    API.graphqlPost(CommonGraphql.getCurrentUserInfo, {}).then(
      (v: { current_profile: { id: number } }) =>
        API.graphqlPost(Graphql.getUserInfo, {
          id: userId ? userId.toString() : v.current_profile.id,
        })
          .then((v: { profile: GraphqlProfile }) => {
            const pr = v.profile;
            setProfile(pr);
            if (pr.first_name) {
              setProfileStatus(true);
            }
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
          {profile &&
            (profileStatus ? (
              editState ? (
                <>
                  <ProfileForms
                    ShowSuccessToast={ShowSuccessToast}
                    ShowErrorToast={ShowErrorToast}
                    info={profile}
                    onEditEnd={onEditEnd}
                    onCancel={() => setEditState(false)}
                  />
                  <StatsBlock info={profile} />
                </>
              ) : (
                <>
                  {userId ? (
                    <ProfileTotal
                      ShowSuccessToast={ShowSuccessToast}
                      ShowErrorToast={ShowErrorToast}
                      info={profile}
                    />
                  ) : (
                    <ProfileTotal
                      ShowSuccessToast={ShowSuccessToast}
                      ShowErrorToast={ShowErrorToast}
                      info={profile}
                      onEditPress={() => setEditState(true)}
                    />
                  )}
                  <StatsBlock info={profile} />
                </>
              )
            ) : (
              <>
                <ProfileForms
                  ShowSuccessToast={ShowSuccessToast}
                  ShowErrorToast={ShowErrorToast}
                  onEditEnd={onEditEnd}
                  info={profile}
                />
                <YourAccount />
              </>
            ))}
        </Container>
      )}
    </>
  );
};
