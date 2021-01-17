import React, { useCallback, useEffect, useState } from "react";
import { Styles } from "./styles";
// import { Queries } from "./../graphql/query";
import { GraphqlProfile } from "../../../utils/types/profile";
import { ToastContainer, ToastMessageAnimated } from "react-toastr";
import {
  ShowSuccessToast,
  ShowErrorToast,
} from "./../../../utils/common-components/toast/toast";
import { CommonQueries } from "./../../../utils/graphql";
import CommonStyle from "../../../utils/common-styles/styles";
import AgeSvg from "./../../../assets/profile/age.svg";
import HeightSvg from "./../../../assets/profile/height.svg";
import WeightSvg from "./../../../assets/profile/weight.svg";
import ThrowSvg from "./../../../assets/profile/throw.svg";
import BatsSvg from "./../../../assets/profile/bats.svg";
import PictureProf from "./../../../assets/profileIcon.png";
import Edit from "./../../../assets/profile/edit.svg";
import Heart from "./../../../assets/profile/heart.svg";
import BlueHeart from "./../../../assets/profile/blueHeart.svg";
import API from "../../../utils/api";

export const ProfileTotal: React.FC<{
  info: GraphqlProfile;
  onEditPress?: () => void;
}> = ({ info, onEditPress }) => {
  let container: ToastContainer | null = null;

  const [picture, setPicture] = useState<string>();
  const [favorite, setFavorite] = useState<boolean>(info.favorite);

  useEffect(() => {
    if (info.avatar) {
      API.getPicture(info.avatar).then((v) => setPicture(v));
    }
  }, [info.avatar]);

  const makeFavorite = useCallback(
    () =>
      API.graphqlPost(CommonQueries.favoriteProfile, {
        variables: { form: { profile_id: info.id, favorite: !favorite } },
      })
        .then(() => {
          ShowSuccessToast(favorite, container as ToastContainer);
          setFavorite(!favorite);
        })
        .catch(() => ShowErrorToast(container as ToastContainer)),
    [container, favorite, info.id]
  );

  return (
    <>
      {info && (
        <Styles.Container>
          <CommonStyle.Toast>
            <ToastContainer
              ref={(ref) => (container = ref)}
              toastMessageFactory={React.createFactory(ToastMessageAnimated)}
            />
          </CommonStyle.Toast>
          <CommonStyle.ProfileContainer>
            {onEditPress ? (
              <Styles.FloatingIcon src={Edit} onClick={onEditPress} />
            ) : (
              <Styles.FloatingIcon
                onClick={makeFavorite}
                src={favorite ? BlueHeart : Heart}
              />
            )}
            <CommonStyle.ProfilePic
              src={picture ? `data:image/jpeg;base64,${picture}` : PictureProf}
            />
          </CommonStyle.ProfileContainer>
          <Styles.NameContainer>
            <h3>
              {info.first_name} {info.last_name}
            </h3>
            <h4>{info.position}</h4>
          </Styles.NameContainer>
          <Styles.ItemsRow>
            <div>
              <Styles.ItemImage src={AgeSvg} alt="Age" />
              <Styles.ItemText>Age</Styles.ItemText>
            </div>
            <Styles.ItemText>{info.age}</Styles.ItemText>
          </Styles.ItemsRow>
          <Styles.ItemsRow>
            <div>
              <Styles.ItemImage src={HeightSvg} alt="Height" />
              <Styles.ItemText>Height</Styles.ItemText>
            </div>
            <Styles.ItemText>
              {info.feet} ft {info.inches} in
            </Styles.ItemText>
          </Styles.ItemsRow>
          <Styles.ItemsRow>
            <div>
              <Styles.ItemImage src={WeightSvg} alt="Weigh" />
              <Styles.ItemText>Weight</Styles.ItemText>
            </div>
            <Styles.ItemText>{info.weight} lbs</Styles.ItemText>
          </Styles.ItemsRow>
          <Styles.ItemsRow>
            <div>
              <Styles.ItemImage src={ThrowSvg} alt="Throw" />
              <Styles.ItemText>Throw</Styles.ItemText>
            </div>
            <Styles.ItemText>
              {info.throws_hand.toLocaleUpperCase()}
            </Styles.ItemText>
          </Styles.ItemsRow>
          <Styles.ItemsRow>
            <div>
              <Styles.ItemImage src={BatsSvg} alt="Bats" />
              <Styles.ItemText>Bats</Styles.ItemText>
            </div>
            <Styles.ItemText>
              {info.bats_hand.toLocaleUpperCase()}
            </Styles.ItemText>
          </Styles.ItemsRow>

          {info.school && (
            <>
              <p>School</p>
              <h4>{info.school.name}</h4>
              <p>School Year</p>
              <h4>{info.school_year}</h4>
            </>
          )}
          {info.teams.length !== 0 ? (
            <>
              <p>Team</p>
              <h4>{info.teams[0].name}</h4>
            </>
          ) : null}
          {info.facilities.length > 0 && (
            <>
              <p>Facility</p>
              <h4>{info.facilities[0].u_name}</h4>
            </>
          )}
        </Styles.Container>
      )}
    </>
  );
};
