export function ToNormalState(string: string): string {
  return (
    string[0].toUpperCase() +
    string
      .split("_")
      .reduce((v, c) => v + " " + c[0].toUpperCase() + c.slice(1))
      .slice(1)
  );
}
