import { Trello } from "../../index";

const TEST_PLUGIN_ID = "60024c859ab0c51945243414";
const TEST_LISTING_ID = "dd7d4048bed6c23daebf1070";

describe("the Plugin resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single plugin", async () => {
    await trello.plugins(TEST_PLUGIN_ID).getPlugin();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/plugins/${TEST_PLUGIN_ID}`);
  });

  test("gets multiple plugins", async () => {
    await trello.plugins().getPlugins();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/plugins`);
  });

  test("gets the member privacy for a plugin", async () => {
    await trello.plugins(TEST_PLUGIN_ID).getMemberPrivacy();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/plugins/${TEST_PLUGIN_ID}/compliance/memberPrivacy`,
    );
  });

  test("adds a listing to a plugin", async () => {
    const TEST_LISTING = {
      name: "Test",
      overview: "Test Overview",
      description: "Test Description",
      locale: "en-us",
    };
    await trello.plugins(TEST_PLUGIN_ID).listings().addListing(TEST_LISTING);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/plugins/${TEST_PLUGIN_ID}/listings`);
    expect(result.config.body).toEqual(JSON.stringify(TEST_LISTING));
  });

  test("updates a plugin", async () => {
    await trello.plugins(TEST_PLUGIN_ID).updatePlugin();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/plugins/${TEST_PLUGIN_ID}`);
  });

  test("updates a plugin listing", async () => {
    const TEST_LISTING = {
      name: "Test",
      overview: "Test Overview",
      description: "Test Description",
      locale: "en-us",
    };
    await trello
      .plugins(TEST_PLUGIN_ID)
      .listings(TEST_LISTING_ID)
      .updateListing(TEST_LISTING);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/plugins/${TEST_PLUGIN_ID}/listings/${TEST_LISTING_ID}`,
    );
    expect(result.config.body).toEqual(JSON.stringify(TEST_LISTING));
  });
});
