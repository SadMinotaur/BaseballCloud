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
  let container: ToastContainer | null;
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingContent, setLoadingContent] = useState(true);
  const [currentSwitch, setCurrentSwitch] = useState(true);

  const [contentBatting, setBattingContent] = useState(
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

  const [contentPitching, setPitchingContent] = useState(
    [] as {
      pitcher_name: string;
      velocity: number;
      spin_rate: number;
      age: number;
      pitcher_datraks_id: number;
      pitch_type: string;
      favorite: boolean;
      school: { id: string; name: string };
      teams: { id: string; name: string }[];
    }[]
  );

  function getB(): void {
    setLoadingContent(false);
    API.graphqlPost(Queries.getBatting, {
      input: { type: "exit_velocity" },
    }).then((v) => {
      setBattingContent(v.data.leaderboard_batting.leaderboard_batting);
      setLoadingContent(false);
    });
  }

  function getP(): void {
    setLoadingContent(false);
    API.graphqlPost(Queries.getPitching, {
      input: { type: "pitch_velocity" },
    }).then((v) => {
      setPitchingContent(v.data.leaderboard_pitching.leaderboard_pitching);
      setLoadingContent(false);
    });
  }

  useEffect(() => {
    API.graphqlPost(Profile.getUserInfo, {}).then((v) => {
      setLoadingProfile(false);
      getB();
    });
    return () => {};
  }, []);

  return (
    <>
      <Stl.Toast>
        <ToastContainer
          ref={(ref) => (container = ref)}
          toastMessageFactory={React.createFactory(ToastMessageAnimated)}
        />
      </Stl.Toast>
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
                onClick={() => {
                  getB();
                  setCurrentSwitch(true);
                }}
                active={currentSwitch}
              >
                Batting
              </Stl.HeaderTab>
              <Stl.HeaderTab
                onClick={() => {
                  getP();
                  setCurrentSwitch(false);
                }}
                active={!currentSwitch}
              >
                Pitching
              </Stl.HeaderTab>
            </Stl.TabsContainer>
          </Stl.HeaderTabs>
          <Stl.Content>
            <Stl.TabHead>
              <Stl.TabHeadText width={6.5}>Rank</Stl.TabHeadText>
              <Stl.TabHeadText width={14}>
                {currentSwitch ? "Batter" : "Pitcher"} Name
              </Stl.TabHeadText>
              <Stl.TabHeadText width={5}>Age</Stl.TabHeadText>
              <Stl.TabHeadText width={14}>School</Stl.TabHeadText>
              <Stl.TabHeadText width={14.5}>Teams</Stl.TabHeadText>
              <Stl.TabHeadText width={14.5}>
                {currentSwitch ? "Exit Velocity" : "Pitch Type"}
              </Stl.TabHeadText>
              <Stl.TabHeadText width={14.5}>
                {currentSwitch ? "Launch Angle" : "Velocity"}
              </Stl.TabHeadText>
              <Stl.TabHeadText width={10}>
                {currentSwitch ? "Distance" : "Spin Rate"}
              </Stl.TabHeadText>
              <Stl.TabHeadText width={5}>Favorite</Stl.TabHeadText>
            </Stl.TabHead>
            {loadingContent ? (
              <Spinner loading={loadingContent} />
            ) : (
              <>
                {currentSwitch
                  ? contentBatting.map((v, i: number) => (
                      <Stl.Tab>
                        <Stl.TabText width={6.5}>{i + 1}</Stl.TabText>
                        <Stl.TabText width={14}>{v.batter_name}</Stl.TabText>
                        <Stl.TabText width={5}>{v.age}</Stl.TabText>
                        <Stl.TabText width={14}>{v.school.name}</Stl.TabText>
                        <Stl.TabText width={14.5}>
                          {v.teams[0].name}
                        </Stl.TabText>
                        <Stl.TabText width={14.5}>
                          {v.exit_velocity}
                        </Stl.TabText>
                        <Stl.TabText width={14.5}>
                          {v.launch_angle ? v.launch_angle : "-"}
                        </Stl.TabText>
                        <Stl.TabText width={10}>{v.distance}</Stl.TabText>
                        <Stl.TabText width={5}>
                          <FontAwesomeIcon
                            onClick={() => {
                              API.graphqlPost(Queries.favorite, {
                                form: {
                                  favorite: !v.favorite,
                                  profile_id: v.batter_datraks_id,
                                },
                              })
                                .then(() => {
                                  container &&
                                    container.success(
                                      `This profile ${
                                        v.favorite
                                          ? "removed from favorite"
                                          : "added to favorite"
                                      }  list successfully.`,
                                      "Success",
                                      {
                                        closeButton: true,
                                        tapToDismiss: true,
                                        timeOut: 5000,
                                      }
                                    );
                                  setBattingContent((ps) =>
                                    ps.map((item) =>
                                      item.batter_datraks_id !==
                                      v.batter_datraks_id
                                        ? item
                                        : { ...v, favorite: !v.favorite }
                                    )
                                  );
                                })
                                .catch(() => {
                                  container &&
                                    container.error("Error", {
                                      closeButton: true,
                                      tapToDismiss: true,
                                      timeOut: 5000,
                                    });
                                });
                            }}
                            style={{ color: "#48bbff" }}
                            icon={v.favorite ? heartSol : heartReg}
                          />
                        </Stl.TabText>
                      </Stl.Tab>
                    ))
                  : contentPitching.map((v, i: number) => (
                      <Stl.Tab>
                        <Stl.TabText width={6.5}>{i + 1}</Stl.TabText>
                        <Stl.TabText width={14}>{v.pitcher_name}</Stl.TabText>
                        <Stl.TabText width={5}>{v.age}</Stl.TabText>
                        <Stl.TabText width={14}>{v.school.name}</Stl.TabText>
                        <Stl.TabText width={14.5}>
                          {v.teams[0].name}
                        </Stl.TabText>
                        <Stl.TabText width={14.5}>{v.pitch_type}</Stl.TabText>
                        <Stl.TabText width={14.5}>
                          {v.velocity ? v.velocity : "-"}
                        </Stl.TabText>
                        <Stl.TabText width={10}>{v.spin_rate}</Stl.TabText>
                        <Stl.TabText width={5}>
                          <FontAwesomeIcon
                            onClick={() => {
                              API.graphqlPost(Queries.favorite, {
                                form: {
                                  favorite: !v.favorite,
                                  profile_id: v.pitcher_datraks_id,
                                },
                              })
                                .then(() => {
                                  container &&
                                    container.success(
                                      `This profile ${
                                        v.favorite
                                          ? "removed from favorite"
                                          : "added to favorite"
                                      }  list successfully.`,
                                      "Success",
                                      {
                                        closeButton: true,
                                        tapToDismiss: true,
                                        timeOut: 5000,
                                      }
                                    );
                                  setPitchingContent((ps) =>
                                    ps.map((item) =>
                                      item.pitcher_datraks_id !==
                                      v.pitcher_datraks_id
                                        ? item
                                        : { ...v, favorite: !v.favorite }
                                    )
                                  );
                                })
                                .catch(() => {
                                  container &&
                                    container.error("Error", {
                                      closeButton: true,
                                      tapToDismiss: true,
                                      timeOut: 5000,
                                    });
                                });
                            }}
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
