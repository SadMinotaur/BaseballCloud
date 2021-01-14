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
    },
  }),
  Styles: {
    menu: (m: any) => ({ ...m, zIndex: 9999, backgroundColor: "#fff" }),
    placeholder: () => ({ display: "none" }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  },
  Margin: styled.div`
    margin: 0 0 10px 0;
  `,
  Label: styled.label<{ isFloating?: boolean }>`
    color: "#667784";
    font-weight: 400;
    z-index: 100;
    left: 10px;
    pointer-events: none;
    position: absolute;
    transition: 0.2s ease all;
    top: ${(props) => (props.isFloating ? `5px` : `35%`)};
    font-size: ${(props) => (props.isFloating ? `0.8rem` : `1.3rem`)};
  `,
};
