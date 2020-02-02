import { TrelloForWolvesError } from "../TrelloForWolvesError";
import { BaseResource } from "./BaseResource";
import { ColorName, PositionOrFloat, TypedFetch } from "../typeDefs";

type CustomFieldOptionValueRecord =
  | { text: string }
  | { number: number }
  | { date: Date | string }
  | { checked: boolean };

export interface CustomFieldOptionRecord {
  color: ColorName | string;
  pos: PositionOrFloat;
  value: CustomFieldOptionValueRecord;
}

export class CustomFieldOption extends BaseResource {
  public getOption(): TypedFetch<CustomFieldOptionRecord> {
    return this.apiGet("/");
  }

  public getOptions(): TypedFetch<CustomFieldOptionRecord[]> {
    return this.apiGet("/");
  }

  /**
   * This is the same as `getOptions()`, I added it to make more sense in the
   * context of a card resource.
   */
  public getCustomFieldItems(): TypedFetch<CustomFieldOptionRecord[]> {
    return this.apiGet("/");
  }

  public addOption(
    option: CustomFieldOptionRecord,
  ): TypedFetch<CustomFieldOptionRecord> {
    const body = this.stringifyOptionValue(option);

    if (this.isChildOf("card")) {
      return this.apiPut("/", {}, body);
    }

    return this.apiPost("/", {}, body);
  }

  public updateOption(
    option: CustomFieldOptionRecord,
  ): TypedFetch<CustomFieldOptionRecord> {
    if (!this.isChildOf("card")) {
      throw new TrelloForWolvesError("You can only call updateOption() from a parent card");
    }

    const body = this.stringifyOptionValue(option);
    return this.apiPut("/", {}, body);
  }

  public deleteOption(): TypedFetch<unknown> {
    if (this.isChildOf("card")) {
      if (this.pathElements.length > 5) {
        this.pathElements.pop();
      }

      return this.apiPut("/", {}, { value: "", key: "", token: "" });
    }

    return this.apiDelete("/");
  }

  private stringifyOptionValue(
    option: CustomFieldOptionRecord,
  ): Record<string, string> {
    const validOption = { ...option };

    const [[key, value]] = Object.entries(validOption.value);
    validOption.value[key] = value.toString();

    return (validOption as unknown) as Record<string, string>;
  }
}
