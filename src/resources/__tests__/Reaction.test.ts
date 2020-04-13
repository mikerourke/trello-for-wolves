import { Trello } from "../../index";

const TEST_ACTION_ID = "d9a04f38b919f23b8cc7bf01";
const TEST_REACTION_ID = "60024c859ab0c51945243414";

describe("the Reaction resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets the emoji", async () => {
    await trello.emoji().getEmoji();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/emoji`);
  });

  test("gets a single reaction", async () => {
    await trello
      .actions(TEST_ACTION_ID)
      .reactions(TEST_REACTION_ID)
      .getReaction();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/actions/${TEST_ACTION_ID}/reactions/${TEST_REACTION_ID}`,
    );
  });

  test("gets multiple reactions", async () => {
    await trello.actions(TEST_ACTION_ID).reactions().getReactions();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}/reactions`);
  });

  test("adds a new reaction", async () => {
    const TEST_REACTION = {
      shortName: "Test",
      skinVariation: "1F3FF",
    };
    await trello.actions(TEST_ACTION_ID).reactions().addReaction(TEST_REACTION);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/actions/${TEST_ACTION_ID}/reactions`);
    expect(result.config.body).toEqual(JSON.stringify(TEST_REACTION));
  });

  test("deletes a reaction", async () => {
    await trello
      .actions(TEST_ACTION_ID)
      .reactions(TEST_REACTION_ID)
      .deleteReaction();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/actions/${TEST_ACTION_ID}/reactions/${TEST_REACTION_ID}`,
    );
  });
});
