import { ButtonState } from "./../utils/types/network";

export default function usePagination(
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
    case 0:
      break;
    case 1:
      break;
    case 2: {
      const stateB: boolean = offset / showNum > 1;
      pageButtons = [
        { button: "1", state: !stateB ? "cur" : "act" },
        { button: "2", state: stateB ? "cur" : "act" },
      ];

      break;
    }
    default: {
      const current: number =
        offset % showNum === 0
          ? offset / showNum + 1
          : Math.floor(offset / showNum) + 2;
      let j: number = current - 1;
      for (let i = 0; i < 3; i++, j++) {
        if (j === 0) j++;
        if (j > totalPageNumber) {
          pageButtons = [
            {
              button: (totalPageNumber - 2).toString(),
              state: "act",
            },
            ...pageButtons,
          ];
        } else {
          pageButtons = [
            ...pageButtons,
            {
              button: j.toString(),
              state: current === j ? "cur" : "act",
            },
          ];
        }
      }
      const leftSide = current - 1;
      if (leftSide > 1) {
        const oneButton = {
          button: "1",
          state: "act",
        };
        pageButtons =
          leftSide > 2
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
      if (--j < totalPageNumber) {
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
  return pageButtons;
}
