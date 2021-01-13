import styled from "styled-components";
import styledComponentsTS from "styled-components-ts";
import faLock from "./../assets/lock-solid.svg";
import faUser from "./../assets/user-solid.svg";
import faCheck from "./../assets/check-solid.svg";

const CommonStyle = {
  ProfileContainer: styled.div`
    width: 100%;
    text-align: center;
    margin: 0 0 10px 0;
  `,
  ProfilePic: styled.img`
    height: 100px;
    width: 100px;
    border-radius: 50%;
    object-fit: cover;
  `,
  Toast: styled.div`
    position: absolute;
    top: 10px;
    right: 320px;
  `,
  InputFormInput: styledComponentsTS<{ imageLock: boolean }>(styled.input)`
    background-image: url(${(p) =>
      p.imageLock !== undefined ? (p.imageLock ? faLock : faUser) : faCheck});
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 13px;
    background-size: 15px;
    background-color: #eff1f3;
    padding: 6px 12px 10px 37px;
    width: 420px;
    height: 50px;
    border-radius: 4px;
    font-size: 16px;
    line-height: 1.13;
    font-weight: 400;
    color: #667784;
    border: 1px solid transparent;
    margin-bottom: 15px;
  `,
};
export default CommonStyle;
