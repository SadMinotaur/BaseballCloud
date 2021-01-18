import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, ToastMessageAnimated } from "react-toastr";
import { Field, Form, FormSpy } from "react-final-form";
import { DropdownBlue } from "../../../utils/common-components/dropdown-blue";
import { InputBlue } from "../../../utils/common-components/input-blue";
import { SearchInput } from "../../../utils/common-components/search-input";
import { CommonQueries } from "./../../../utils/graphql";
import {
  ButtonState,
  Profiles,
  ProfilesInfo,
} from "../../../utils/types/network";
import { Queries } from "./../graphql/query";
import {
  ShowSuccessToast,
  ShowErrorToast,
} from "./../../../utils/common-components/toast/toast";
import { NetworkContent } from "./../NetworkContent";
import { FormState } from "final-form";
import usePagination from "./../../../utils/usePagination";
import CommonStyle from "../../../utils/common-styles/styles";
import Stl from "./styles";
import API from "../../../utils/api";

export const NetworkPage: React.FC = () => {
  let container: ToastContainer | null;

  const [loadingContent, setLoadingContent] = useState<boolean>(true);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [showNum, setShowNum] = useState<number>(10);
  const [profiles, setProfiles] = useState<ProfilesInfo[]>([]);

  const buttonsArray = usePagination(totalNumber, offset, showNum);

  function updateContent(fields: FormState<Record<string, any>>): void {
    const v = fields.values;
    const req = {
      ...v,
      offset: offset,
      age: v.age && parseInt(v.age),
      favorite: v.favorite && parseInt(v.favorite),
    };
    setShowNum(parseInt(v.profiles_count));
    getProfiles(req);
  }

  const getProfiles = useCallback(
    (req: any = { profiles_count: showNum, offset: offset }) => {
      setLoadingContent(true);
      API.graphqlPost(Queries.getProfiles, {
        input: { ...req, profiles_count: showNum, offset: offset },
      }).then((v: { profiles: Profiles }) => {
        const prof: Profiles = v.profiles;
        setProfiles(prof.profiles);
        setTotalNumber(prof.total_count);
        setLoadingContent(false);
      });
    },
    [offset, showNum]
  );

  function onClickFav(v: ProfilesInfo): void {
    API.graphqlPost(CommonQueries.favoriteProfile, {
      form: {
        favorite: !v.favorite,
        profile_id: v.id,
      },
    })
      .then(() => {
        ShowSuccessToast(v.favorite, container as ToastContainer);
        setProfiles((ps: ProfilesInfo[]) =>
          ps.map((item: ProfilesInfo) =>
            item.id !== v.id ? item : { ...v, favorite: !v.favorite }
          )
        );
      })
      .catch(() => ShowErrorToast(container as ToastContainer));
  }

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

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
                    <DropdownBlue
                      input={input}
                      width={100}
                      options={[
                        { label: "Show: 10", value: "10" },
                        { label: "Show: 15", value: "15" },
                        { label: "Show: 25", value: "25" },
                      ]}
                    />
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
            <FormSpy subscription={{ values: true }} onChange={updateContent} />
          </>
        )}
      />
      <NetworkContent
        loadingContent={loadingContent}
        content={profiles}
        onClickHeart={onClickFav}
      />
      {buttonsArray.length !== 0 && (
        <CommonStyle.Pagination>
          <CommonStyle.PaginationButton
            key={"«"}
            state={offset === 0 ? "dis" : "act"}
            onClick={() => setOffset((ps) => (ps !== 0 ? ps - showNum : 0))}
          >
            «
          </CommonStyle.PaginationButton>
          {buttonsArray.map((v: ButtonState, i: number) => (
            <CommonStyle.PaginationButton
              key={v.button + i}
              onClick={() => setOffset((parseInt(v.button) - 1) * showNum)}
              state={v.state}
            >
              {v.button}
            </CommonStyle.PaginationButton>
          ))}
          <CommonStyle.PaginationButton
            key={"»"}
            state={totalNumber - showNum <= offset ? "dis" : "act"}
            onClick={() =>
              setOffset((ps) =>
                ps + showNum !== totalNumber ? ps + showNum : ps
              )
            }
          >
            »
          </CommonStyle.PaginationButton>
        </CommonStyle.Pagination>
      )}
    </Stl.Container>
  );
};
