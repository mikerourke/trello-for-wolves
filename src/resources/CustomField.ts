import { TrelloForWolvesError } from "../TrelloForWolvesError";
import { BaseResource } from "./BaseResource";
import { CustomFieldOption } from "./CustomFieldOption";
import {
  AnyParams,
  CustomFieldOptionRecord,
  CustomFieldRecord,
  CustomFieldType,
  NestedActionsParams,
  PositionOrFloat,
  TypedFetch,
} from "../typeDefs";

/**
 * Custom Fields are extra bits of structured data attached to cards when our
 * users need a bit more than what Trello provides. To use them users need to
 * enable the Custom Fields Power-Up.
 * @see https://developers.trello.com/reference#custom-fields
 * @class
 */
export class CustomField extends BaseResource {
  public getCustomField(
    params?: NestedActionsParams,
  ): TypedFetch<CustomFieldRecord> {
    return this.apiGet("/", params as AnyParams);
  }

  public getCustomFields(
    params?: NestedActionsParams,
  ): TypedFetch<CustomFieldRecord[]> {
    return this.apiGet("/", params as AnyParams);
  }

  public addCustomField(params: {
    name: string;
    pos: PositionOrFloat;
    type: CustomFieldType;
    displayCardFront?: boolean;
    options?: CustomFieldOptionRecord[];
  }): TypedFetch<CustomFieldRecord> {
    if (!this.isChildOf("board")) {
      throw new TrelloForWolvesError(
        "You can only call addCustomField() from a board resource",
      );
    }

    const idBoard = this.parentElements[1];
    if (!idBoard) {
      throw new TrelloForWolvesError(
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
