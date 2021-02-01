export function fieldValidation(
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
