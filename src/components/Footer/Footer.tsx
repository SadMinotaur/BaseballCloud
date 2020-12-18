import React from "react";
import { FooterStyle, Legal, Links, Social } from "./styles";

export const Footer: React.FC = () => (
  <>
    <FooterStyle>
      <Legal>
        <span>© 2018 BaseballCloud</span>
        <Links href="/legal/terms">Terms of Service</Links>
        <Links href="/legal/privacy">Privacy Policy</Links>
      </Legal>
      <Social>
        <Links href="https://baseballcloud.blog/">Blog</Links>
        <Links href="https://twitter.com/baseballcloudus">Twitter</Links>
        <Links href="https://www.instagram.com/baseballcloudus/">
          Instagram
        </Links>
        <Links href="https://www.facebook.com/BaseballCloudUS/">Facebook</Links>
      </Social>
    </FooterStyle>
  </>
);
