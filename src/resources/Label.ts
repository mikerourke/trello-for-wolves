import { BaseResource } from "./BaseResource";
import { Board, BoardField } from "./Board";
import {
  AllOfOrListOf,
  AllOrNone,
  QueryParamsByName,
  TypedFetch,
} from "../typeDefs";

export type LabelColor =
  | "blue"
  | "green"
  | "orange"
  | "purple"
  | "red"
  | "yellow"
  // These colors are also available, they're just not documented:
  | "sky"
  | "lime"
  | "pink"
  | "black";

export type LabelRecord = {
  id: string;
  idBoard: string;
  name: string;
  color: LabelColor | null;
};

export type LabelField = Omit<keyof LabelRecord, "id">;

export type GetLabelParams = {
  fields?: AllOfOrListOf<LabelField>;
  limit?: number;
};

export type NestedLabelParams = {
  labels: AllOrNone;
  labelFields: AllOfOrListOf<LabelField>;
  /** A number from 0 to 1000. */
  labelsLimit: number;
};

export class Label<
  TGetSingleParams = Pick<GetLabelParams, "fields">,
  TGetMultipleParams = Pick<GetLabelParams, "fields">
> extends BaseResource {
  public getLabel(params?: TGetSingleParams): TypedFetch<LabelRecord> {
    return this.apiGet("/", params as QueryParamsByName);
  }

  public getLabels(params?: TGetMultipleParams): TypedFetch<LabelRecord[]> {
    return this.apiGet("/", params as QueryParamsByName);
  }

  public addLabel(params: {
    color: LabelColor | null;
    name: string;
    idBoard?: string;
  }): TypedFetch<LabelRecord> {
    const updatedParams = { ...params };
    if (this.endpointElements[0] === "boards") {
      updatedParams.idBoard = this.endpointElements[1];
    }
    return this.apiPost("/", updatedParams);
  }

  public updateLabel(params?: {
    color?: LabelColor | null;
    name?: string;
  }): TypedFetch<LabelRecord> {
    return this.apiPut("/", params);
  }

  public updateColor(value: LabelColor | null): TypedFetch<LabelRecord> {
    return this.apiPut("/color", { value });
  }

  public updateName(value: string): TypedFetch<LabelRecord> {
    return this.apiPut("/name", { value });
  }

  public deleteLabel(): TypedFetch<{ limits: unknown }> {
    return this.apiDelete("/");
  }

  public board(): Board {
    return new Board<{ fields?: AllOfOrListOf<BoardField> }>(
      this.config,
      `${this.baseEndpoint}/board`,
    );
  }
}
