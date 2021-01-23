import React, { useState } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { DropdownBlue } from "../../../utils/common-components/dropdown-blue";
import { InputBlue } from "../../../utils/common-components/input-blue";
import { SearchInput } from "../../../utils/common-components/search-input";
import { GraphqlCom } from "./../../../utils/graphql";
import { Profiles, ProfilesInfo } from "../../../utils/types/network";
import { Graphql } from "./../graphql/query";
import { NetworkContent } from "./../NetworkContent";
import Stl from "./styles";
import API from "../../../utils/api";
import { RenderButtons } from "../RenderButtons";

export const NetworkPage: React.FC<{
  ShowErrorToast: (text: string) => void;
  ShowSuccessToast: (text: string) => void;
}> = ({ ShowErrorToast, ShowSuccessToast }) => {
  const [loadingContent, setLoadingContent] = useState<boolean>(true);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [showNum, setShowNum] = useState<number>(10);
  const [profiles, setProfiles] = useState<ProfilesInfo[]>([]);

  function updateContent(v: any, offsetC?: number): void {
    const offs = offsetC ? offsetC : 0;
    const req = {
      ...v,
      age: v.age && parseInt(v.age),
      favorite: v.favorite && parseInt(v.favorite),
      offset: offs,
      profiles_count: parseInt(v.profiles_count),
    };
    setShowNum(parseInt(v.profiles_count));
    setOffset(offs);
    getProfiles(req);
  }

  const getProfiles = (req: any) => {
    setLoadingContent(true);
    API.graphqlPost(Graphql.getProfiles, {
      input: req,
    }).then((v: { profiles: Profiles }) => {
      const prof: Profiles = v.profiles;
      setProfiles(prof.profiles);
      setTotalNumber(prof.total_count);
      setLoadingContent(false);
    });
  };

  function onClickFav(v: ProfilesInfo): void {
    API.graphqlPost(GraphqlCom.favoriteProfile, {
      form: {
        favorite: !v.favorite,
        profile_id: v.id,
      },
    })
      .then(() => {
        ShowSuccessToast(
          `This profile ${
            !v.favorite ? "added to favorite" : "removed from favorite"
          }  list successfully.`
        );
        setProfiles((ps: ProfilesInfo[]) =>
          ps.map((item: ProfilesInfo) =>
            item.id !== v.id ? item : { ...v, favorite: !v.favorite }
          )
        );
      })
      .catch(() => ShowErrorToast("Error updating profile"));
  }

  return (
    <Stl.Container>
      <Form
        onSubmit={() => {}}
        render={({ values }) => (
          <>
            <Stl.HeaderInputsContainer>
              <h3>Network</h3>
              <Stl.HeaderInputs>
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
                <Field name="profiles_count" defaultValue={"10"}>
                  {({ input }) => (
                    <Stl.ShowItems>
                      Show:
                      <DropdownBlue
                        input={input}
                        width={50}
                        options={[
                          { label: "10", value: "10" },
                          { label: "15", value: "15" },
                          { label: "25", value: "25" },
                        ]}
                      />
                    </Stl.ShowItems>
                  )}
                </Field>
              </Stl.HeaderInputs>
            </Stl.HeaderInputsContainer>
            <Stl.HeaderInputsContainer>
              <p>Available Players ({totalNumber && totalNumber.toString()})</p>
              <Field name="player_name" type="input">
                {({ input }) => (
                  <SearchInput
                    input={input}
                    placeholder="Player Name"
                    width={120}
                  />
                )}
              </Field>
            </Stl.HeaderInputsContainer>

            <NetworkContent
              loadingContent={loadingContent}
              content={profiles}
              onClickHeart={onClickFav}
            />
            <RenderButtons
              offset={offset}
              showNum={showNum}
              totalNumber={totalNumber}
              updateContent={updateContent}
              values={values}
            />

            <FormSpy
              subscription={{ values: true }}
              onChange={(v) => updateContent(v.values)}
            />
          </>
        )}
      />
    </Stl.Container>
  );
};
