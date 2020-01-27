import cases from "jest-in-case";
import { isEmpty } from "../isEmpty";

describe("the isEmpty method", () => {
  cases(
    "returns true when the value arg meets requirements",
    options => {
      const result = isEmpty(options.value);

      expect(result).toBe(true);
    },
    [
      {
        name: "when the value arg is undefined",
        value: undefined,
      },
      {
        name: "when the value arg is null",
        value: null,
      },
      {
        name: "when the value arg is an empty object",
        value: {},
      },
      {
        name: "when the value arg is an empty array",
        value: [],
      },
    ],
  );

  cases(
    "returns false when the value arg meets requirements",
    options => {
      const result = isEmpty(options.value);

      expect(result).toBe(false);
    },
    [
      {
        name: "when the value arg is 0",
        value: 0,
      },
      {
        name: "when the value arg is an empty string",
        value: "",
      },
      {
        name: "when the value arg is false",
        value: false,
      },
    ],
  );
});
