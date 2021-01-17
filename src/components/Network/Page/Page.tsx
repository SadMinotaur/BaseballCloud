import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, ToastMessageAnimated } from "react-toastr";
import { Field, Form, FormSpy } from "react-final-form";
import { DropdownBlue } from "../../../utils/common-components/dropdown-blue";
import { InputBlue } from "../../../utils/common-components/input-blue";
import { SearchInput } from "../../../utils/common-components/search-input";
import { Profiles, ProfilesInfo } from "../../../utils/types/network";
import { Queries } from "./../graphql/query";
import {
  ShowSuccessToast,
  ShowErrorToast,
} from "./../../../utils/common-components/toast/toast";
import { NetworkContent } from "./../NetworkContent";
import CommonStyle from "../../../utils/common-styles/styles";
import Stl from "./styles";
import API from "../../../utils/api";
import { FormState } from "final-form";

export const NetworkPage: React.FC = () => {
  let container: ToastContainer | null;

  const [loadingContent, setLoadingContent] = useState<boolean>(true);
  const [totalNumber, setTotalNumber] = useState<number>();
  const [offset, setOffset] = useState<number>(0);
  const [showNum, setShowNum] = useState<number>(10);
  const [profiles, setProfiles] = useState<ProfilesInfo[]>([]);

  type ButtonState = { button: string; state: string };

  function usePagination(
    totalNumber: number,
    offset: number,
    showNum: number
  ): ButtonState[] {
    let pageButtons: ButtonState[] = [];
    const totalPageNumber: number =
      totalNumber % showNum === 0
        ? totalNumber / showNum
        : Math.floor(totalNumber / showNum) + 1;
    switch (totalPageNumber) {
      case 1:
        break;
      case 2: {
        const stateB: boolean = offset / showNum > 1;
        pageButtons.push({ button: "1", state: !stateB ? "cur" : "act" });
        pageButtons.push({ button: "2", state: stateB ? "cur" : "act" });
        break;
      }
      default: {
        const current: number = Math.floor(offset / showNum) + 1;
        let j = current - 1;
        for (let i = 0; i < 3; i++, j++) {
          if (j === 0) j++;
          pageButtons.push({
            button: j.toString(),
            state: current === j ? "cur" : "act",
          });
        }
        const leftSide = j - 2;
        if (leftSide > 0 && leftSide === 1) {
          const oneButton = {
            button: "1",
            state: "act",
          };
          pageButtons =
            leftSide > 1
              ? [
                  oneButton,
                  {
                    button: "...",
                    state: "dis",
                  },
                  ...pageButtons,
                ]
              : [oneButton, ...pageButtons];
        }
        if (j < totalPageNumber) {
          const lastButton = {
            button: totalPageNumber.toString(),
            state: "act",
          };
          pageButtons =
            j + 1 === totalPageNumber
              ? [...pageButtons, lastButton]
              : [
                  ...pageButtons,
                  {
                    button: "...",
                    state: "dis",
                  },
                  lastButton,
                ];
        }
        break;
      }
    }
    console.log(pageButtons);
    return pageButtons;
  }

  // { button: "«", state: offset === 0 ? "dis" : "act" },
  // { button: "»", state: offset + showNum === totalNumber ? "dis" : "act" },

  const buttonsArray = usePagination(
    totalNumber ? totalNumber : 0,
    offset,
    showNum
  );

  function updateContent(fields: FormState<Record<string, any>>): void {
    const v = fields.values;
    const req = {
      ...v,
      age: v.age && parseInt(v.age),
      favorite: v.favorite && parseInt(v.favorite),
      profiles_count: parseInt(v.profiles_count),
    };
    req.profiles_count && setShowNum(req.profiles_count);
    getProfiles(req);
  }

  const getProfiles = useCallback(
    (req: any = { profiles_count: 10, offset: offset }) => {
      setLoadingContent(true);
      API.graphqlPost(Queries.getProfiles, {
        input: { ...req, offset: offset },
      }).then((v: { profiles: Profiles }) => {
        const prof: Profiles = v.profiles;
        setProfiles(prof.profiles);
        setTotalNumber(prof.total_count);
        setLoadingContent(false);
      });
    },
    [offset]
  );

  function onClickFav(v: ProfilesInfo): void {
    API.favProfile({
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
      <CommonStyle.Pagination>
        <CommonStyle.PaginationButDis>«</CommonStyle.PaginationButDis>
        <CommonStyle.PaginationButAct>1</CommonStyle.PaginationButAct>
        <CommonStyle.PaginationBut>2</CommonStyle.PaginationBut>
        <CommonStyle.PaginationBut>3</CommonStyle.PaginationBut>
        <CommonStyle.PaginationButDis>...</CommonStyle.PaginationButDis>
        <CommonStyle.PaginationBut>»</CommonStyle.PaginationBut>
      </CommonStyle.Pagination>
    </Stl.Container>
  );
};
