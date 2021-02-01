// From SO
const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validateEmail(value: string): string | undefined {
  return value ? (reg.test(value) ? undefined : "Invalid email") : "Required";
}

export function passwordVal(value: string): string | undefined {
  return value && value.length > 7
    ? undefined
    : value
    ? "Must contain more than 8 characters"
    : "Required";
}

export function confirmPasswordVal(values: Record<string, any>) {
  return function (value: string): string | undefined {
    return value === values.password ? undefined : "Passwords are not equal";
  };
}
