import { BaseResource } from "./BaseResource";
import { AllOrNone, ArgumentGroup, PositionNumbered } from "../typeDefs";

export type CheckItemField = "name" | "nameData" | "pos" | "state";

export type CheckItemState = "complete" | "false" | "incomplete" | "true";

export type CheckItemStateField = "idCheckItem" | "state";

export class CheckItem extends BaseResource {
  public getCheckItems(options?: {
    filter?: AllOrNone;
    fields?: ArgumentGroup<CheckItemField>;
  }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public getCheckItem(options?: {
    fields?: ArgumentGroup<CheckItemField>;
  }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public getCheckItemStates(options?: {
    fields?: ArgumentGroup<CheckItemStateField>;
  }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public updateCheckItem(options?: {
    name?: string;
    state?: CheckItemState;
    pos?: PositionNumbered;
    idChecklist?: string | null;
  }): Promise<unknown> {
    return this.httpPut("/", options);
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

  public addCheckItem(options: {
    name: string;
    pos?: PositionNumbered;
    checked?: boolean;
  }): Promise<unknown> {
    return this.httpPost("/", options);
  }

  public convertToCard(): Promise<unknown> {
    return this.httpPost("/convertToCard");
  }

  public deleteCheckItem(): Promise<unknown> {
    return this.httpDelete("/");
  }
}
