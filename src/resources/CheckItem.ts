import { BaseResource } from "./BaseResource";
import {
  AllOfOrListOf,
  AllOrNone,
  PositionNumbered,
  TypedFetch,
} from "../typeDefs";

export type CheckItemState = "complete" | "false" | "incomplete" | "true";

export type CheckItemRecord = {
  id: string;
  idChecklist: string;
  name: string;
  nameData: string | null;
  pos: number;
  state: CheckItemState;
  due: string | null;
  creationMethod?: string | null;
};

export type CheckItemField = keyof CheckItemRecord;

export type CheckItemStateField = "idCheckItem" | "state";

export class CheckItem extends BaseResource {
  public getCheckItem(params?: {
    fields?: AllOfOrListOf<CheckItemField>;
  }): TypedFetch<CheckItemRecord> {
    return this.apiGet("/", params);
  }

  public getCheckItems(params?: {
    fields?: AllOfOrListOf<CheckItemField>;
    filter?: AllOrNone;
  }): TypedFetch<CheckItemRecord[]> {
    return this.apiGet("/", params);
  }

  public getCheckItemStates(params?: {
    fields?: AllOfOrListOf<CheckItemStateField>;
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public addCheckItem(params: {
    name: string;
    checked?: boolean;
    pos?: PositionNumbered;
  }): TypedFetch<CheckItemRecord> {
    return this.apiPost("/", params);
  }

  public convertToCard(): TypedFetch<unknown> {
    return this.apiPost("/convertToCard");
  }

  public updateCheckItem(params?: {
    idChecklist?: string | null;
    name?: string;
    pos?: PositionNumbered;
    state?: CheckItemState;
  }): TypedFetch<CheckItemRecord> {
    return this.apiPut("/", params);
  }

  // TODO: Find out if these still work.
  public updateName(value: string): TypedFetch<unknown> {
    return this.apiPut("/name", { value });
  }

  public updatePosition(value: PositionNumbered): TypedFetch<unknown> {
    return this.apiPut("/pos", { value });
  }

  public updateState(value: CheckItemState): TypedFetch<unknown> {
    return this.apiPut("/state", { value });
  }

  public deleteCheckItem(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}
