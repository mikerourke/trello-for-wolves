import { TrelloForWolvesError } from "../TrelloForWolvesError";

import {
  AllOrFieldOrListOf,
  AllOrNone,
  CheckItemField,
  CheckItemRecord,
  CheckItemState,
  CheckItemStateField,
  PositionOrFloat,
  TypedFetch,
} from "../typeDefs";

import { BaseResource } from "./BaseResource";

export class CheckItem extends BaseResource {
  public getCheckItem(params?: {
    fields?: AllOrFieldOrListOf<CheckItemField>;
  }): TypedFetch<CheckItemRecord> {
    return this.apiGet("/", params);
  }

  public getCheckItems(params?: {
    filter?: AllOrNone;
    fields?: AllOrFieldOrListOf<CheckItemField>;
  }): TypedFetch<CheckItemRecord[]> {
    return this.apiGet("/", params);
  }

  public getCheckItemStates(params?: {
    fields?: AllOrFieldOrListOf<CheckItemStateField>;
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public addCheckItem(params: {
    name: string;
    checked?: boolean;
    pos?: PositionOrFloat;
  }): TypedFetch<CheckItemRecord> {
    return this.apiPost("/", params);
  }

  public convertToCard(): TypedFetch<unknown> {
    return this.apiPost("/convertToCard");
  }

  public updateCheckItem(params: {
    name?: string;
    state?: CheckItemState;
    idChecklist?: string;
    pos?: PositionOrFloat;
  }): TypedFetch<CheckItemRecord> {
    const updatedParams = { ...params };

    // If this method is called from the path
    // /cards/{idCard}/checklist/{idChecklist}/checkItem/{idCheckItem}
    // Set the idChecklist equal to the {idChecklist}:
    const firstChildPath = this.parentElements[2] ?? "";
    if (firstChildPath === "checklist") {
      updatedParams.idChecklist = params.idChecklist || this.parentElements[3];
    }

    if (!updatedParams.idChecklist) {
      throw new TrelloForWolvesError(
        `You must specify the "idChecklist" param when calling updateCheckItem()`,
      );
    }

    return this.apiPut("/", updatedParams);
  }

  public updateName(value: string): TypedFetch<CheckItemRecord> {
    return this.apiPut("/name", { value });
  }

  public updatePosition(value: PositionOrFloat): TypedFetch<CheckItemRecord> {
    return this.apiPut("/pos", { value });
  }

  public updateState(value: CheckItemState): TypedFetch<CheckItemRecord> {
    return this.apiPut("/state", { value });
  }

  public deleteCheckItem(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}
