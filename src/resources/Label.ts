import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import {
  AllOfOrListOf,
  AllOrNone,
  TypedFetch,
  ValidResourceFields,
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

export interface LabelRecord {
  /** The ID of the label. */
  id: string;
  /** The ID of the board the label is on. */
  idBoard: string;
  /** The optional name of the label (0 - 16384 chars). */
  name: string;
  /**
   * The color of the label (null means no color, and the label will not show
   * on the front of cards).
   */
  color: LabelColor | null;
}

export type LabelField = ValidResourceFields<LabelRecord>;

export interface GetLabelsViaQueryParams {
  labels?: AllOrNone;
  labelFields?: AllOfOrListOf<LabelField>;
  /** A number from 0 to 1000. */
  labelsLimit?: number;
}

export interface GetLabelsViaUrlParams {
  fields?: AllOfOrListOf<LabelField>;
  limit?: number;
}

export type GetLabelsReturnType<
  TParams,
  TPayload
> = TParams extends GetLabelsViaUrlParams
  ? LabelRecord[]
  : TPayload & { labels: LabelRecord[] };

export type AnyGetLabelsParams =
  | GetLabelsViaQueryParams
  | GetLabelsViaUrlParams;

export class Label extends BaseResource {
  public getLabel(params?: GetLabelsViaUrlParams): TypedFetch<LabelRecord> {
    return this.apiGet("/", params);
  }

  public getLabels<
    TPayload extends object,
    TParams extends AnyGetLabelsParams = {}
  >(params?: TParams): TypedFetch<GetLabelsReturnType<TParams, TPayload>> {
    return this.apiGet("/", params);
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
    return new Board(this.config, `${this.baseEndpoint}/board`);
  }
}
