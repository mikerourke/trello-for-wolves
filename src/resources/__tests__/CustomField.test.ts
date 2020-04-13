import { Trello } from "../../index";

const TEST_PARENT_ID = "d9a04f38b919f23b8cc7bf01";
const TEST_CUSTOM_FIELD_ID = "dd7d4048bed6c23daebf1070";
const TEST_OPTION_ID = "34064f7fa445aee0e2e0ff2c";

describe("the CustomField resource", () => {
  const trello = new Trello(global.trelloConfig);

  beforeEach(() => {
    global.captureFetchMock();
  });

  afterEach(() => {
    global.resetFetchMocks();
  });

  test("gets a single custom field", async () => {
    await trello.customFields(TEST_CUSTOM_FIELD_ID).getCustomField();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(`/1/customFields/${TEST_CUSTOM_FIELD_ID}`);
  });

  test("gets multiple custom fields", async () => {
    await trello.boards(TEST_PARENT_ID).customFields().getCustomFields();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/customFields`,
    );
  });

  test("throws an error when trying to add a custom field from a non-board resource", async () => {
    expect.assertions(1);

    try {
      await trello.customFields().addCustomField({
        name: "Test",
        pos: "top",
        type: "number",
      });
    } catch (err) {
      expect(err.message).toMatch(/you can only call addCustomField/gi);
    }
  });

  test("throws an error when trying to add a custom field from a board resource with a missing ID", async () => {
    expect.assertions(1);

    try {
      await trello.boards().customFields().addCustomField({
        name: "Test",
        pos: "top",
        type: "number",
      });
    } catch (err) {
      expect(err.message).toMatch(
        /You must pass an ID into the board resource/gi,
      );
    }
  });

  test("adds a new custom field when displayCardFront is specified", async () => {
    const TEST_CUSTOM_FIELD = {
      name: "Test",
      pos: "top",
      type: "number",
      displayCardFront: true,
    } as const;

    await trello
      .boards(TEST_PARENT_ID)
      .customFields()
      .addCustomField(TEST_CUSTOM_FIELD);
    const result = global.getLastFetchCall();
    const expected = JSON.stringify({
      ...TEST_CUSTOM_FIELD,
      idModel: TEST_PARENT_ID,
      modelType: "board",
    }).replace("displayCardFront", "display_cardFront");

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/customFields`,
    );
    expect(result.config.body).toBe(expected);
  });

  test("adds a new custom field when displayCardFront is not specified", async () => {
    const TEST_CUSTOM_FIELD = {
      name: "Test",
      pos: "top",
      type: "number",
    } as const;

    await trello
      .boards(TEST_PARENT_ID)
      .customFields()
      .addCustomField(TEST_CUSTOM_FIELD);
    const result = global.getLastFetchCall();
    const expected = JSON.stringify({
      ...TEST_CUSTOM_FIELD,
      idModel: TEST_PARENT_ID,
      modelType: "board",
    });

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(
      `/1/boards/${TEST_PARENT_ID}/customFields`,
    );
    expect(result.config.body).toBe(expected);
  });

  test("updates a custom field when displayCardFront is specified", async () => {
    const TEST_CUSTOM_FIELD = {
      name: "Test",
      pos: "top",
      type: "number",
      displayCardFront: true,
    } as const;

    await trello
      .customFields(TEST_CUSTOM_FIELD_ID)
      .updateCustomField(TEST_CUSTOM_FIELD);
    const result = global.getLastFetchCall();
    const expected = JSON.stringify(TEST_CUSTOM_FIELD).replace(
      "displayCardFront",
      "display/cardFront",
    );

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/customFields/${TEST_CUSTOM_FIELD_ID}`);
    expect(result.config.body).toBe(expected);
  });

  test("updates a custom field when displayCardFront is not specified", async () => {
    const TEST_CUSTOM_FIELD = {
      name: "Test",
      pos: "top",
      type: "number",
    } as const;

    await trello
      .customFields(TEST_CUSTOM_FIELD_ID)
      .updateCustomField(TEST_CUSTOM_FIELD);
    const result = global.getLastFetchCall();
    const expected = JSON.stringify(TEST_CUSTOM_FIELD);

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(`/1/customFields/${TEST_CUSTOM_FIELD_ID}`);
    expect(result.config.body).toBe(expected);
  });

  test("deletes a custom field", async () => {
    await trello.customFields(TEST_CUSTOM_FIELD_ID).deleteCustomField();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(`/1/customFields/${TEST_CUSTOM_FIELD_ID}`);
  });

  test("gets a specific option for a custom field", async () => {
    await trello
      .customFields(TEST_CUSTOM_FIELD_ID)
      .options(TEST_OPTION_ID)
      .getOption();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/customFields/${TEST_CUSTOM_FIELD_ID}/options/${TEST_OPTION_ID}`,
    );
  });

  test("gets all options for a custom field", async () => {
    await trello.customFields(TEST_CUSTOM_FIELD_ID).options().getOptions();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("GET");
    expect(result.url.pathname).toBe(
      `/1/customFields/${TEST_CUSTOM_FIELD_ID}/options`,
    );
  });

  test("adds an option to a custom field", async () => {
    const TEST_OPTION = {
      color: "black",
      pos: "top",
      value: {
        text: "Test",
      },
    } as const;

    await trello
      .customFields(TEST_CUSTOM_FIELD_ID)
      .options()
      .addOption(TEST_OPTION);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("POST");
    expect(result.url.pathname).toBe(
      `/1/customFields/${TEST_CUSTOM_FIELD_ID}/options`,
    );
    expect(result.config.body).toBe(JSON.stringify(TEST_OPTION));
  });

  test("adds an option to a custom field from a card", async () => {
    const TEST_OPTION = {
      color: "black",
      pos: "top",
      value: {
        text: "Test",
      },
    } as const;

    await trello
      .cards(TEST_PARENT_ID)
      .customField(TEST_CUSTOM_FIELD_ID)
      .options()
      .addOption(TEST_OPTION);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/card/${TEST_PARENT_ID}/customField/${TEST_CUSTOM_FIELD_ID}/item`,
    );
    expect(result.config.body).toBe(JSON.stringify(TEST_OPTION));
  });

  test("throws an error when trying to update a custom field option from a non-card resource", async () => {
    expect.assertions(1);

    try {
      await trello
        .customFields()
        .options()
        .updateOption({
          color: "black",
          pos: "top",
          value: {
            checked: true,
          },
        });
    } catch (err) {
      expect(err.message).toMatch(/You can only call updateOption/gi);
    }
  });

  test("updates a custom field option from a card", async () => {
    const TEST_OPTION = {
      color: "black",
      pos: "top",
      value: {
        checked: true,
      },
    } as const;

    await trello
      .cards(TEST_PARENT_ID)
      .customField(TEST_CUSTOM_FIELD_ID)
      .options()
      .updateOption(TEST_OPTION);
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/card/${TEST_PARENT_ID}/customField/${TEST_CUSTOM_FIELD_ID}/item`,
    );
    expect(result.config.body).toBe(JSON.stringify(TEST_OPTION));
  });

  test("deletes a custom field option from a custom field", async () => {
    await trello
      .customFields(TEST_CUSTOM_FIELD_ID)
      .options(TEST_OPTION_ID)
      .deleteOption();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("DELETE");
    expect(result.url.pathname).toBe(
      `/1/customFields/${TEST_CUSTOM_FIELD_ID}/options/${TEST_OPTION_ID}`,
    );
  });

  test("deletes a custom field option from a card if an ID is passed to the option", async () => {
    await trello
      .cards(TEST_PARENT_ID)
      .customField(TEST_CUSTOM_FIELD_ID)
      .options(TEST_OPTION_ID)
      .deleteOption();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/card/${TEST_PARENT_ID}/customField/${TEST_CUSTOM_FIELD_ID}/item`,
    );
    expect(result.config.body).toBe(
      JSON.stringify({ value: "", key: "", token: "" }),
    );
  });

  test("deletes a custom field option from a card if an ID is not passed to the option", async () => {
    await trello
      .cards(TEST_PARENT_ID)
      .customField(TEST_CUSTOM_FIELD_ID)
      .options()
      .deleteOption();
    const result = global.getLastFetchCall();

    expect(result.config.method).toBe("PUT");
    expect(result.url.pathname).toBe(
      `/1/card/${TEST_PARENT_ID}/customField/${TEST_CUSTOM_FIELD_ID}/item`,
    );
    expect(result.config.body).toBe(
      JSON.stringify({ value: "", key: "", token: "" }),
    );
  });
});
