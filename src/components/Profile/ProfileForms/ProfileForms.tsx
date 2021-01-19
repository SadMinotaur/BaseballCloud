import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { FormsDropdown } from "./../FormsDropdown";
import {
  FormsDiv,
  Row,
  ButtonProfile,
  WarningText,
  DropdownSpacing,
  CancelPhoto,
  UploadPhoto,
} from "./styles";
import { FormsAbout } from "./../FormsAbout";
import { Queries } from "../graphql/query";
import { TextF } from "./../FormsInput";
import { SectText } from "./../SectionText";
import { GraphqlProfile } from "../../../utils/types/profile";
import { Facilities, School, Team } from "../../../utils/types/req-types";
import CommonStyle from "../../../utils/common-styles/styles";
import PictureProf from "./../../../assets/profileIcon.png";
import API from "../../../utils/api";
import { ToastContainer, ToastMessageAnimated } from "react-toastr";
import {
  ShowErrorUProfileToast,
  ShowSuccessUProfileToast,
} from "../../../utils/common-components/toast/toast";

export const ProfileForms: React.FC<{
  info?: GraphqlProfile;
  onEditEnd: () => void;
}> = ({ info, onEditEnd }) => {
  let container: ToastContainer | null;

  const [defaultPicture, setDefaultPicture] = useState<string>(PictureProf);
  const [pictureUrl, setPictureUrl] = useState<string>();
  const [pictureInfo, setPictureInfo] = useState<File>();

  function required(value: string): string | undefined {
    return value ? undefined : "Required";
  }

  function onSubmitForm(v: any): void {
    API.graphqlPost(Queries.updateProfile, {
      form: {
        ...v,
        avatar: pictureUrl ? pictureUrl : info?.avatar,
        age: parseInt(v.age),
        feet: parseInt(v.feet),
        inches: parseInt(v.inches),
        weight: parseInt(v.weight),
        facilities: [v.facilities],
        teams: [v.teams],
      },
    })
      .then(() => {
        onEditEnd();
        // ShowSuccessUProfileToast(container as ToastContainer);
      })
      .catch(() => {
        // ShowErrorUProfileToast(container as ToastContainer);
      });
  }

  useEffect(() => {
    info &&
      API.getPicture(info.avatar).then((v) =>
        setDefaultPicture(`data:image/jpeg;base64,${v}`)
      );
  }, [info]);

  return (
    <FormsDiv>
      <Form
        onSubmit={onSubmitForm}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <CommonStyle.Toast>
              <ToastContainer
                ref={(ref) => (container = ref)}
                toastMessageFactory={React.createFactory(ToastMessageAnimated)}
              />
            </CommonStyle.Toast>
            <CommonStyle.ProfileContainer>
              <CommonStyle.ProfilePic
                src={
                  pictureInfo
                    ? URL.createObjectURL(pictureInfo)
                    : defaultPicture
                }
              />
              <div>
                <input
                  style={{ display: "none" }}
                  id="my-file"
                  type="file"
                  onChange={(e) =>
                    e.target.files && setPictureInfo(e.target.files[0])
                  }
                />
              </div>
              <label htmlFor="my-file">
                {pictureInfo ? pictureInfo.name : "Choose photo"}
              </label>
              {pictureInfo && (
                <>
                  <UploadPhoto
                    onClick={() =>
                      API.uploadAws(pictureInfo).then((v) => setPictureUrl(v))
                    }
                  >
                    Upload photo
                  </UploadPhoto>
                  <CancelPhoto onClick={() => setPictureInfo(undefined)}>
                    Cancel
                  </CancelPhoto>
                </>
              )}
            </CommonStyle.ProfileContainer>
            <Row>
              <Field
                name="firstName"
                validate={required}
                defaultValue={info?.first_name}
              >
                {({ input, meta }) => (
                  <DropdownSpacing>
                    <TextF input={input} label="First Name*" />
                    {meta.error && meta.touched && (
                      <WarningText>First Name Required</WarningText>
                    )}
                  </DropdownSpacing>
                )}
              </Field>
              <Field
                name="lastname"
                validate={required}
                defaultValue={info?.last_name}
              >
                {({ input, meta }) => (
                  <DropdownSpacing leftMargin={true}>
                    <TextF input={input} label="Last Name*" />
                    {meta.error && meta.touched && (
                      <WarningText>Last Name Required</WarningText>
                    )}
                  </DropdownSpacing>
                )}
              </Field>
            </Row>
            <Field
              name="position_in_game"
              validate={required}
              defaultValue={info?.position}
            >
              {({ input, meta }) => (
                <>
                  <FormsDropdown
                    input={input}
                    placeholder={"Position in Game*"}
                    options={[
                      { label: "Catcher", value: "Catcher" },
                      { label: "First Base", value: "First Base" },
                      { label: "Second Base", value: "Second Base" },
                      { label: "Shortstop", value: "Shortstop" },
                      { label: "Third Base", value: "Third Base" },
                      { label: "Outfield", value: "Outfield" },
                      { label: "Pitcher", value: "Pitcher" },
                    ]}
                  />
                  {meta.error && meta.touched && (
                    <WarningText>Position Required</WarningText>
                  )}
                </>
              )}
            </Field>
            <Field
              name="secondary_position_in_game"
              defaultValue={info?.position2}
            >
              {({ input }) => (
                <FormsDropdown
                  input={input}
                  placeholder="Secondary Position in Game"
                  options={[
                    { value: "-", label: "-" },
                    { value: "Catcher", label: "Catcher" },
                    { value: "First Base", label: "First Base" },
                    { value: "Second Base", label: "Second Base" },
                    { value: "Shortstop", label: "Shortstop" },
                    { value: "Third Base", label: "Third Base" },
                    { value: "Outfield", label: "Outfield" },
                    { value: "Pitcher", label: "Pitcher" },
                  ]}
                />
              )}
            </Field>
            <SectText text="Personal Info" />
            <Field
              name="age"
              validate={required}
              defaultValue={info?.age.toString()}
            >
              {({ input, meta }) => (
                <>
                  <TextF input={input} label="Age*" />
                  {meta.error && meta.touched && (
                    <WarningText>Age Required</WarningText>
                  )}
                </>
              )}
            </Field>
            <Row>
              <Field
                name="feet"
                validate={(v) =>
                  v
                    ? parseInt(v) > 3
                      ? undefined
                      : "Minimum height is 4"
                    : "Feet Required"
                }
                defaultValue={info?.feet.toString()}
              >
                {({ input, meta }) => (
                  <DropdownSpacing>
                    <TextF input={input} label="Feet*" />
                    {meta.error && meta.touched && (
                      <WarningText>{meta.error}</WarningText>
                    )}
                  </DropdownSpacing>
                )}
              </Field>
              <Field name="inches" defaultValue={info?.inches.toString()}>
                {({ input, meta }) => (
                  <DropdownSpacing leftMargin={true}>
                    <TextF input={input} label="Inches" />
                    {meta.error && meta.touched && (
                      <WarningText>Inches Required</WarningText>
                    )}
                  </DropdownSpacing>
                )}
              </Field>
            </Row>
            <Field
              name="weight"
              validate={(v) =>
                v
                  ? parseInt(v) > 39
                    ? undefined
                    : "Minimum weight is 40"
                  : "Weight Required"
              }
              defaultValue={info?.weight.toString()}
            >
              {({ input, meta }) => (
                <>
                  <TextF input={input} label="Weight*" />
                  {meta.error && meta.touched && (
                    <WarningText>Weight Required</WarningText>
                  )}
                </>
              )}
            </Field>
            <Row>
              <Field
                name="throw"
                validate={required}
                defaultValue={info?.throws_hand}
              >
                {({ input, meta }) => (
                  <DropdownSpacing>
                    <FormsDropdown
                      input={input}
                      options={[
                        { value: "R", label: "R" },
                        { value: "L", label: "L" },
                      ]}
                      placeholder="Throw*"
                    />
                    {meta.error && meta.touched && (
                      <WarningText>Throws Required</WarningText>
                    )}
                  </DropdownSpacing>
                )}
              </Field>
              <Field
                name="bats"
                validate={required}
                defaultValue={info?.bats_hand}
              >
                {({ input, meta }) => (
                  <DropdownSpacing leftMargin={true}>
                    <FormsDropdown
                      input={input}
                      options={[
                        { value: "R", label: "R" },
                        { value: "L", label: "L" },
                      ]}
                      placeholder="Bats*"
                    />
                    {meta.error && meta.touched && (
                      <WarningText>Bats Required</WarningText>
                    )}
                  </DropdownSpacing>
                )}
              </Field>
            </Row>
            <SectText text="School" />
            <Field name="school" defaultValue={info?.school}>
              {({ input }) => (
                <FormsDropdown
                  input={input}
                  placeholder="School"
                  loadOptions={API.graphqlPost(Queries.getSchools, {
                    search: "",
                  }).then((v) =>
                    v.schools.schools.map((resp: School) => ({
                      value: resp.id,
                      label: resp.name,
                    }))
                  )}
                />
              )}
            </Field>
            <Field name="school_year" defaultValue={info?.school_year}>
              {({ input }) => (
                <FormsDropdown
                  input={input}
                  options={[
                    { value: "Freshman", label: "Freshman" },
                    { value: "Sophomore", label: "Sophomore" },
                    { value: "Junior", label: "Junior" },
                    { value: "Senior", label: "Senior" },
                    { value: "None", label: "None" },
                  ]}
                  placeholder={"School Year"}
                />
              )}
            </Field>
            <Field name="teams" defaultValue={info?.teams[0]}>
              {({ input }) => (
                <FormsDropdown
                  input={input}
                  placeholder="Team"
                  loadOptions={API.graphqlPost(Queries.getTeams, {
                    search: "",
                  }).then((v) =>
                    v.teams.teams.map((resp: Team) => ({
                      value: resp.id,
                      label: resp.name,
                    }))
                  )}
                />
              )}
            </Field>
            <SectText text="Facility" />
            <Field name="facilities" defaultValue={info?.facilities[0]}>
              {({ input }) => (
                <FormsDropdown
                  input={input}
                  placeholder="Facility"
                  multiple={true}
                  loadOptions={API.graphqlPost(Queries.getFacilities, {
                    search: "",
                  }).then((v) =>
                    v.facilities.facilities.map((resp: Facilities) => ({
                      value: resp.id,
                      label: resp.u_name,
                    }))
                  )}
                />
              )}
            </Field>
            <SectText text="About" />
            <Field
              name="about"
              component="textarea"
              defaultValue={info?.biography}
            >
              {({ input }) => (
                <FormsAbout
                  input={input}
                  placeholder="Describe yourself in a few words"
                />
              )}
            </Field>
            <WarningText>* Fill out the required fields</WarningText>
            <Row>
              <ButtonProfile
                onClick={() => {
                  info && onEditEnd();
                }}
                type="reset"
              >
                Cancel
              </ButtonProfile>
              <ButtonProfile borderBlue={true} type="submit">
                Save
              </ButtonProfile>
            </Row>
          </form>
        )}
      />
    </FormsDiv>
  );
};
