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
    indicatorSeparator: () => ({
      display: "none",
    }),
  },
  Margin: styled.div`
    margin: 0 0 10px 0;
  `,
};
