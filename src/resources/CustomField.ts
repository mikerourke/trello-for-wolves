import { BaseResource } from "./BaseResource";
import { TypedFetch } from "../typeDefs";

export type CustomFieldType = "number" | "date" | "text" | "checkbox" | "list";

// TODO: Add function to stringify the "value" regardless of the type.
type CustomFieldListOptionValue =
  | {
      text: string;
    }
  | {
      number: number;
    }
  | {
      date: string;
    }
  | {
      checked: boolean;
    };

export interface CustomFieldListOption {
  color: string;
  pos: number;
  value: CustomFieldListOptionValue;
}

export class CustomField extends BaseResource {
  public getCustomFields(): TypedFetch<unknown> {
    return this.apiGet("/");
  }

  public getCustomField(): TypedFetch<unknown> {
    return this.apiGet("/");
  }

  public getOptions(): TypedFetch<unknown> {
    return this.apiGet("/options");
  }

  public getOptionsField(idCustomFieldOption: string): TypedFetch<unknown> {
    return this.apiGet(`/options/${idCustomFieldOption}`);
  }

  public addCustomField(params: {
    idModel: string;
    modelType: string;
    name: string;
    pos: string;
    type: CustomFieldType;
    displayCardFront?: boolean;
    options?: CustomFieldListOption[];
  }): TypedFetch<unknown> {
    const body = this.getBodyWithDisplayCardFront(params);
    return this.apiPost("/", {}, body);
  }

  public addCustomFieldOption(
    option: CustomFieldListOption,
  ): TypedFetch<unknown> {
    return this.apiPost("/options", {}, option);
  }

  public updateCustomField(params: {
    displayCardFront?: boolean;
    name?: string;
    pos?: number;
  }): TypedFetch<unknown> {
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
