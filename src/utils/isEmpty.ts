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

  return Object.keys(value).length === 0;
}
