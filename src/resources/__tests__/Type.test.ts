import { Trello } from "../../index";

const TEST_ID = "d9a04f38b919f23b8cc7bf01";

describe("the Type resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a type for the specified ID", async () => {
    await trello.types(TEST_ID).getType();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/types/${TEST_ID}`);
  });
});
