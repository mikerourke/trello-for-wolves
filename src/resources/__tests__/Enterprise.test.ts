import { Trello } from "../../index";

const TEST_ENTERPRISE_ID = "60024c859ab0c51945243414";
const TEST_CHILD_ID = "d9a04f38b919f23b8cc7bf01";

describe("the Enterprise resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single enterprise", async () => {
    await trello.enterprises(TEST_ENTERPRISE_ID).getEnterprise();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/enterprises/${TEST_ENTERPRISE_ID}`);
  });

  test("gets the admins for an enterprise", async () => {
    await trello
      .enterprises(TEST_ENTERPRISE_ID)
      .getAdmins({ fields: "fullName" });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/enterprises/${TEST_ENTERPRISE_ID}/admins`,
    );
    expect(result.url.searchParams.get("fields")).toBe("fullName");
  });

  test("gets the signup URL for an enterprise", async () => {
    await trello.enterprises(TEST_ENTERPRISE_ID).getSignupUrl({
      authenticate: true,
      confirmationAccepted: true,
      returnUrl: "none",
      tosAccepted: true,
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/enterprises/${TEST_ENTERPRISE_ID}/signupUrl`,
    );
    expect(result.url.searchParams.get("authenticate")).toBe("true");
    expect(result.url.searchParams.get("confirmationAccepted")).toBe("true");
    expect(result.url.searchParams.get("returnUrl")).toBe("none");
    expect(result.url.searchParams.get("tosAccepted")).toBe("true");
  });

  test("gets if the enterprise organization is transferrable", async () => {
    await trello
      .enterprises(TEST_ENTERPRISE_ID)
      .organizations(TEST_CHILD_ID)
      .getIfTransferrableToEnterprise();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/enterprises/${TEST_ENTERPRISE_ID}/transferrable/organization/${TEST_CHILD_ID}`,
    );
  });

  test("adds a member as an admin", async () => {
    await trello
      .enterprises(TEST_ENTERPRISE_ID)
      .members(TEST_CHILD_ID)
      .makeAdminForEnterprise();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/enterprises/${TEST_ENTERPRISE_ID}/admins/${TEST_CHILD_ID}`,
    );
  });

  test("removes a member as an admin", async () => {
    await trello
      .enterprises(TEST_ENTERPRISE_ID)
      .members(TEST_CHILD_ID)
      .removeAdminForEnterprise();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/enterprises/${TEST_ENTERPRISE_ID}/admins/${TEST_CHILD_ID}`,
    );
  });

  test("gets the members for an enterprise", async () => {
    await trello
      .enterprises(TEST_ENTERPRISE_ID)
      .members()
      .getMembers();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/enterprises/${TEST_ENTERPRISE_ID}/members`,
    );
  });

  test("gets the organizations for an enterprise", async () => {
    await trello
      .enterprises(TEST_ENTERPRISE_ID)
      .organizations()
      .getOrganizations();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/enterprises/${TEST_ENTERPRISE_ID}/organizations`,
    );
  });

  test("gets the specific organization for an enterprise", async () => {
    await trello
      .enterprises(TEST_ENTERPRISE_ID)
      .organizations(TEST_CHILD_ID)
      .getOrganization();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/enterprises/${TEST_ENTERPRISE_ID}/organizations/${TEST_CHILD_ID}`,
    );
  });
});
