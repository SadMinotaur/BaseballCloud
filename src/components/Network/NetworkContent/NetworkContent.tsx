import React from "react";
import { ProfilesInfo } from "../../../utils/types/network";
import { Spinner } from "../../../utils/common-components/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartSol } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartReg } from "@fortawesome/free-regular-svg-icons";
import CommonStyle from "../../../utils/common-styles/styles";

export const NetworkContent: React.FC<{
  loadingContent: boolean;
  content: ProfilesInfo[];
  onClickHeart: (v: ProfilesInfo) => void;
}> = ({ content, loadingContent, onClickHeart }) => (
  <>
    <CommonStyle.TabHead>
      <CommonStyle.TabHeadText width={19}>Player Name</CommonStyle.TabHeadText>
      <CommonStyle.TabHeadText width={10}>Sessions</CommonStyle.TabHeadText>
      <CommonStyle.TabHeadText width={23}>School</CommonStyle.TabHeadText>
      <CommonStyle.TabHeadText width={23}>Teams</CommonStyle.TabHeadText>
      <CommonStyle.TabHeadText width={15}>Age</CommonStyle.TabHeadText>
      <CommonStyle.TabHeadText width={8}>Favorite</CommonStyle.TabHeadText>
    </CommonStyle.TabHead>
    {loadingContent ? (
      <Spinner loading={loadingContent} />
    ) : (
      content.map((v, i: number) => (
        <CommonStyle.Tab key={i}>
          <CommonStyle.TabText width={19}>
            {v.first_name} {v.last_name}
          </CommonStyle.TabText>
          <CommonStyle.TabText width={10}>-</CommonStyle.TabText>
          <CommonStyle.TabText width={23}>
            {v.school ? v.school.name : "-"}
          </CommonStyle.TabText>
          <CommonStyle.TabText width={23}>
            {v.teams.length > 0 ? v.teams[0].name : "-"}
          </CommonStyle.TabText>
          <CommonStyle.TabText width={15}>{v.age}</CommonStyle.TabText>
          <CommonStyle.TabText width={8}>
            <FontAwesomeIcon
              onClick={() => onClickHeart(v)}
              style={{ color: "#4abdff" }}
              icon={v.favorite ? heartSol : heartReg}
            />
          </CommonStyle.TabText>
        </CommonStyle.Tab>
      ))
    )}
  </>
);
