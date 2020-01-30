import { buildApiUrl } from "../buildApiUrl";

describe("the buildApiUrl method", () => {
  test("returns the correct URL if queryParamsByName are not empty", () => {
    const result = buildApiUrl({
      endpoint: "/test",
      config: global.trelloConfig,
      queryParamsByName: { filter: "all" },
    });

    expect(result).toBe(
      "https://api.trello.com/1/test?filter=all&key=KEY&token=TOKEN",
    );
  });

  test("returns the correct URL if queryParamsByName are empty", () => {
    const result = buildApiUrl({
      endpoint: "/test",
      config: global.trelloConfig,
      queryParamsByName: {},
    });

    expect(result).toBe("https://api.trello.com/1/test?key=KEY&token=TOKEN");
  });
});
