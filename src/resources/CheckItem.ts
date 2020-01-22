import { BaseResource } from "./BaseResource";
import { AllOrNone, ArgumentGroup, PositionNumbered } from "../typeDefs";

export type CheckItemField = "name" | "nameData" | "pos" | "state";

export type CheckItemState = "complete" | "false" | "incomplete" | "true";

export type CheckItemStateField = "idCheckItem" | "state";

export class CheckItem extends BaseResource {
  public getCheckItems(params?: {
    filter?: AllOrNone;
    fields?: ArgumentGroup<CheckItemField>;
  }): Promise<unknown> {
    return this.httpGet("/", params);
  }

  public getCheckItem(params?: {
    fields?: ArgumentGroup<CheckItemField>;
  }): Promise<unknown> {
    return this.httpGet("/", params);
  }

  public getCheckItemStates(params?: {
    fields?: ArgumentGroup<CheckItemStateField>;
  }): Promise<unknown> {
    return this.httpGet("/", params);
  }

  public addCheckItem(params: {
    name: string;
    pos?: PositionNumbered;
    checked?: boolean;
  }): Promise<unknown> {
    return this.httpPost("/", params);
  }

  public convertToCard(): Promise<unknown> {
    return this.httpPost("/convertToCard");
  }

  public updateCheckItem(params?: {
    name?: string;
    state?: CheckItemState;
    pos?: PositionNumbered;
    idChecklist?: string | null;
  }): Promise<unknown> {
    return this.httpPut("/", params);
  }

  public updateName(value: string): Promise<unknown> {
    return this.httpPut("/name", { value });
  }

  public updatePosition(value: PositionNumbered): Promise<unknown> {
    return this.httpPut("/pos", { value });
  }

  public updateState(value: CheckItemState): Promise<unknown> {
    return this.httpPut("/state", { value });
  }

  public deleteCheckItem(): Promise<unknown> {
    return this.httpDelete("/");
  }
}
