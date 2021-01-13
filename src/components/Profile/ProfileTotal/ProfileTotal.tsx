import React from "react";
import { Styles } from "./styles";
import { GraphqlProfile } from "./../common-types/Profile";
import CommonStyle from "./../../../common-styles/styles";
import AgeSvg from "./../../../assets/profile/age.svg";
import HeightSvg from "./../../../assets/profile/height.svg";
import WeightSvg from "./../../../assets/profile/weight.svg";
import ThrowSvg from "./../../../assets/profile/throw.svg";
import BatsSvg from "./../../../assets/profile/bats.svg";
import PictureProf from "./../../../assets/profileIcon.png";
import Edit from "./../../../assets/profile/edit.svg";
import Heart from "./../../../assets/profile/heart.svg";
import BlueHeart from "./../../../assets/profile/blueHeart.svg";

export const ProfileTotal: React.FC<{
  info: GraphqlProfile;
  onEditPress?: () => void;
}> = ({ info, onEditPress }) => (
  <>
    {info && (
      <Styles.Container>
        <CommonStyle.ProfileContainer>
          {onEditPress ? (
            <Styles.FloatingIcon src={Edit} onClick={onEditPress} />
          ) : (
            <Styles.FloatingIcon src={Heart} />
          )}
          <CommonStyle.ProfilePic src={PictureProf} />
        </CommonStyle.ProfileContainer>
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
        <p>School</p>
        <h4>{info.school.name}</h4>
        <p>School Year</p>
        <h4>{info.school_year}</h4>
        <p>Team</p>
        <h4>{info.teams[0].name}</h4>
        <p>Facility</p>
        <h4>{info.facilities[0].u_name}</h4>
      </Styles.Container>
    )}
  </>
);
