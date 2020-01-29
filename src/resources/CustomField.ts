import { BaseResource } from "./BaseResource";
import { TypedFetch } from "../typeDefs";

export type CustomFieldType = "number" | "date" | "text" | "checkbox" | "list";

type CustomFieldListOptionValue =
  | { text: string }
  | { number: number }
  | { date: string }
  | { checked: boolean };

export interface CustomFieldListOptionRecord {
  color: string;
  pos: number;
  value: CustomFieldListOptionValue;
}

/**
 * The data corresponding to a custom field.
 * @typedef {Object} CustomFieldRecord
 * @property id The ID of the Custom Field definition.
 * @property idModel The ID of the model that the Custom Field is defined on. This
 *                   should always be an ID of a board.
 * @property modelType The type of model that the Custom Field is being defined for.
 *                     This should always be "board".
 * @property fieldGroup A hash created from the fields of a Custom Field used to manage
 *                      Custom Fields and values between boards. For more on its use,
 *                      check out the Grouping Custom Fields Across Boards section of
 *                      the Custom Fields guide.
 *                      @see https://developers.trello.com/v1.0/docs/getting-started-custom-fields#section-grouping-custom-fields-across-boards
 * @property name The name of the Custom Field. This is displayed to the user in the Trello clients.
 * @property pos The position of the Custom Field. This will be used to determine the
 *               order that Custom Fields should be listed when being shown to the user.
 * @property type Determines the type of values that can be used when setting values for
 *                Custom Fields on cards.
 * @property options An array of objects used for Custom Fields of the list type. The
 *                   objects contain data about the options available for the dropdown.
 * @property display An object that contains this custom fields display properties.
 */
export interface CustomFieldRecord {
  id: string;
  idModel: string;
  modelType: string;
  fieldGroup: string;
  name: string;
  pos: string;
  type: CustomFieldType;
  options?: CustomFieldListOptionRecord[];
  display: {
    cardFront: boolean;
  };
}

type NestedResponse =
  | { customFields: CustomFieldRecord[] }
  | { customFieldItems: CustomFieldRecord[] };

/**
 * Custom Fields are extra bits of structured data attached to cards when our
 * users need a bit more than what Trello provides. To use them users need to
 * enable the Custom Fields Power-Up.
 * @see https://developers.trello.com/reference#custom-fields
 * @class
 */
// TODO: Add handling for cards (https://developers.trello.com/reference#setting-custom-field-values-on-cards).
export class CustomField extends BaseResource {
  public getCustomField(): TypedFetch<CustomFieldRecord> {
    return this.apiGet("/");
  }

  public getCustomFieldOption(
    idCustomFieldOption: string,
  ): TypedFetch<CustomFieldListOptionRecord> {
    return this.apiGet(`/options/${idCustomFieldOption}`);
  }

  public getCustomFields(): TypedFetch<CustomFieldRecord[]> {
    return this.apiGet("/");
  }

  public getNestedCustomFields<TPayload extends object>(params?: {
    customFields?: boolean;
  }): TypedFetch<TPayload & NestedResponse> {
    return this.apiGetNested(params);
  }

  public getCustomFieldOptions(): TypedFetch<CustomFieldListOptionRecord[]> {
    return this.apiGet("/options");
  }

  public addCustomField(params: {
    idModel: string;
    name: string;
    pos: string;
    type: CustomFieldType;
    // The only value value for this is "board":
    modelType?: "board";
    displayCardFront?: boolean;
    options?: CustomFieldListOptionRecord[];
  }): TypedFetch<CustomFieldRecord> {
    const validBody = params;
    if (validBody.displayCardFront) {
      validBody["display_cardFront"] = validBody.displayCardFront;
      delete validBody.displayCardFront;
    }

    return this.apiPost("/", {}, validBody);
  }

  public addCustomFieldOption(
    option: CustomFieldListOptionRecord,
  ): TypedFetch<CustomFieldListOptionRecord> {
    const body = this.stringifyOptionValue(option);

    if (this.isChildOf("card")) {
      return this.apiPut("/item", {}, body);
    }

    return this.apiPost("/options", {}, body);
  }

  public updateCustomField(params: {
    name?: string;
    pos?: number;
    displayCardFront?: boolean;
  }): TypedFetch<CustomFieldRecord> {
    const validBody = params;
    if (validBody.displayCardFront) {
      validBody["display/cardFront"] = validBody.displayCardFront;
      delete validBody.displayCardFront;
    }

    return this.apiPut("/", {}, validBody);
  }

  public updateCustomFieldOption(
    option: CustomFieldListOptionRecord,
  ): TypedFetch<CustomFieldListOptionRecord> {
    if (!this.isChildOf("card")) {
      throw new Error(
        "You can only call updateCustomFieldOption() from a parent card",
      );
    }

    const body = this.stringifyOptionValue(option);
    return this.apiPut("/item", {}, body);
  }

  public deleteCustomField(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }

  public deleteCustomFieldOption(
    idCustomFieldOption: string,
  ): TypedFetch<unknown> {
    return this.apiDelete(`/options/${idCustomFieldOption}`);
  }

  private stringifyOptionValue(
    option: CustomFieldListOptionRecord,
  ): Record<string, string> {
    // TODO: Add this functionality (https://developers.trello.com/reference#customfielditemsid).
    return (option as unknown) as Record<string, string>;
  }
}
