import React, { useEffect, useState } from "react";
import { Styles } from "./styles";
import { GraphqlProfile } from "../../../utils/types/profile";
import { SectText } from "../SectionText";
import { ToNormalState } from "../../../utils/convert-name";
import { MakeFavorite } from "./../../../utils/make-favotite";
import CommonStyle from "../../../common-styles/styles";
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
  ShowErrorToast: (text: string) => void;
  ShowSuccessToast: (text: string) => void;
  onEditPress?: () => void;
}> = ({ info, onEditPress, ShowSuccessToast, ShowErrorToast }) => {
  const [picture, setPicture] = useState<string>();
  const [favorite, setFavorite] = useState<boolean>(info.favorite);

  useEffect(() => {
    info.avatar && API.getPicture(info.avatar).then((v) => setPicture(v));
  }, [info.avatar]);

  function makeFavorite(): void {
    MakeFavorite(!favorite, parseInt(info.id), ShowSuccessToast)
      .then(() => setFavorite(!favorite))
      .catch(() => ShowErrorToast("Error updating profile"));
  }

  return (
    <Styles.Container>
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
        <Styles.ProfileName>
          {info?.first_name} {info?.last_name}
        </Styles.ProfileName>
        <h5>{info?.position && ToNormalState(info?.position)}</h5>
        <h5>{info?.position2 && ToNormalState(info?.position2)}</h5>
      </Styles.NameContainer>
      <Styles.ItemsRow>
        <div>
          <Styles.ItemImage src={AgeSvg} alt="Age" />
          <Styles.ItemText>Age</Styles.ItemText>
        </div>
        <Styles.ItemText>{info?.age}</Styles.ItemText>
      </Styles.ItemsRow>
      <Styles.ItemsRow>
        <div>
          <Styles.ItemImage src={HeightSvg} alt="Height" />
          <Styles.ItemText>Height</Styles.ItemText>
        </div>
        <Styles.ItemText>
          {info?.feet} ft {info?.inches && info?.inches.toString() + " in"}
        </Styles.ItemText>
      </Styles.ItemsRow>
      <Styles.ItemsRow>
        <div>
          <Styles.ItemImage src={WeightSvg} alt="Weigh" />
          <Styles.ItemText>Weight</Styles.ItemText>
        </div>
        <Styles.ItemText>{info?.weight} lbs</Styles.ItemText>
      </Styles.ItemsRow>
      <Styles.ItemsRow>
        <div>
          <Styles.ItemImage src={ThrowSvg} alt="Throw" />
          <Styles.ItemText>Throw</Styles.ItemText>
        </div>
        <Styles.ItemText>
          {info.throws_hand?.toLocaleUpperCase()}
        </Styles.ItemText>
      </Styles.ItemsRow>
      <Styles.ItemsRow>
        <div>
          <Styles.ItemImage src={BatsSvg} alt="Bats" />
          <Styles.ItemText>Bats</Styles.ItemText>
        </div>
        <Styles.ItemText>{info.bats_hand?.toLocaleUpperCase()}</Styles.ItemText>
      </Styles.ItemsRow>
      {info.school && (
        <>
          <CommonStyle.ItemHeadText>School</CommonStyle.ItemHeadText>
          <h4>{info.school.name}</h4>
          {info.school_year && (
            <>
              <CommonStyle.ItemHeadText>School Year</CommonStyle.ItemHeadText>
              <h4>{ToNormalState(info.school_year)}</h4>
            </>
          )}
        </>
      )}
      {info.teams.length !== 0 && (
        <>
          <CommonStyle.ItemHeadText>Team</CommonStyle.ItemHeadText>
          <h4>
            {info.teams.map((v, i: number) =>
              info.teams.length - 1 !== i ? v.name + ", " : v.name
            )}
          </h4>
        </>
      )}
      {info.facilities.length > 0 && (
        <>
          <CommonStyle.ItemHeadText>Facility</CommonStyle.ItemHeadText>
          <h4>
            {info.facilities.map((v, i: number) =>
              info.facilities.length - 1 !== i ? v.u_name + ", " : v.u_name
            )}
          </h4>
        </>
      )}
      {info.biography && (
        <>
          <SectText text="About" />
          <p>{info.biography}</p>
        </>
      )}
    </Styles.Container>
  );
};
