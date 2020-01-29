import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import {
  AllOfOrListOf,
  AllOrNone,
  ColorName,
  Limits,
  TypedFetch,
  ValidResourceFields,
} from "../typeDefs";

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
  color: ColorName | null;
  limits?: Limits;
  creationMethod?: string | null;
}

export type LabelField = ValidResourceFields<LabelRecord>;

export class Label extends BaseResource {
  public getLabel(params?: {
    fields?: AllOfOrListOf<LabelField>;
    limit?: number;
  }): TypedFetch<LabelRecord> {
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
    color: ColorName | null;
    name: string;
    idBoard?: string;
  }): TypedFetch<LabelRecord> {
    const updatedParams = { ...params };
    if (this.isChildOf("board")) {
      updatedParams.idBoard = this.pathElements[1];
    }
    return this.apiPost("/", updatedParams);
  }

  public updateLabel(params: {
    color?: ColorName | null;
    name?: string;
  }): TypedFetch<LabelRecord> {
    return this.apiPut("/", params);
  }

  public updateColor(value: ColorName | null): TypedFetch<LabelRecord> {
    return this.apiPut("/color", { value });
  }

  public updateName(value: string): TypedFetch<LabelRecord> {
    return this.apiPut("/name", { value });
  }

  public deleteLabel(): TypedFetch<{ limits: unknown }> {
    return this.apiDelete("/");
  }

  public board(): Board {
    return new Board(this.config, this.pathElements, "board", {
      isReturnUrl: this.isReturnUrl,
    });
  }
}
