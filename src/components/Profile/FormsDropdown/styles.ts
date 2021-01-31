import styled from "styled-components";

// Works only this way
export const Stl = {
  DropdownTheme: (theme: any) => ({
    ...theme,
    borderRadius: 4,
    margin: 10,
    colors: {
      ...theme.colors,
      neutral0: "#EFF1F3",
      primary: "#48BBFF",
      neutral80: "#667784",
    },
  }),
  Styles: {
    control: (b: any) => ({
      ...b,
      border: 0,
      ":hover": {
        backgroundColor: "#fff",
      },
    }),
    menu: (m: any) => ({ ...m, zIndex: 9999, backgroundColor: "#fff" }),
    placeholder: () => ({ display: "none" }),
    clearIndicator: () => ({ display: "none" }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  },
  Margin: styled.div`
    margin: 0 0 10px 0;
  `,
  Label: styled.label<{ isFocused: boolean; hasValue: boolean }>`
    visibility: visible;
    color: "#667784";
    font-weight: 400;
    z-index: 100;
    left: 10px;
    pointer-events: none;
    position: absolute;
    transition: 0.2s ease all;
    top: ${(props) => (props.isFocused ? `3px` : `35%`)};
    font-size: ${(props) => (props.isFocused ? `0.8rem` : `1.3rem`)};
    ${(props) => props.hasValue && !props.isFocused && `visibility: hidden;`}
  `,
  WarningText: styled.p`
    color: #f05f62;
    font-size: 1.6rem;
  `,
};
