import { BaseResource } from "./BaseResource";
import {
  CustomFieldOption,
  CustomFieldOptionRecord,
} from "./CustomFieldOption";
import { PositionOrFloat, TypedFetch } from "../typeDefs";

export type CustomFieldType = "number" | "date" | "text" | "checkbox" | "list";

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
  pos: PositionOrFloat;
  type: CustomFieldType;
  options?: CustomFieldOptionRecord[];
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

  public getCustomFields(): TypedFetch<CustomFieldRecord[]> {
    return this.apiGet("/");
  }

  public getNestedCustomFields<TPayload extends object>(): TypedFetch<
    TPayload & NestedResponse
  > {
    return this.apiGetNested({ customFields: true });
  }

  public addCustomField(params: {
    name: string;
    pos: PositionOrFloat;
    type: CustomFieldType;
    displayCardFront?: boolean;
    options?: CustomFieldOptionRecord[];
  }): TypedFetch<CustomFieldRecord> {
    if (!this.isChildOf("board")) {
      throw new Error(
        "You can only call addCustomField() from a board resource",
      );
    }

    const idBoard = this.parentElements[1];
    if (!idBoard) {
      throw new Error(
        "You must pass an ID into the board resource when calling addCustomField()",
      );
    }

    type Body<T> = {
      [P in keyof T]?: T[P];
    };
    const body = { ...params } as Partial<Body<CustomFieldRecord>> & {
      displayCardFront: boolean;
    };

    if (body.displayCardFront) {
      body["display_cardFront"] = body.displayCardFront;
      delete body.displayCardFront;
    }

    // These are required when creating a custom field:
    body.idModel = idBoard;
    body.modelType = "board";

    return this.apiPost("/", undefined, body);
  }

  public updateCustomField(params: {
    name?: string;
    pos?: PositionOrFloat;
    displayCardFront?: boolean;
  }): TypedFetch<CustomFieldRecord> {
    const body = { ...params };
    if (body.displayCardFront) {
      body["display/cardFront"] = body.displayCardFront;
      delete body.displayCardFront;
    }

    return this.apiPut("/", {}, body);
  }

  public deleteCustomField(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }

  public options(idOption: string = ""): CustomFieldOption {
    const groupName = this.isChildOf("card") ? "item" : "options";

    return new CustomFieldOption(this.config, this.pathElements, groupName, {
      identifier: idOption,
    });
  }
}
