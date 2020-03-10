import { TrelloForWolvesError } from "../TrelloForWolvesError";
import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import {
  AllOrFieldOrListOf,
  ColorName,
  LabelField,
  LabelRecord,
  NestedActionsParams,
  TypedFetch,
} from "../typeDefs";

export class Label extends BaseResource {
  public getLabel(
    params?: {
      fields?: AllOrFieldOrListOf<LabelField>;
      limit?: number;
    } & NestedActionsParams,
  ): TypedFetch<LabelRecord> {
    return this.apiGet("/", params as Record<string, unknown>);
  }

  public getLabels(
    params?: {
      fields?: AllOrFieldOrListOf<LabelField>;
      limit?: number;
    } & NestedActionsParams,
  ): TypedFetch<LabelRecord[]> {
    return this.apiGet("/", params as Record<string, unknown>);
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
      throw new TrelloForWolvesError(
        `You must specify the "idBoard" param when calling addLabel()`,
      );
    }

    return this.apiPost("/", updatedParams);
  }

  public associateLabel(): TypedFetch<unknown> {
    if (!this.isChildOf("card")) {
      throw new TrelloForWolvesError(
        "You can only call associateLabel() on a card",
      );
    }

    if (!this.identifier) {
      throw new TrelloForWolvesError(
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
      throw new TrelloForWolvesError(
        "You can only call dissociateLabel() on a card",
      );
    }

    if (!this.identifier) {
      throw new TrelloForWolvesError(
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
