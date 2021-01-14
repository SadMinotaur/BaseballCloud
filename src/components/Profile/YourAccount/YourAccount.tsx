import React from "react";
import { Styles } from "./styles";
import ArrowBack from "./../../../assets/profile/arrowback.svg";

export const YourAccount: React.FC = () => (
  <Styles.Container>
    <Styles.WhiteContainer>
      <img src={ArrowBack} alt={"arrow"} />
      <Styles.HeadText>Your Account</Styles.HeadText>
      <Styles.Text>
        Changing your profile options lets you control how others see you and
        your profile. These settings include things like your name, personal
        info and school.
      </Styles.Text>
    </Styles.WhiteContainer>
  </Styles.Container>
);
