import { BaseResource } from "./BaseResource";
import {
  AllOfOrListOf,
  AllOrNone,
  PositionOrFloat,
  TypedFetch,
} from "../typeDefs";

export type CheckItemState = "complete" | "false" | "incomplete" | "true";

export type CheckItemStateField = "idCheckItem" | "state";

/**
 * The data corresponding to a check item. The fields that are present in the
 * record are contingent on the `fields` param passed to the method used to
 * retrieve the check item data.
 * @typedef {Object} CheckItemRecord
 * @property id The ID of the check item.
 * @property idChecklist The ID of the parent checklist.
 * @property name The name of the check item.
 * @property nameData Additional data associated with the check item.
 * @property pos Position of the check item in the checklist.
 * @property state Current state of the check item.
 * @property due Date the check item is due.
 * @property type Type of the check item (this is usually null).
 * @property [creationMethod] Creation method for the check item.
 */
export type CheckItemRecord = {
  id: string;
  idChecklist: string;
  name: string;
  nameData: string | null;
  pos: number;
  state: CheckItemState;
  due: string | null;
  type: string | null;
  creationMethod?: string | null;
};

export type CheckItemField = "name" | "nameData" | "pos" | "state" | "type";

export class CheckItem extends BaseResource {
  public getCheckItem(params?: {
    fields?: AllOfOrListOf<CheckItemField>;
  }): TypedFetch<CheckItemRecord> {
    return this.apiGet("/", params);
  }

  public getCheckItems(params?: {
    filter?: AllOrNone;
    fields?: AllOfOrListOf<CheckItemField>;
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
    pos?: PositionOrFloat;
  }): TypedFetch<CheckItemRecord> {
    return this.apiPost("/", params);
  }

  public convertToCard(): TypedFetch<unknown> {
    return this.apiPost("/convertToCard");
  }

  public updateCheckItem(params: {
    idChecklist?: string | null;
    name?: string;
    pos?: PositionOrFloat;
    state?: CheckItemState;
  }): TypedFetch<CheckItemRecord> {
    return this.apiPut("/", params);
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
