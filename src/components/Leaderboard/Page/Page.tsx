import React, { useCallback, useEffect, useState } from "react";
import { Queries } from "./../graphql/query";
import { ToastContainer, ToastMessageAnimated } from "react-toastr";
import { InputBlue } from "../../../utils/common-components/input-blue";
import { DropdownBlue } from "../../../utils/common-components/dropdown-blue";
import {
  BattingUser,
  PitchingUser,
} from "../../../utils/leaderboard-types/types";
import { Field, Form, FormSpy } from "react-final-form";
import { FormState } from "final-form";
import { LeaderboardContent } from "./../LeaderboardContent";
import {
  ShowSuccessToast,
  ShowErrorToast,
} from "./../../../utils/common-components/toast/toast";
import CommonStyle from "../../../utils/common-styles/styles";
import API from "../../../utils/api";
import Stl from "./styles";

export const LeaderboardPage: React.FC = () => {
  let container: ToastContainer | null = null;

  const [loadingContent, setLoadingContent] = useState<boolean>(false);
  const [currentSwitch, setCurrentSwitch] = useState<boolean>(true);

  const [contentBatting, setBattingContent] = useState<BattingUser[]>([]);
  const [contentPitching, setPitchingContent] = useState<PitchingUser[]>([]);

  const getB = useCallback((req?: object) => {
    setLoadingContent(true);
    API.graphqlPost(
      Queries.getBatting,
      req
        ? {
            input: req,
          }
        : {
            input: { type: "exit_velocity" },
          }
    ).then((v) => {
      setBattingContent(v.data.leaderboard_batting.leaderboard_batting);
      setLoadingContent(false);
    });
  }, []);

  const getP = useCallback((req?: object) => {
    setLoadingContent(true);
    API.graphqlPost(
      Queries.getPitching,
      req
        ? {
            input: req,
          }
        : {
            input: { type: "pitch_velocity" },
          }
    ).then((v) => {
      setPitchingContent(v.data.leaderboard_pitching.leaderboard_pitching);
      setLoadingContent(false);
    });
  }, []);

  const onClickFavB = useCallback(
    (v: BattingUser) =>
      API.graphqlPost(Queries.favorite, {
        form: {
          favorite: !v.favorite,
          profile_id: v.batter_datraks_id,
        },
      })
        .then(() => {
          ShowSuccessToast(v.favorite, container as ToastContainer);
          setBattingContent((ps) =>
            ps.map((item) =>
              item.batter_datraks_id !== v.batter_datraks_id
                ? item
                : { ...v, favorite: !v.favorite }
            )
          );
        })
        .catch(() => ShowErrorToast(container as ToastContainer)),
    [container]
  );

  const onClickFavP = useCallback(
    (v: PitchingUser) =>
      API.graphqlPost(Queries.favorite, {
        form: {
          favorite: !v.favorite,
          profile_id: v.pitcher_datraks_id,
        },
      })
        .then(() => {
          ShowSuccessToast(v.favorite, container as ToastContainer);
          setPitchingContent((ps) =>
            ps.map((item) =>
              item.pitcher_datraks_id !== v.pitcher_datraks_id
                ? item
                : { ...v, favorite: !v.favorite }
            )
          );
        })
        .catch(() => ShowErrorToast(container as ToastContainer)),
    [container]
  );

  function updateContent(fields: FormState<Record<string, any>>): void {
    const v = fields.values;
    const req = {
      ...v,
      age: v.age && parseInt(v.age),
      favorite: v.favorite && parseInt(v.favorite),
    };
    currentSwitch ? getB(req) : getP(req);
  }

  useEffect(() => {
    getB();
    return () => {};
  }, [getB]);

  return (
    <Stl.Container>
      <CommonStyle.Toast>
        <ToastContainer
          ref={(ref) => (container = ref)}
          toastMessageFactory={React.createFactory(ToastMessageAnimated)}
        />
      </CommonStyle.Toast>
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
                      width={150}
                      options={[
                        { label: "All", value: "" },
                        { label: "Last Week", value: "last_week" },
                        { label: "Last Month", value: "last_month" },
                      ]}
                    />
                  )}
                </Field>
                <Field name="school" type="input">
                  {({ input }) => (
                    <InputBlue
                      input={input}
                      name="School"
                      width={55}
                      widthFocus={180}
                    />
                  )}
                </Field>
                <Field name="team" type="input">
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
                      width={100}
                      options={[
                        { label: "All", value: "" },
                        { label: "Catcher", value: "catcher" },
                        { label: "First Base", value: "first_base" },
                        { label: "Second Base", value: "second_base" },
                        { label: "Sportstop", value: "shortstop" },
                        { label: "Third Base", value: "third_base" },
                        { label: "Outfield", value: "outfield" },
                        { label: "Pitcher", value: "pitcher" },
                      ]}
                    />
                  )}
                </Field>
                <Field name="age" type="number">
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
                      options={[
                        { label: "All", value: "" },
                        { label: "Favorite", value: "1" },
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
              {currentSwitch ? (
                <Field name="type" defaultValue={"exit_velocity"}>
                  {({ input }) => (
                    <DropdownBlue
                      input={input}
                      width={120}
                      options={[
                        {
                          label: "Exit Velocity",
                          value: "exit_velocity",
                        },
                        {
                          label: "Carry Distance",
                          value: "carry_distance",
                        },
                      ]}
                    />
                  )}
                </Field>
              ) : (
                <Field name="type" defaultValue={"pitch_velocity"}>
                  {({ input }) => (
                    <DropdownBlue
                      input={input}
                      width={120}
                      options={[
                        {
                          label: "Pitch Velocity",
                          value: "pitch_velocity",
                        },
                        {
                          label: "Spin Rate",
                          value: "spin_rate",
                        },
                      ]}
                    />
                  )}
                </Field>
              )}
            </Stl.HeaderTabs>
            <FormSpy subscription={{ values: true }} onChange={updateContent} />
          </>
        )}
      />
      <LeaderboardContent
        onClickFavP={onClickFavP}
        onClickFavB={onClickFavB}
        currentSwitch={currentSwitch}
        loadingContent={loadingContent}
        contentBatting={contentBatting}
        contentPitching={contentPitching}
      />
    </Stl.Container>
  );
};
