import { BaseResource } from "./BaseResource";

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
  value: CustomFieldListOptionValue;
  pos: number;
}

export class CustomField extends BaseResource {
  public getCustomFields(): Promise<unknown> {
    return this.httpGet("/");
  }

  public getCustomField(): Promise<unknown> {
    return this.httpGet("/");
  }

  public getOptions(): Promise<unknown> {
    return this.httpGet("/options");
  }

  public getOptionsField(idCustomFieldOption: string): Promise<unknown> {
    return this.httpGet(`/options/${idCustomFieldOption}`);
  }

  public addCustomField(params: {
    idModel: string;
    modelType: string;
    name: string;
    type: CustomFieldType;
    options?: CustomFieldListOption[];
    pos: string;
    displayCardFront?: boolean;
  }): Promise<unknown> {
    const body = this.getBodyWithDisplayCardFront(params);
    return this.httpPost("/", {}, body);
  }

  public addCustomFieldOption(option: CustomFieldListOption): Promise<unknown> {
    return this.httpPost("/options", {}, option);
  }

  public updateCustomField(params: {
    name?: string;
    pos?: number;
    displayCardFront?: boolean;
  }): Promise<unknown> {
    return this.httpPut("/", {}, params);
  }

  public deleteCustomField(): Promise<unknown> {
    return this.httpDelete("/");
  }

  public deleteCustomFieldOption(
    idCustomFieldOption: string,
  ): Promise<unknown> {
    return this.httpDelete(`/options/${idCustomFieldOption}`);
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
