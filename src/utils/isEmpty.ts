/**
 * Returns true if the specified value is null, undefined, an empty object or
 * an empty array.
 */
export function isEmpty<T>(value: T | null | undefined): boolean {
  if (typeof value === "undefined" || value === null) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }

  // The value is a number, string, or boolean. We don't want to return
  // true if the falsy condition is met because it's still a valid value:
  return false;
}
