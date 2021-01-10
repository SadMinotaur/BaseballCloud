import React from "react";
import { Styles } from "./styles";
import { Stl } from "./../common-styles/styles";
import AgeSvg from "./../../../assets/profile/age.svg";
import HeightSvg from "./../../../assets/profile/height.svg";
import WeightSvg from "./../../../assets/profile/weight.svg";
import ThrowSvg from "./../../../assets/profile/throw.svg";
import BatsSvg from "./../../../assets/profile/bats.svg";
import PictureProf from "./../../../assets/profileIcon.png";
import Edit from "./../../../assets/profile/edit.svg";

export const ProfileTotal: React.FC = () => (
  <Styles.Container>
    <Stl.ProfileContainer>
      <Styles.EditBut src={Edit} />
      <Stl.ProfilePic src={PictureProf} />
    </Stl.ProfileContainer>
    <Styles.ItemsRow>
      <div>
        <Styles.ItemImage src={AgeSvg} alt="Age" />
        <Styles.ItemText>Age</Styles.ItemText>
      </div>
    </Styles.ItemsRow>
    <Styles.ItemsRow>
      <div>
        <Styles.ItemImage src={HeightSvg} alt="Height" />
        <Styles.ItemText>Height</Styles.ItemText>
      </div>
    </Styles.ItemsRow>
    <Styles.ItemsRow>
      <div>
        <Styles.ItemImage src={WeightSvg} alt="Weigh" />
        <Styles.ItemText>Weight</Styles.ItemText>
      </div>
    </Styles.ItemsRow>
    <Styles.ItemsRow>
      <div>
        <Styles.ItemImage src={ThrowSvg} alt="Throw" />
        <Styles.ItemText>Throw</Styles.ItemText>
      </div>
    </Styles.ItemsRow>
    <Styles.ItemsRow>
      <div>
        <Styles.ItemImage src={BatsSvg} alt="Bats" />
        <Styles.ItemText>Bats</Styles.ItemText>
      </div>
    </Styles.ItemsRow>
    <p>School</p>
    <h4>FSU</h4>
    <p>School Year</p>
    <h4>Bats</h4>
    <p>Facility</p>
    <h4>Example</h4>
  </Styles.Container>
);
