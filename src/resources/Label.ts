import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import {
  AllOrFieldOrListOf,
  AllOrNone,
  ColorName,
  Limits,
  TypedFetch,
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

export type LabelField = "id" | "idBoard" | "name" | "color";

export class Label extends BaseResource {
  public getLabel(params?: {
    fields?: AllOrFieldOrListOf<LabelField>;
    limit?: number;
  }): TypedFetch<LabelRecord> {
    return this.apiGet("/", params);
  }

  public getLabels(params?: {
    fields?: AllOrFieldOrListOf<LabelField>;
    limit?: number;
  }): TypedFetch<LabelRecord[]> {
    return this.apiGet("/", params);
  }

  public getNestedLabels<TPayload extends object>(params?: {
    labels?: AllOrNone;
    labelFields?: AllOrFieldOrListOf<LabelField>;
    /** A number from 0 to 1000. */
    labelsLimit?: number;
  }): TypedFetch<TPayload & { labels: LabelRecord[] }> {
    return this.apiGetNested(params);
  }

  public addLabel(params: {
    name: string;
    color: ColorName | null;
    idBoard?: string;
  }): TypedFetch<LabelRecord> {
    const updatedParams = { ...params };
    if (this.isChildOf("board")) {
      updatedParams.idBoard = this.pathElements[1];
    }

    if (!updatedParams.idBoard) {
      throw new Error(
        `You must specify the "idBoard" param when calling addLabel()`,
      );
    }

    return this.apiPost("/", updatedParams);
  }

  public associateLabel(): TypedFetch<unknown> {
    if (!this.isChildOf("card")) {
      throw new Error("You can only call associateLabel() on a card");
    }

    if (!this.identifier) {
      throw new Error(
        `You must pass a label ID into the labels() instance when calling associateLabel()`,
      );
    }

    this.pathElements = [...this.parentElements, "idLabels"];
    return this.apiPost("/", { value: this.identifier });
  }

  public updateLabel(params: {
    name?: string;
    color?: ColorName | null;
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

  public dissociateLabel(): TypedFetch<unknown> {
    if (!this.isChildOf("card")) {
      throw new Error("You can only call dissociateLabel() on a card");
    }

    if (!this.identifier) {
      throw new Error(
        `You must pass a label ID into the labels() instance when calling associateLabel()`,
      );
    }

    this.pathElements = [...this.parentElements, "idLabels", this.identifier];
    return this.apiDelete("/");
  }

  public board(): Board {
    return new Board(this.config, this.pathElements, "board");
  }
}
