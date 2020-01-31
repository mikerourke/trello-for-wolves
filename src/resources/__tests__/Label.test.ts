import { Trello } from "../../index";

const TEST_PARENT_ID = "d9a04f38b919f23b8cc7bf01";
const TEST_LABEL_ID = "60024c859ab0c51945243414";

describe("the Label resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single label", async () => {
    await trello.labels(TEST_LABEL_ID).getLabel();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/labels/${TEST_LABEL_ID}`);
  });

  test("gets multiple labels", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .labels()
      .getLabels();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/labels`);
  });

  test("gets nested labels", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .labels()
      .getNestedLabels({ labels: "all" });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}`);
    expect(result.url.searchParams.get("labels")).toBe("all");
  });

  test("throws an error if the idBoard isn't present when adding a label", async () => {
    expect.assertions(1);

    try {
      await trello.labels().addLabel({
        name: "Test",
        color: "black",
      });
    } catch (err) {
      expect(err.message).toMatch(/must specify the "idBoard"/);
    }
  });

  test("adds a new label", async () => {
    await trello.labels().addLabel({
      name: "Test",
      color: "black",
      idBoard: TEST_PARENT_ID,
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/labels`);
    expect(result.url.searchParams.get("name")).toBe("Test");
    expect(result.url.searchParams.get("color")).toBe("black");
    expect(result.url.searchParams.get("idBoard")).toBe(TEST_PARENT_ID);
  });

  test("adds a new label from a board", async () => {
    await trello
      .boards(TEST_PARENT_ID)
      .labels()
      .addLabel({
        name: "Test",
        color: "black",
      });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(`/1/boards/${TEST_PARENT_ID}/labels`);
    expect(result.url.searchParams.get("name")).toBe("Test");
    expect(result.url.searchParams.get("color")).toBe("black");
    expect(result.url.searchParams.get("idBoard")).toBe(TEST_PARENT_ID);
  });

  test("throws an error if associating a label from a non-card resource", async () => {
    expect.assertions(1);

    try {
      await trello.labels().associateLabel();
    } catch (err) {
      expect(err.message).toMatch(/You can only call associateLabel/gi);
    }
  });

  test("updates a label", async () => {
    await trello.labels(TEST_LABEL_ID).updateLabel({
      name: "Test",
      color: "green",
    });
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/labels/${TEST_LABEL_ID}`);
    expect(result.url.searchParams.get("name")).toBe("Test");
    expect(result.url.searchParams.get("color")).toBe("green");
  });

  test("updates the color of a label", async () => {
    await trello.labels(TEST_LABEL_ID).updateColor("lime");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/labels/${TEST_LABEL_ID}/color`);
    expect(result.url.searchParams.get("value")).toBe("lime");
  });

  test("updates the name of a label", async () => {
    await trello.labels(TEST_LABEL_ID).updateName("Test");
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/labels/${TEST_LABEL_ID}/name`);
    expect(result.url.searchParams.get("value")).toBe("Test");
  });

  test("deletes a label", async () => {
    await trello.labels(TEST_LABEL_ID).deleteLabel();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(`/1/labels/${TEST_LABEL_ID}`);
  });

  test("throws an error if dissociating a label from a non-card resource", async () => {
    expect.assertions(1);

    try {
      await trello.labels().dissociateLabel();
    } catch (err) {
      expect(err.message).toMatch(/You can only call dissociateLabel/gi);
    }
  });

  test("throws an error if dissociating a label without an ID", async () => {
    expect.assertions(1);

    try {
      await trello
        .cards(TEST_PARENT_ID)
        .labels()
        .dissociateLabel();
    } catch (err) {
      expect(err.message).toMatch(/You must pass a label ID into the labels/gi);
    }
  });

  test("gets the board for a label", async () => {
    await trello
      .labels(TEST_LABEL_ID)
      .board()
      .getBoard();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/labels/${TEST_LABEL_ID}/board`);
  });
});
