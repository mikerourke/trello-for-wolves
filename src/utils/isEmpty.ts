export function isEmpty<T>(value: T | null | undefined): boolean {
  if (
    typeof value === "undefined" ||
    value === null ||
    typeof value !== "object"
  ) {
    return true;
  }

  return Object.keys(value).length === 0;
}
