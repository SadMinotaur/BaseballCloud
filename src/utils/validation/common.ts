export function noValidation(value: string): undefined {
  return undefined;
}

export function requiredValue(message?: string) {
  return function (v: string): string | undefined {
    return v ? undefined : message ? message : "Required";
  };
}
