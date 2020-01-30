import { Trello } from "../../index";

const TEST_PARENT_ID = "d9a04f38b919f23b8cc7bf01";
const TEST_MEMBERSHIP_ID = "dd7d4048bed6c23daebf1070";

describe("the Membership resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single membership", async () => {
    await trello
      .organizations(TEST_PARENT_ID)
      .memberships(TEST_MEMBERSHIP_ID)
      .getMembership();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_PARENT_ID}/memberships/${TEST_MEMBERSHIP_ID}`,
    );
  });

  test("gets multiple memberships", async () => {
    await trello
      .organizations(TEST_PARENT_ID)
      .memberships()
      .getMemberships();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_PARENT_ID}/memberships`,
    );
  });

  test("gets nested memberships", async () => {
    await trello
      .organizations(TEST_PARENT_ID)
      .memberships()
      .getNestedMemberships("active");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/organizations/${TEST_PARENT_ID}`);
    expect(result.url.searchParams.get("memberships")).toBe("active");
  });

  test("throws an error if the membership ID isn't specified when updating from a board", async () => {
    expect.assertions(1);

    try {
      await trello
        .boards(TEST_PARENT_ID)
        .memberships()
        .updateMembership({ type: "admin" });
    } catch (err) {
      expect(err.message).toMatch(/must pass a membership ID/gi);
    }
  });

  test("updates the membership from a board", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .memberships(TEST_MEMBERSHIP_ID)
      .updateMembership({ type: "admin" });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/memberships/${TEST_MEMBERSHIP_ID}`,
    );
    expect(result.url.searchParams.get("type")).toBe("admin");
    expect(result.url.searchParams.get("idMembership")).toBe(
      TEST_MEMBERSHIP_ID,
    );
  });
});
