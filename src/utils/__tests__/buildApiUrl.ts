import { buildApiUrl } from "../buildApiUrl";

describe("the buildApiUrl method", () => {
  test("returns the correct URL if isReturnOnly = true queryParamsByName are not empty", () => {
    const result = buildApiUrl({
      endpoint: "/test",
      config: global.trelloConfig,
      queryParamsByName: { filter: "all" },
      isReturnOnly: true,
    });

    expect(result).toBe("/test?filter=all");
  });

  test("returns the correct URL if isReturnOnly = true and queryParamsByName are empty", () => {
    const result = buildApiUrl({
      endpoint: "/test",
      config: global.trelloConfig,
      queryParamsByName: {},
      isReturnOnly: true,
    });

    expect(result).toBe("/test");
  });
});
