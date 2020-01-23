import { BaseResource } from "./BaseResource";
import { AllOrNone, ArgumentGroup, PositionNumbered } from "../typeDefs";

export type CheckItemField = "name" | "nameData" | "pos" | "state";

export type CheckItemState = "complete" | "false" | "incomplete" | "true";

export type CheckItemStateField = "idCheckItem" | "state";

export class CheckItem extends BaseResource {
  public getCheckItems(params?: {
    fields?: ArgumentGroup<CheckItemField>;
    filter?: AllOrNone;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getCheckItem(params?: {
    fields?: ArgumentGroup<CheckItemField>;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getCheckItemStates(params?: {
    fields?: ArgumentGroup<CheckItemStateField>;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public addCheckItem(params: {
    name: string;
    checked?: boolean;
    pos?: PositionNumbered;
  }): Promise<unknown> {
    return this.apiPost("/", params);
  }

  public convertToCard(): Promise<unknown> {
    return this.apiPost("/convertToCard");
  }

  public updateCheckItem(params?: {
    idChecklist?: string | null;
    name?: string;
    pos?: PositionNumbered;
    state?: CheckItemState;
  }): Promise<unknown> {
    return this.apiPut("/", params);
  }

  public updateName(value: string): Promise<unknown> {
    return this.apiPut("/name", { value });
  }

  public updatePosition(value: PositionNumbered): Promise<unknown> {
    return this.apiPut("/pos", { value });
  }

  public updateState(value: CheckItemState): Promise<unknown> {
    return this.apiPut("/state", { value });
  }

  public deleteCheckItem(): Promise<unknown> {
    return this.apiDelete("/");
  }
}
