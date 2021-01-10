import React, { useEffect, useState } from "react";
import { Spinner } from "../../../common-components/spinner";
import { Queries } from "./../graphql/query";
import { ToastContainer, ToastMessageAnimated } from "react-toastr";
import { ItemTab } from "./../ItemTab";
import { PageInput } from "./../PageInput";
import { DropdownLeaderboard } from "./../Dropdown";
import API from "../../../grahql/api";
import Profile from "../../../grahql/queries/Profile";
import Stl from "./styles";

export const LeaderboardPage: React.FC = () => {
  let container: ToastContainer | null;
  const timeout: number = 4000;

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingContent, setLoadingContent] = useState(true);
  const [currentSwitch, setCurrentSwitch] = useState(true);

  // const [age, setAge] = useState(-1);
  // const [date, setDate] = useState("");
  // const [favorite, setFavorite] = useState(-1);
  // const [position, setPosition] = useState("");
  // const [school, setSchool] = useState("");
  // const [team, setTeam] = useState("");
  // const [type, setType] = useState("exit_velocity");

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
    setLoadingContent(true);
    API.graphqlPost(Queries.getBatting, {
      input: { type: "exit_velocity" },
    }).then((v) => {
      setBattingContent(v.data.leaderboard_batting.leaderboard_batting);
      setLoadingContent(false);
    });
  }

  function getP(): void {
    setLoadingContent(true);
    API.graphqlPost(Queries.getPitching, {
      input: { type: "pitch_velocity" },
    }).then((v) => {
      setPitchingContent(v.data.leaderboard_pitching.leaderboard_pitching);
      setLoadingContent(false);
    });
  }

  function showSuccessToast(fav: boolean): void {
    container &&
      container.success(
        `This profile ${
          fav ? "removed from favorite" : "added to favorite"
        }  list successfully.`,
        "Success",
        {
          closeButton: true,
          tapToDismiss: true,
          timeOut: timeout,
        }
      );
  }

  function showErrorToast(): void {
    container &&
      container.error("Error", {
        closeButton: true,
        tapToDismiss: true,
        timeOut: timeout,
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
            <Stl.InputGroup>
              <DropdownLeaderboard
                value={"Date"}
                options={["All", "Catcher", "Last Month"]}
                onChange={() => {}}
              />
              <PageInput name="School" width={55} onChange={() => {}} />
              <PageInput name="Team" width={45} onChange={() => {}} />
              <DropdownLeaderboard
                value={"Position"}
                options={[
                  "All",
                  "Last Week",
                  "First Base",
                  "Second Base",
                  "Sportstop",
                  "Third Base",
                  "Outfield",
                  "Pitcher",
                ]}
                onChange={() => {}}
              />
              <PageInput name="Age" width={35} onChange={() => {}} />
              <DropdownLeaderboard
                value={"All"}
                options={["All", "Favorite"]}
                onChange={() => {}}
              />
            </Stl.InputGroup>
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
            <DropdownLeaderboard
              value={"Exit Velocity"}
              options={["Exit Velocity", "Cary Distance"]}
              onChange={() => {}}
            />
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
                      <ItemTab
                        arr={[
                          (i + 1).toString(),
                          v.batter_name,
                          v.age.toString(),
                          v.school.name,
                          v.teams[0].name,
                          v.exit_velocity.toString(),
                          v.launch_angle ? v.launch_angle.toString() : "-",
                          v.distance.toString(),
                        ]}
                        onC={() =>
                          API.graphqlPost(Queries.favorite, {
                            form: {
                              favorite: !v.favorite,
                              profile_id: v.batter_datraks_id,
                            },
                          })
                            .then(() => {
                              showSuccessToast(v.favorite);
                              setBattingContent((ps) =>
                                ps.map((item) =>
                                  item.batter_datraks_id !== v.batter_datraks_id
                                    ? item
                                    : { ...v, favorite: !v.favorite }
                                )
                              );
                            })
                            .catch(() => showErrorToast())
                        }
                        fav={v.favorite}
                      />
                    ))
                  : contentPitching.map((v, i: number) => (
                      <ItemTab
                        arr={[
                          (i + 1).toString(),
                          v.pitcher_name,
                          v.age.toString(),
                          v.school.name,
                          v.teams[0].name,
                          v.pitch_type,
                          v.velocity.toString(),
                          v.spin_rate.toString(),
                        ]}
                        onC={() =>
                          API.graphqlPost(Queries.favorite, {
                            form: {
                              favorite: !v.favorite,
                              profile_id: v.pitcher_datraks_id,
                            },
                          })
                            .then(() => {
                              showSuccessToast(v.favorite);
                              setPitchingContent((ps) =>
                                ps.map((item) =>
                                  item.pitcher_datraks_id !==
                                  v.pitcher_datraks_id
                                    ? item
                                    : { ...v, favorite: !v.favorite }
                                )
                              );
                            })
                            .catch(() => showErrorToast())
                        }
                        fav={v.favorite}
                      />
                    ))}
              </>
            )}
          </Stl.Content>
        </Stl.Container>
      )}
    </>
  );
};
