import { Trello } from "../../index";

const TEST_PARENT_ID = "dd7d4048bed6c23daebf1070";
const TEST_ORGANIZATION_ID = "d9a04f38b919f23b8cc7bf01";
const TEST_CHILD_ID = "a9e2418d8b71eb8e5ec6d5e8";

describe("the Organization resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single organization", async () => {
    await trello.organizations(TEST_ORGANIZATION_ID).getOrganization();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}`,
    );
  });

  test("gets multiple organizations", async () => {
    await trello
      .members("me")
      .organizations()
      .getOrganizations();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/members/me/organizations`);
  });

  test("gets filtered organizations", async () => {
    await trello
      .members("me")
      .organizations()
      .getOrganizationsFilteredBy("public");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/members/me/organizations`);
    expect(result.url.searchParams.get("filter")).toBe("public");
  });

  test("gets organization field value", async () => {
    await trello.organizations(TEST_ORGANIZATION_ID).getFieldValue("name");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/name`,
    );
  });

  test("gets the deltas for an organization", async () => {
    await trello.organizations(TEST_ORGANIZATION_ID).getDeltas();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/deltas`,
    );
  });

  test("gets the plugin data for an organization", async () => {
    await trello.organizations(TEST_ORGANIZATION_ID).getPluginData();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/pluginData`,
    );
  });

  test("gets the tags for an organization", async () => {
    await trello.organizations(TEST_ORGANIZATION_ID).getTags();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/tags`,
    );
  });

  test("gets the exports status for an organization", async () => {
    await trello.organizations(TEST_ORGANIZATION_ID).getExports();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/exports`,
    );
  });

  test("throws an error if trying to get if can transfer to an enterprise from a non-enterprise resource", async () => {
    expect.assertions(1);

    try {
      await trello
        .organizations(TEST_ORGANIZATION_ID)
        .getIfTransferrableToEnterprise();
    } catch (err) {
      expect(err.message).toMatch(/from an enterprise resource/gi);
    }
  });

  test("gets if the organization is transferrable", async () => {
    await trello
      .enterprises(TEST_PARENT_ID)
      .organizations(TEST_ORGANIZATION_ID)
      .getIfTransferrableToEnterprise();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/enterprises/${TEST_PARENT_ID}/transferrable/organization/${TEST_ORGANIZATION_ID}`,
    );
  });

  test("adds a new organization", async () => {
    await trello.organizations().addOrganization({
      displayName: "Test",
      desc: "Test organization",
      name: "test-org",
      website: "https://test.com",
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/organizations`);
    expect(result.url.searchParams.get("displayName")).toBe("Test");
    expect(result.url.searchParams.get("desc")).toBe("Test organization");
    expect(result.url.searchParams.get("name")).toBe("test-org");
    expect(result.url.searchParams.get("website")).toBe("https://test.com");
  });

  test("uploads a logo for an organization", async () => {
    const testFile = new File(["test"], "test.txt");
    await trello.organizations(TEST_ORGANIZATION_ID).uploadLogo(testFile);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/logo`,
    );
    expect(result.config.body.get("file")).toEqual(testFile);
  });

  test("adds tags to an organization", async () => {
    await trello.organizations(TEST_ORGANIZATION_ID).addTag("test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/tags`,
    );
    expect(result.url.searchParams.get("name")).toBe("test");
  });

  test("starts the export for an organization", async () => {
    await trello
      .organizations(TEST_ORGANIZATION_ID)
      .startExport({ attachments: true });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/exports`,
    );
    expect(result.url.searchParams.get("attachments")).toBe("true");
  });

  test("updates an organization", async () => {
    await trello.organizations(TEST_ORGANIZATION_ID).updateOrganization({
      displayName: "Test",
      desc: "Test organization",
      name: "test-org",
      website: "https://test.com",
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}`,
    );
    expect(result.url.searchParams.get("displayName")).toBe("Test");
    expect(result.url.searchParams.get("desc")).toBe("Test organization");
    expect(result.url.searchParams.get("name")).toBe("test-org");
    expect(result.url.searchParams.get("website")).toBe("https://test.com");
  });

  test("updates the organization's description", async () => {
    await trello.organizations(TEST_ORGANIZATION_ID).updateDescription("Test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/desc`,
    );
    expect(result.url.searchParams.get("value")).toBe("Test");
  });

  test("updates the organization's display name", async () => {
    await trello.organizations(TEST_ORGANIZATION_ID).updateDisplayName("Test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/displayName`,
    );
    expect(result.url.searchParams.get("value")).toBe("Test");
  });

  test("updates the organization's display name", async () => {
    await trello.organizations(TEST_ORGANIZATION_ID).updateName("test-org");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/name`,
    );
    expect(result.url.searchParams.get("value")).toBe("test-org");
  });

  test("updates the organization's website", async () => {
    await trello
      .organizations(TEST_ORGANIZATION_ID)
      .updateWebsite("https://test.com");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/website`,
    );
    expect(result.url.searchParams.get("value")).toBe("https://test.com");
  });

  test("throws an error if trying to transfer to an enterprise from a non-enterprise resource", async () => {
    expect.assertions(1);

    try {
      await trello.organizations().transferToEnterprise();
    } catch (err) {
      expect(err.message).toMatch(/from an enterprise resource/gi);
    }
  });

  test("throws an error if the organization ID is not specified when transferring to an organization", async () => {
    expect.assertions(1);

    try {
      await trello
        .enterprises(TEST_PARENT_ID)
        .organizations()
        .transferToEnterprise();
    } catch (err) {
      expect(err.message).toMatch(/you must pass an organization ID/gi);
    }
  });

  test("transfers an organization to an enterprise when the organization ID is specified", async () => {
    await trello
      .enterprises(TEST_PARENT_ID)
      .organizations(TEST_ORGANIZATION_ID)
      .transferToEnterprise();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/enterprises/${TEST_PARENT_ID}/organizations`,
    );
    expect(result.url.searchParams.get("idOrganization")).toBe(
      TEST_ORGANIZATION_ID,
    );
  });

  test("deletes an organization", async () => {
    await trello.organizations(TEST_ORGANIZATION_ID).deleteOrganization();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}`,
    );
  });

  test("deletes an organization's logo", async () => {
    await trello.organizations(TEST_ORGANIZATION_ID).deleteLogo();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/logo`,
    );
  });

  test("deletes a tag from an organization", async () => {
    await trello.organizations(TEST_ORGANIZATION_ID).deleteTag(TEST_CHILD_ID);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/tags/${TEST_CHILD_ID}`,
    );
  });

  test("throws an error if trying to remove from an enterprise from a non-enterprise resource", async () => {
    expect.assertions(1);

    try {
      await trello.organizations().removeFromEnterprise();
    } catch (err) {
      expect(err.message).toMatch(/from an enterprise resource/gi);
    }
  });

  test("removes an organization from an enterprise", async () => {
    await trello
      .enterprises(TEST_PARENT_ID)
      .organizations(TEST_ORGANIZATION_ID)
      .removeFromEnterprise();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/enterprises/${TEST_PARENT_ID}/organizations/${TEST_ORGANIZATION_ID}`,
    );
  });

  test("gets the actions for an organization", async () => {
    await trello
      .organizations(TEST_ORGANIZATION_ID)
      .actions()
      .getActions();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/actions`,
    );
  });

  test("gets the boards for an organization", async () => {
    await trello
      .organizations(TEST_ORGANIZATION_ID)
      .boards()
      .getBoards();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/boards`,
    );
  });

  test("gets a specific member for an organization", async () => {
    await trello
      .organizations(TEST_ORGANIZATION_ID)
      .members(TEST_CHILD_ID)
      .getMembers();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/members/${TEST_CHILD_ID}`,
    );
  });

  test("gets the members for an organization", async () => {
    await trello
      .organizations(TEST_ORGANIZATION_ID)
      .members()
      .getMembers();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/members`,
    );
  });

  test("gets the membersInvited for an organization", async () => {
    await trello
      .organizations(TEST_ORGANIZATION_ID)
      .membersInvited()
      .getMembers();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/membersInvited`,
    );
  });

  test("gets a specific membership for an organization", async () => {
    await trello
      .organizations(TEST_ORGANIZATION_ID)
      .memberships(TEST_CHILD_ID)
      .getMembership();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/memberships/${TEST_CHILD_ID}`,
    );
  });

  test("gets the memberships for an organization", async () => {
    await trello
      .organizations(TEST_ORGANIZATION_ID)
      .memberships()
      .getMemberships();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/memberships`,
    );
  });

  test("updates the associated domain pref for an organization", async () => {
    await trello
      .organizations(TEST_ORGANIZATION_ID)
      .prefs()
      .updateAssociatedDomain("test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/prefs/associatedDomain`,
    );
    expect(result.url.searchParams.get("value")).toBe("test");
  });

  test("updates the board visibility restriction pref for an organization", async () => {
    await trello
      .organizations(TEST_ORGANIZATION_ID)
      .prefs()
      .updateBoardVisibilityRestriction("private", "admin");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/prefs/boardVisibilityRestrict/private`,
    );
    expect(result.url.searchParams.get("value")).toBe("admin");
  });

  test("updates the external members disabled pref for an organization", async () => {
    await trello
      .organizations(TEST_ORGANIZATION_ID)
      .prefs()
      .updateExternalMembersDisabled(true);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/prefs/externalMembersDisabled`,
    );
    expect(result.url.searchParams.get("value")).toBe("true");
  });

  test("updates the Google Apps version pref for an organization", async () => {
    await trello
      .organizations(TEST_ORGANIZATION_ID)
      .prefs()
      .updateGoogleAppsVersion(2);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/prefs/googleAppsVersion`,
    );
    expect(result.url.searchParams.get("value")).toBe("2");
  });

  test("updates the org invite restrict pref for an organization", async () => {
    await trello
      .organizations(TEST_ORGANIZATION_ID)
      .prefs()
      .updateOrgInviteRestrict("test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/prefs/orgInviteRestrict`,
    );
    expect(result.url.searchParams.get("value")).toBe("test");
  });

  test("updates the permission level pref for an organization", async () => {
    await trello
      .organizations(TEST_ORGANIZATION_ID)
      .prefs()
      .updatePermissionLevel("private");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/prefs/permissionLevel`,
    );
    expect(result.url.searchParams.get("value")).toBe("private");
  });

  test("removes the associated domain pref for an organization", async () => {
    await trello
      .organizations(TEST_ORGANIZATION_ID)
      .prefs()
      .removeAssociatedDomain();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/prefs/associatedDomain`,
    );
  });

  test("removes the org invite restrict pref for an organization", async () => {
    await trello
      .organizations(TEST_ORGANIZATION_ID)
      .prefs()
      .removeOrgInviteRestrict();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/organizations/${TEST_ORGANIZATION_ID}/prefs/orgInviteRestrict`,
    );
  });
});
