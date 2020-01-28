import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import {
  AllOfOrListOf,
  AllOrNone,
  Limits,
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

/**
 * @typedef {Object} LabelRecord
 * @property id The ID of the label.
 * @property idBoard The ID of the board the label is on.
 * @property name The optional name of the label (0 - 16384 chars).
 * @property color The color of the label (null means no color, and the label will
 *                 not show on the front of cards).
 * @property [limits] Limit data associated with the label.
 * @property [creationMethod] Creation method for the label.
 */
export interface LabelRecord {
  id: string;
  idBoard: string;
  name: string;
  color: LabelColor | null;
  limits?: Limits;
  creationMethod?: string | null;
}

export type LabelField = ValidResourceFields<LabelRecord>;

export class Label extends BaseResource {
  public getLabel(params?: {
    fields?: AllOfOrListOf<LabelField>;
    limit?: number;
  }): TypedFetch<LabelRecord> {
    this.validateGetSingle();
    return this.apiGet("/", params);
  }

  public getLabels(params?: {
    fields?: AllOfOrListOf<LabelField>;
    limit?: number;
  }): TypedFetch<LabelRecord[]> {
    return this.apiGet("/", params);
  }

  public getNestedLabels<TPayload extends object>(params?: {
    labels?: AllOrNone;
    labelFields?: AllOfOrListOf<LabelField>;
    /** A number from 0 to 1000. */
    labelsLimit?: number;
  }): TypedFetch<TPayload & { labels: LabelRecord[] }> {
    return this.apiGetNested(params);
  }

  public addLabel(params: {
    color: LabelColor | null;
    name: string;
    idBoard?: string;
  }): TypedFetch<LabelRecord> {
    const updatedParams = { ...params };
    if (this.pathElements[0] === "boards") {
      updatedParams.idBoard = this.pathElements[1];
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
    return new Board(this.config, this.pathElements, "board");
  }
}
