import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartSol } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartReg } from "@fortawesome/free-regular-svg-icons";
import { Spinner } from "../../../common-components/spinner";
import { Queries } from "./../graphql/query";
import { ToastContainer, ToastMessageAnimated } from "react-toastr";
import API from "../../../grahql/api";
import Profile from "../../../grahql/queries/Profile";
import Stl from "./styles";

export const LeaderboardPage: React.FC = () => {
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingContent, setLoadingContent] = useState(true);
  const [currentSwitch, setCurrentSwitch] = useState(true);

  const [content, setContent] = useState(
    [] as {
      batter_name: string;
      exit_velocity: number;
      launch_angle: number;
      age: number;
      batter_datraks_id: number;
      distance: number;
      favorite: boolean;
      school: { id: string; name: string };
      teams: { id: string; name: string }[];
    }[]
  );

  useEffect(() => {
    API.graphqlPost(Profile.getUserInfo, {}).then((v) => {
      setLoadingProfile(false);
      API.graphqlPost(Queries.getBatting, {
        input: { type: "exit_velocity" },
      }).then((v) => {
        setContent(v.data.leaderboard_batting.leaderboard_batting);
        setLoadingContent(false);
      });
    });
    return () => {};
  }, []);

  let container: ToastContainer | null;

  return (
    <>
      <ToastContainer
        ref={(ref) => (container = ref)}
        toastMessageFactory={React.createFactory(ToastMessageAnimated)}
      />
      {loadingProfile ? (
        <Spinner loading={loadingProfile} />
      ) : (
        <Stl.Container>
          <Stl.Header>
            <h3>Leaderboard</h3>
          </Stl.Header>
          <Stl.HeaderTabs>
            <Stl.TabsContainer>
              <Stl.HeaderTab
                onClick={() => setCurrentSwitch(true)}
                active={currentSwitch}
              >
                Batting
              </Stl.HeaderTab>
              <Stl.HeaderTab
                onClick={() => setCurrentSwitch(false)}
                active={!currentSwitch}
              >
                Pitching
              </Stl.HeaderTab>
            </Stl.TabsContainer>
          </Stl.HeaderTabs>
          <Stl.Content>
            <Stl.TabHead>
              <Stl.TabHeadText width={6.5}>Rank</Stl.TabHeadText>
              <Stl.TabHeadText width={14}>Batter Name</Stl.TabHeadText>
              <Stl.TabHeadText width={5}>Age</Stl.TabHeadText>
              <Stl.TabHeadText width={14}>School</Stl.TabHeadText>
              <Stl.TabHeadText width={14.5}>Teams</Stl.TabHeadText>
              <Stl.TabHeadText width={14.5}>Exit Velocity</Stl.TabHeadText>
              <Stl.TabHeadText width={14.5}>Launch Angle</Stl.TabHeadText>
              <Stl.TabHeadText width={10}>Distance</Stl.TabHeadText>
              <Stl.TabHeadText width={5}>Favorite</Stl.TabHeadText>
            </Stl.TabHead>
            {loadingContent ? (
              <Spinner loading={loadingContent} />
            ) : (
              <>
                {content.map((v, i: number) => (
                  <Stl.Tab>
                    <Stl.TabText width={6.5}>{i + 1}</Stl.TabText>
                    <Stl.TabText width={14}>{v.batter_name}</Stl.TabText>
                    <Stl.TabText width={5}>{v.age}</Stl.TabText>
                    <Stl.TabText width={14}>{v.school.name}</Stl.TabText>
                    <Stl.TabText width={14.5}>{v.teams[0].name}</Stl.TabText>
                    <Stl.TabText width={14.5}>{v.exit_velocity}</Stl.TabText>
                    <Stl.TabText width={14.5}>
                      {v.launch_angle ? v.launch_angle : "-"}
                    </Stl.TabText>
                    <Stl.TabText width={10}>{v.distance}</Stl.TabText>
                    <Stl.TabText width={5}>
                      <FontAwesomeIcon
                        onClick={() =>
                          container &&
                          container.success("Done", "Stuff", {
                            className: "toast-top-right",
                            closeButton: true,
                            timeOut: 3000,
                            tapToDismiss: true,
                          })
                        }
                        style={{ color: "#48bbff" }}
                        icon={v.favorite ? heartSol : heartReg}
                      />
                    </Stl.TabText>
                  </Stl.Tab>
                ))}
              </>
            )}
          </Stl.Content>
        </Stl.Container>
      )}
    </>
  );
};
