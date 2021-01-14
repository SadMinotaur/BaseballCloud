import React, { useEffect, useState } from "react";
import { Spinner } from "../../../utils/common-components/spinner";
import { Queries } from "./../graphql/query";
import { ToastContainer, ToastMessageAnimated } from "react-toastr";
import { ItemTab } from "./../ItemTab";
import { InputBlue } from "../../../utils/common-components/input-blue";
import { DropdownBlue } from "../../../utils/common-components/dropdown-blue";
import {
  BattingUser,
  PitchingUser,
} from "../../../utils/leaderboard-types/types";
import CommonStyle from "../../../utils/common-styles/styles";
import API from "../../../utils/api";
import Stl from "./styles";
import { Field, Form, FormSpy } from "react-final-form";

export const LeaderboardPage: React.FC = () => {
  let container: ToastContainer | null;
  const timeout: number = 4000;

  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const [loadingContent, setLoadingContent] = useState<boolean>(true);
  const [currentSwitch, setCurrentSwitch] = useState<boolean>(true);

  const [contentBatting, setBattingContent] = useState([] as BattingUser[]);
  const [contentPitching, setPitchingContent] = useState([] as PitchingUser[]);

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
    setLoadingProfile(false);
    getB();
    return () => {};
  }, []);

  return (
    <>
      <CommonStyle.Toast>
        <ToastContainer
          ref={(ref) => (container = ref)}
          toastMessageFactory={React.createFactory(ToastMessageAnimated)}
        />
      </CommonStyle.Toast>
      {loadingProfile ? (
        <Spinner loading={loadingProfile} />
      ) : (
        <Stl.Container>
          <Form
            onSubmit={() => {}}
            render={() => (
              <>
                <Stl.Header>
                  <h3>Leaderboard</h3>
                  <Stl.InputGroup>
                    <Field name="date">
                      {({ input }) => (
                        <DropdownBlue
                          input={input}
                          placeholder="Date"
                          width={100}
                          options={[
                            { label: "All", value: "All" },
                            { label: "Catcher", value: "Catcher" },
                            { label: "Last Month", value: "Last Month" },
                          ]}
                        />
                      )}
                    </Field>
                    <Field name="school">
                      {({ input }) => (
                        <InputBlue
                          input={input}
                          name="School"
                          width={55}
                          widthFocus={180}
                        />
                      )}
                    </Field>
                    <Field name="team">
                      {({ input }) => (
                        <InputBlue
                          input={input}
                          name="Team"
                          width={45}
                          widthFocus={180}
                        />
                      )}
                    </Field>
                    <Field name="position">
                      {({ input }) => (
                        <DropdownBlue
                          input={input}
                          placeholder="Position"
                          width={100}
                          options={[
                            { label: "All", value: "All" },
                            { label: "Last Week", value: "Last Week" },
                            { label: "First Base", value: "First Base" },
                            { label: "Second Base", value: "Second Base" },
                            { label: "Sportstop", value: "Sportstop" },
                            { label: "Third Base", value: "Third Base" },
                            { label: "Outfield", value: "Outfield" },
                            { label: "Pitcher", value: "Pitcher" },
                          ]}
                        />
                      )}
                    </Field>
                    <Field name="age">
                      {({ input }) => (
                        <InputBlue
                          input={input}
                          name="Age"
                          width={35}
                          widthFocus={80}
                        />
                      )}
                    </Field>
                    <Field name="favorite">
                      {({ input }) => (
                        <DropdownBlue
                          input={input}
                          width={80}
                          placeholder="All"
                          options={[
                            { label: "All", value: "All" },
                            { label: "Favorite", value: "Favorite" },
                          ]}
                        />
                      )}
                    </Field>
                  </Stl.InputGroup>
                </Stl.Header>
                <Stl.HeaderTabs>
                  <Stl.TabsContainer>
                    <CommonStyle.HeaderTab
                      onClick={() => {
                        getB();
                        setCurrentSwitch(true);
                      }}
                      active={currentSwitch}
                    >
                      Batting
                    </CommonStyle.HeaderTab>
                    <CommonStyle.HeaderTab
                      onClick={() => {
                        getP();
                        setCurrentSwitch(false);
                      }}
                      active={!currentSwitch}
                    >
                      Pitching
                    </CommonStyle.HeaderTab>
                  </Stl.TabsContainer>
                  <Field name="type">
                    {({ input }) => (
                      <DropdownBlue
                        input={input}
                        width={120}
                        placeholder="Exit Velocity"
                        options={[
                          { label: "Exit Velocity", value: "Exit Velocity" },
                          { label: "Cary Distance", value: "Cary Distance" },
                        ]}
                      />
                    )}
                  </Field>
                </Stl.HeaderTabs>
                <FormSpy
                  subscription={{ values: true }}
                  onChange={(v) => console.log(v)}
                />
              </>
            )}
          />
          <Stl.Content>
            <CommonStyle.TabHead>
              <CommonStyle.TabHeadText width={6.5}>
                Rank
              </CommonStyle.TabHeadText>
              <CommonStyle.TabHeadText width={14}>
                {currentSwitch ? "Batter" : "Pitcher"} Name
              </CommonStyle.TabHeadText>
              <CommonStyle.TabHeadText width={5}>Age</CommonStyle.TabHeadText>
              <CommonStyle.TabHeadText width={14}>
                School
              </CommonStyle.TabHeadText>
              <CommonStyle.TabHeadText width={14.5}>
                Teams
              </CommonStyle.TabHeadText>
              <CommonStyle.TabHeadText width={14.5}>
                {currentSwitch ? "Exit Velocity" : "Pitch Type"}
              </CommonStyle.TabHeadText>
              <CommonStyle.TabHeadText width={14.5}>
                {currentSwitch ? "Launch Angle" : "Velocity"}
              </CommonStyle.TabHeadText>
              <CommonStyle.TabHeadText width={10}>
                {currentSwitch ? "Distance" : "Spin Rate"}
              </CommonStyle.TabHeadText>
              <CommonStyle.TabHeadText width={5}>
                Favorite
              </CommonStyle.TabHeadText>
            </CommonStyle.TabHead>
            {loadingContent ? (
              <Spinner loading={loadingContent} />
            ) : (
              <>
                {currentSwitch
                  ? contentBatting.map((v, i: number) => (
                      <ItemTab
                        key={i}
                        idProfile={v.batter_datraks_id}
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
                        key={i}
                        idProfile={v.pitcher_datraks_id}
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
