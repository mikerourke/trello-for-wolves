import { buildApiUrl } from "../buildApiUrl";

describe("the buildApiUrl method", () => {
  test("returns the correct URL if queryParamsByName are not empty", () => {
    const result = buildApiUrl({
      endpoint: "/test",
      trelloConfig: global.trelloConfig,
      paramsByName: { filter: "all" },
    });

    expect(result).toBe(
      "https://api.trello.com/1/test?filter=all&key=KEY&token=TOKEN",
    );
  });

  test("returns the correct URL if queryParamsByName are empty", () => {
    const result = buildApiUrl({
      endpoint: "/test",
      trelloConfig: global.trelloConfig,
      paramsByName: {},
    });

    expect(result).toBe("https://api.trello.com/1/test?key=KEY&token=TOKEN");
  });
});
