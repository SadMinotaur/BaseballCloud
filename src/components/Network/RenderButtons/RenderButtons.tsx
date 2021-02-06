import React from "react";
import { ButtonState } from "../../../utils/types/network";
import CommonStyle from "../../../common-styles/styles";
import usePagination from "../../../utils/usePagination";

export const RenderButtons: React.FC<{
  updateContent: (fields: any, offsetC?: number) => void;
  values: any;
  offset: number;
  totalNumber: number;
  showNum: number;
}> = ({ values, updateContent, offset, totalNumber, showNum }) => {
  const buttonsArray: ButtonState[] = usePagination(
    totalNumber,
    offset,
    showNum
  );

  return (
    <>
      {buttonsArray.length !== 0 && (
        <CommonStyle.Pagination>
          <CommonStyle.PaginationButton
            key={"«"}
            state={offset === 0 ? "dis" : "act"}
            onClick={() => {
              const offs: number = offset - showNum;
              if (offs < 0) return;
              updateContent(values, offs);
            }}
          >
            «
          </CommonStyle.PaginationButton>
          {buttonsArray.map((v: ButtonState, i: number) => (
            <CommonStyle.PaginationButton
              key={v.button + i}
              onClick={() => {
                const offs: number = (parseInt(v.button) - 1) * showNum;
                updateContent(values, offs);
              }}
              state={v.state}
            >
              {v.button}
            </CommonStyle.PaginationButton>
          ))}
          <CommonStyle.PaginationButton
            key={"»"}
            state={totalNumber - showNum <= offset ? "dis" : "act"}
            onClick={() => {
              const offs: number = offset + showNum;
              if (offs > totalNumber) return;
              updateContent(values, offs);
            }}
          >
            »
          </CommonStyle.PaginationButton>
        </CommonStyle.Pagination>
      )}
    </>
  );
};
