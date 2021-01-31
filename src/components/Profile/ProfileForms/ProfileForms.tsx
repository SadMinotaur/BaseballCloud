import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { ToNormalState } from "../../../utils/convert-name";
import { FormsDropdown } from "./../FormsDropdown";
import {
  FormsDiv,
  Row,
  ButtonProfile,
  WarningText,
  PhotoLabel,
  DropdownSpacing,
} from "./styles";
import { FormsAbout } from "./../FormsAbout";
import { Graphql } from "../graphql/query";
import { TextF } from "./../FormsInput";
import { SectText } from "./../SectionText";
import {
  GraphqlProfile,
  Options,
  UpdateProfile,
} from "../../../utils/types/profile";
import { Facilities, School, Team } from "../../../utils/types/req-types";
import CommonStyle from "../../../utils/common-styles/styles";
import PictureProf from "./../../../assets/profileIcon.png";
import API from "../../../utils/api";

export const ProfileForms: React.FC<{
  ShowErrorToast: (text: string) => void;
  ShowSuccessToast: (text: string) => void;
  onEditEnd: (profile: GraphqlProfile) => void;
  info: GraphqlProfile;
  onCancel?: () => void;
}> = ({ info, onEditEnd, ShowSuccessToast, ShowErrorToast, onCancel }) => {
  const [defaultPicture, setDefaultPicture] = useState<string>(PictureProf);
  const [pictureUrl, setPictureUrl] = useState<string>();
  const [pictureInfo, setPictureInfo] = useState<File>();
  const [labelState, setLabelState] = useState<boolean>(true);

  function onSubmitForm(v: UpdateProfile): void {
    API.graphqlPost(Graphql.updateProfile, {
      form: {
        ...v,
        id: info.id,
        age: parseInt(v.age),
        feet: parseInt(v.feet),
        inches: parseInt(v.inches),
        weight: parseInt(v.weight),
        throws_hand: v.throws_hand.value,
        bats_hand: v.bats_hand.value,
        position: v.position.value,
        position2: v.position2?.value,
        school: v.school?.value,
        school_year: v.school_year?.value,
        teams: v.teams ? v.teams.map((v: Options) => v?.value) : [],
        facilities: v.facilities
          ? v.facilities.map((v: Options) => v?.value)
          : [],
        avatar: pictureUrl ? pictureUrl : info?.avatar,
      },
    })
      .then((v) => {
        onEditEnd(v.update_profile.profile);
        ShowSuccessToast("Profile has been updated successfully");
      })
      .catch(() => ShowErrorToast("Error occurred"));
  }

  const getSchools = () =>
    API.graphqlPost(Graphql.getSchools, {
      search: "",
    }).then((v) =>
      v.schools.schools.map((resp: School) => ({
        value: resp,
        label: resp.name,
      }))
    );

  const getTeams = () =>
    API.graphqlPost(Graphql.getTeams, {
      search: "",
    }).then((v) =>
      v.teams.teams.map((resp: Team) => ({
        value: resp,
        label: resp.name,
      }))
    );

  const getFacilities = () =>
    API.graphqlPost(Graphql.getFacilities, {
      search: "",
    }).then((v) =>
      v.facilities.facilities.map((resp: Facilities) => ({
        value: resp,
        label: resp.u_name,
      }))
    );

  useEffect(() => {
    info.avatar &&
      API.getPicture(info.avatar).then((v) =>
        setDefaultPicture(`data:image/jpeg;base64,${v}`)
      );
  }, [info]);

  function fieldValidation(
    less: string,
    lessNum: number,
    max: string,
    maxNum: number,
    req: string | undefined
  ) {
    return (v: string) => {
      if (v) {
        if (parseInt(v) >= lessNum) {
          if (parseInt(v) > maxNum) {
            return max;
          } else {
            return undefined;
          }
        } else {
          return less;
        }
      } else return req;
    };
  }

  return (
    <FormsDiv>
      <Form
        onSubmit={onSubmitForm}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
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
                  onChange={(e) => {
                    e.target.files && setPictureInfo(e.target.files[0]);
                    setLabelState(false);
                  }}
                />
              </div>
              <PhotoLabel htmlFor="my-file">
                {labelState && "Choose photo"}
              </PhotoLabel>
              <DropdownSpacing>
                <PhotoLabel>
                  {pictureInfo && !labelState && pictureInfo.name}
                </PhotoLabel>
              </DropdownSpacing>
              {!labelState && (
                <>
                  <PhotoLabel
                    colorBlue={true}
                    onClick={() =>
                      pictureInfo &&
                      API.uploadPic(pictureInfo).then((v: string) => {
                        setPictureUrl(v);
                        setLabelState(true);
                      })
                    }
                  >
                    Upload photo
                  </PhotoLabel>
                  <PhotoLabel
                    onClick={() => {
                      setPictureInfo(undefined);
                      setPictureUrl(undefined);
                      setLabelState(true);
                    }}
                  >
                    Cancel
                  </PhotoLabel>
                </>
              )}
            </CommonStyle.ProfileContainer>
            <Row>
              <TextF
                name="first_name"
                label="First Name*"
                defaultValue={info.first_name}
                validate={(v: string) =>
                  v ? undefined : "First Name Required"
                }
              />
              <TextF
                name="last_name"
                label="Last Name*"
                space={true}
                defaultValue={info.last_name}
                validate={(v: string) => (v ? undefined : "Last Name Required")}
              />
            </Row>
            <FormsDropdown
              placeholder="Position in Game*"
              name="position"
              validate={(v: string) => (v ? undefined : "Position Required")}
              defaultValue={
                info.position && {
                  label: ToNormalState(info.position),
                  value: info.position,
                }
              }
              options={[
                { label: "Catcher", value: "catcher" },
                { label: "First Base", value: "first_base" },
                { label: "Second Base", value: "second_base" },
                { label: "Shortstop", value: "shortstop" },
                { label: "Third Base", value: "third_base" },
                { label: "Outfield", value: "outfield" },
                { label: "Pitcher", value: "pitcher" },
              ]}
            />
            <FormsDropdown
              placeholder="Secondary Position in Game"
              name="position2"
              validate={(v: string) => undefined}
              defaultValue={
                info.position2 && {
                  label: ToNormalState(info.position2),
                  value: info.position2,
                }
              }
              options={[
                { label: "-", value: "" },
                { label: "Catcher", value: "catcher" },
                { label: "First Base", value: "first_base" },
                { label: "Second Base", value: "second_base" },
                { label: "Shortstop", value: "shortstop" },
                { label: "Third Base", value: "third_base" },
                { label: "Outfield", value: "outfield" },
                { label: "Pitcher", value: "pitcher" },
              ]}
            />
            <SectText textSize={220} text="Personal Info" />
            <TextF
              name="age"
              label="Age*"
              defaultValue={info.age?.toString()}
              validate={fieldValidation(
                "You must be older than 0",
                0,
                "Must not be older than 30",
                30,
                "Age Required"
              )}
            />
            <Row>
              <TextF
                name="feet"
                label="Feet*"
                defaultValue={info.feet?.toString()}
                validate={fieldValidation(
                  "Minimum height is 4",
                  4,
                  "Maximum height is 7",
                  7,
                  "Feet Required"
                )}
              />
              <TextF
                name="inches"
                label="Inches"
                space={true}
                defaultValue={info.inches?.toString()}
                validate={fieldValidation(
                  "Inches can be from 0 to 11",
                  0,
                  "Inches can be from 0 to 11",
                  11,
                  undefined
                )}
              />
            </Row>
            <TextF
              name="weight"
              label="Weight*"
              defaultValue={info.weight?.toString()}
              validate={fieldValidation(
                "Minimal weight is 50 lbs",
                50,
                "Maximum weight is 350 lbs",
                350,
                "Weight Required"
              )}
            />
            <Row>
              <DropdownSpacing>
                <FormsDropdown
                  placeholder="Throw*"
                  name="throws_hand"
                  validate={(v) => (v ? undefined : "Throws Required")}
                  defaultValue={
                    info.throws_hand
                      ? {
                          label: ToNormalState(info.throws_hand),
                          value: info.throws_hand,
                        }
                      : undefined
                  }
                  options={[
                    { value: "R", label: "R" },
                    { value: "L", label: "L" },
                  ]}
                />
              </DropdownSpacing>
              <DropdownSpacing leftMargin={true}>
                <FormsDropdown
                  placeholder="Bats*"
                  name="bats_hand"
                  validate={(v) => (v ? undefined : "Bats Required")}
                  defaultValue={
                    info.bats_hand
                      ? {
                          label: ToNormalState(info.bats_hand),
                          value: info.bats_hand,
                        }
                      : undefined
                  }
                  options={[
                    { value: "r", label: "R" },
                    { value: "l", label: "L" },
                  ]}
                />
              </DropdownSpacing>
            </Row>
            <SectText text="School" />
            <FormsDropdown
              placeholder="School"
              name="school"
              loadOptions={getSchools}
              validate={(v) => undefined}
              defaultValue={
                info.school && {
                  label: ToNormalState(info.school.name),
                  value: info.school,
                }
              }
            />
            <FormsDropdown
              placeholder="School Year"
              name="school_year"
              validate={(v) => undefined}
              defaultValue={
                info.school_year && {
                  label: ToNormalState(info.school_year),
                  value: info.school_year,
                }
              }
              options={[
                { value: "Freshman", label: "Freshman" },
                { value: "Sophomore", label: "Sophomore" },
                { value: "Junior", label: "Junior" },
                { value: "Senior", label: "Senior" },
                { value: "None", label: "None" },
              ]}
            />
            <FormsDropdown
              placeholder="Team"
              multiple={true}
              name="teams"
              loadOptions={getTeams}
              validate={(v) => undefined}
              defaultValue={
                info && info.teams.length !== 0
                  ? info.teams.map((v) => ({
                      label: v.name,
                      value: v,
                    }))
                  : undefined
              }
            />
            <SectText text="Facility" />
            <FormsDropdown
              multiple={true}
              placeholder="Facility"
              name="facilities"
              loadOptions={getFacilities}
              validate={(v) => undefined}
              defaultValue={
                info?.facilities[0]
                  ? {
                      label: info?.facilities[0].u_name,
                      value: info?.facilities[0],
                    }
                  : undefined
              }
            />
            <SectText text="About" />
            <FormsAbout
              biography={info.biography}
              placeholder="Describe yourself in a few words"
            />
            {!info && <WarningText>* Fill out the required fields</WarningText>}
            <Row>
              <ButtonProfile
                onClick={() => {
                  form.reset();
                  onCancel && onCancel();
                }}
                type="reset"
                disabled={submitting || pristine}
              >
                Cancel
              </ButtonProfile>
              <ButtonProfile
                borderBlue={true}
                disabled={submitting || pristine}
                type="submit"
              >
                Save
              </ButtonProfile>
            </Row>
          </form>
        )}
      />
    </FormsDiv>
  );
};
