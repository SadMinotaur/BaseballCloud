import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, ToastMessageAnimated } from "react-toastr";
import { Spinner } from "../../../utils/common-components/spinner";
import { Field, Form, FormSpy } from "react-final-form";
import { DropdownBlue } from "../../../utils/common-components/dropdown-blue";
import { InputBlue } from "../../../utils/common-components/input-blue";
import { SearchInput } from "../../../utils/common-components/search-input";
import { Profiles } from "./../../../utils/network-types/types";
import { Queries } from "./../graphql/query";
import {
  ShowSuccessToast,
  ShowErrorToast,
} from "./../../../utils/common-components/toast/toast";
import CommonStyle from "../../../utils/common-styles/styles";
import Stl from "./styles";
import API from "../../../utils/api";

export const NetworkPage: React.FC = () => {
  let container: ToastContainer | null = null;

  const [loadingContent, setLoadingContent] = useState<boolean>(true);
  const [profiles, setProfiles] = useState<Profiles>();

  const getProfiles = useCallback(() => {
    setLoadingContent(true);
    API.graphqlPost(Queries.getProfiles, {
      input: { profiles_count: 10, offset: 0 },
    }).then((v) => {
      setProfiles(v.data.profiles);
      setLoadingContent(false);
    });
  }, []);

  useEffect(() => {
    getProfiles();
    return () => {};
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
                <Field name="profiles_count">
                  {({ input }) => (
                    <DropdownBlue
                      input={input}
                      width={100}
                      options={[
                        { label: "Show: 10", value: "10" },
                        { label: "Show: 15", value: "15" },
                        { label: "Show: 20", value: "20" },
                      ]}
                    />
                  )}
                </Field>
              </Stl.HeaderInputs>
            </Stl.HeaderInputsContainer>
            <Stl.HeaderInputsContainer>
              <p>
                Available Players (
                {profiles?.total_count && profiles?.total_count.toString()})
              </p>
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
            <FormSpy
              subscription={{ values: true }}
              onChange={(v) => {
                console.log(v);
              }}
            />
          </>
        )}
      />
      <CommonStyle.TabHead>
        <CommonStyle.TabHeadText width={19}>
          Player Name
        </CommonStyle.TabHeadText>
        <CommonStyle.TabHeadText width={10}>Sessions</CommonStyle.TabHeadText>
        <CommonStyle.TabHeadText width={23}>School</CommonStyle.TabHeadText>
        <CommonStyle.TabHeadText width={23}>Teams</CommonStyle.TabHeadText>
        <CommonStyle.TabHeadText width={15}>Age</CommonStyle.TabHeadText>
        <CommonStyle.TabHeadText width={8}>Favorite</CommonStyle.TabHeadText>
      </CommonStyle.TabHead>
      {loadingContent ? (
        <Spinner loading={loadingContent} />
      ) : (
        <>
          <CommonStyle.Tab>
            <CommonStyle.TabText width={19}>Player Name</CommonStyle.TabText>
            <CommonStyle.TabText width={10}>Sessions</CommonStyle.TabText>
            <CommonStyle.TabText width={23}>School</CommonStyle.TabText>
            <CommonStyle.TabText width={23}>Teams</CommonStyle.TabText>
            <CommonStyle.TabText width={15}>Age</CommonStyle.TabText>
            <CommonStyle.TabText width={8}>Favorite</CommonStyle.TabText>
          </CommonStyle.Tab>
        </>
      )}
    </Stl.Container>
  );
};
