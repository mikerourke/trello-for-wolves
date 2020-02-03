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
      .getMemberships({
        filter: "owners",
        member: true,
        activity: true,
        orgMemberType: true,
        memberFields: "all",
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_PARENT_ID}/memberships`,
    );
    expect(result.url.searchParams.get("filter")).toBe("owners");
    expect(result.url.searchParams.get("member")).toBe("true");
    expect(result.url.searchParams.get("activity")).toBe("true");
    expect(result.url.searchParams.get("orgMemberType")).toBe("true");
    expect(result.url.searchParams.get("member_fields")).toBe("all");
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
