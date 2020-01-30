import { Trello } from "../index";

const TEST_BOARD_ID = "d9a04f38b919f23b8cc7bf01";

describe("the Trello instance", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("makes an arbitrary fetch call with the makeApiRequest method", async () => {
    await trello.makeApiRequest(`/boards/${TEST_BOARD_ID}/cards`, "GET", {
      fields: "all",
    });

    const result = global.getLastFetchCall();
    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_BOARD_ID}/cards`);
    expect(result.url.searchParams.get("fields")).toBe("all");
  });
});
