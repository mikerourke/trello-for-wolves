import { Trello } from "../../index";

const TEST_NOTIFICATION_ID = "d9a04f38b919f23b8cc7bf01";

describe("the Notification resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single notification", async () => {
    await trello.notifications(TEST_NOTIFICATION_ID).getNotification();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/notifications/${TEST_NOTIFICATION_ID}`,
    );
  });

  test("gets multiple notifications", async () => {
    await trello.members("me").notifications().getNotifications();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/members/me/notifications`);
  });

  test("gets a notification field value", async () => {
    await trello.notifications(TEST_NOTIFICATION_ID).getFieldValue("data");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/notifications/${TEST_NOTIFICATION_ID}/data`,
    );
  });

  test("gets filtered notifications", async () => {
    await trello
      .members("me")
      .notifications()
      .getNotificationsFilteredBy("all");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/members/me/notifications`);
    expect(result.url.searchParams.get("filter")).toBe("all");
  });

  test("gets the notification's display value", async () => {
    await trello.notifications(TEST_NOTIFICATION_ID).getDisplay();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/notifications/${TEST_NOTIFICATION_ID}/display`,
    );
  });

  test("gets the notification's entities value", async () => {
    await trello.notifications(TEST_NOTIFICATION_ID).getEntities();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/notifications/${TEST_NOTIFICATION_ID}/entities`,
    );
  });

  test("updates a notification", async () => {
    await trello.notifications(TEST_NOTIFICATION_ID).updateNotification({
      unread: true,
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/notifications/${TEST_NOTIFICATION_ID}`,
    );
    expect(result.url.searchParams.get("unread")).toBe("true");
  });

  test("updates the unread value of a notification", async () => {
    await trello.notifications(TEST_NOTIFICATION_ID).updateUnreadStatus(true);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/notifications/${TEST_NOTIFICATION_ID}/unread`,
    );
    expect(result.url.searchParams.get("value")).toBe("true");
  });

  test("marks all notifications as read", async () => {
    await trello.notifications().markAllAsRead();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/notifications/all/read`);
  });

  test("gets the board for a notification", async () => {
    await trello.notifications(TEST_NOTIFICATION_ID).board().getBoard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/notifications/${TEST_NOTIFICATION_ID}/board`,
    );
  });

  test("gets the card for a notification", async () => {
    await trello.notifications(TEST_NOTIFICATION_ID).card().getCard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/notifications/${TEST_NOTIFICATION_ID}/card`,
    );
  });

  test("gets the list for a notification", async () => {
    await trello.notifications(TEST_NOTIFICATION_ID).list().getList();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/notifications/${TEST_NOTIFICATION_ID}/list`,
    );
  });

  test("gets the member for a notification", async () => {
    await trello.notifications(TEST_NOTIFICATION_ID).member().getMember();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/notifications/${TEST_NOTIFICATION_ID}/member`,
    );
  });

  test("gets the member creator for a notification", async () => {
    await trello
      .notifications(TEST_NOTIFICATION_ID)
      .memberCreator()
      .getMember();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/notifications/${TEST_NOTIFICATION_ID}/memberCreator`,
    );
  });

  test("gets the organization for a notification", async () => {
    await trello
      .notifications(TEST_NOTIFICATION_ID)
      .organization()
      .getOrganization();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/notifications/${TEST_NOTIFICATION_ID}/organization`,
    );
  });
});
