import { BaseResource } from "./BaseResource";
import { isEmpty } from "../utils/isEmpty";
import { TypedFetch } from "../typeDefs";

export type CustomFieldType = "number" | "date" | "text" | "checkbox" | "list";

// TODO: Add function to stringify the "value" regardless of the type.
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

export interface CustomFieldRecord {
  /** The ID of the Custom Field definition. */
  id: string;
  /**
   * The ID of the model that the Custom Field is defined on. This should
   * always be an ID of a board.
   */
  idModel: string;
  /**
   * The type of model that the Custom Field is being defined for. This should
   * always be board.
   */
  modelType: string;
  /**
   * A hash created from the fields of a Custom Field used to manage Custom
   * Fields and values between boards. For more on its use, check out the
   * Grouping Custom Fields Across Boards section of the Custom Fields guide.
   * @see https://developers.trello.com/v1.0/docs/getting-started-custom-fields#section-grouping-custom-fields-across-boards
   */
  fieldGroup: string;
  /**
   * The name of the Custom Field. This is displayed to the user in the
   * Trello clients.
   */
  name: string;
  /**
   * The position of the Custom Field. This will be used to determine the order
   * that Custom Fields should be listed when being shown to the user.
   */
  pos: string;
  /**
   * Determines the type of values that can be used when setting values for
   * Custom Fields on cards.
   */
  type: CustomFieldType;
  /**
   * An array of objects used for Custom Fields of the list type. The objects
   * contain data about the options available for the dropdown.
   */
  options?: CustomFieldListOptionRecord[];
  /** An object that contains this custom fields display properties. */
  display: {
    cardFront: boolean;
  };
}

// TODO: Add handling for cards (https://developers.trello.com/reference#setting-custom-field-values-on-cards).
export class CustomField extends BaseResource {
  public getCustomField(): TypedFetch<CustomFieldRecord> {
    return this.apiGet("/");
  }

  public getCustomFields(): TypedFetch<CustomFieldRecord[]> {
    return this.apiGet("/");
  }

  public getCustomFieldOption(
    idCustomFieldOption: string,
  ): TypedFetch<CustomFieldListOptionRecord> {
    return this.apiGet(`/options/${idCustomFieldOption}`);
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
    const body = this.getBodyWithDisplayCardFront(params);
    return this.apiPost("/", {}, body);
  }

  public addCustomFieldOption(
    option: CustomFieldListOptionRecord,
  ): TypedFetch<CustomFieldListOptionRecord> {
    return this.apiPost("/options", {}, option);
  }

  public updateCustomField(params: {
    name?: string;
    pos?: number;
    displayCardFront?: boolean;
  }): TypedFetch<CustomFieldRecord> {
    if (isEmpty(params)) {
      throw new Error(
        "You must specify at least 1 field to update in `updateCustomField`",
      );
    }
    return this.apiPut("/", {}, params);
  }

  public deleteCustomField(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }

  public deleteCustomFieldOption(
    idCustomFieldOption: string,
  ): TypedFetch<unknown> {
    return this.apiDelete(`/options/${idCustomFieldOption}`);
  }

  private getBodyWithDisplayCardFront<TParams>(
    params: TParams & { displayCardFront?: boolean },
  ): TParams & { display?: { cardFront: boolean } } {
    const { displayCardFront = null, ...rest } = params;
    const body = { ...rest } as TParams;

    if (displayCardFront !== null) {
      return {
        ...body,
        display: {
          cardFront: displayCardFront,
        },
      };
    }

    return params;
  }
}
