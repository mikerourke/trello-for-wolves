import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import { Card, CardField, CardFilter } from "./Card";
import { CheckItem, CheckItemField } from "./CheckItem";
import { AllOrNone, ArgumentGroup, PositionNumbered } from "../typeDefs";

export type ChecklistField = "idBoard" | "idCard" | "name" | "pos";

export class Checklist extends BaseResource {
  public getChecklists(params?: {
    cardFields?: ArgumentGroup<CardField>;
    cards?: CardFilter;
    checkItemFields?: ArgumentGroup<CheckItemField>;
    checkItems?: AllOrNone;
    fields?: ArgumentGroup<ChecklistField>;
    filter?: AllOrNone;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getChecklist(params?: {
    cardFields?: ArgumentGroup<CardField>;
    cards?: CardFilter;
    checkItemFields?: ArgumentGroup<CheckItemField>;
    checkItems?: AllOrNone;
    fields?: ArgumentGroup<ChecklistField>;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getFieldValue(field: ChecklistField): Promise<unknown> {
    return this.apiGet(`/${field}`);
  }

  public addChecklist(params: {
    idCard?: string;
    idChecklistSource?: string;
    name?: string;
    pos?: PositionNumbered;
  }): Promise<unknown> {
    let updatedArgs = params;
    if (this.endpointElements[0] === "cards") {
      updatedArgs = { ...params, idCard: this.endpointElements[1] };
    }
    return this.apiPost("/", updatedArgs);
  }

  public updateChecklist(params?: {
    name?: string;
    pos?: PositionNumbered;
  }): Promise<unknown> {
    return this.apiPut("/", params);
  }

  public updateName(value: string): Promise<unknown> {
    return this.apiPut("/name", { value });
  }

  public updatePosition(value: PositionNumbered): Promise<unknown> {
    return this.apiPut("/pos", { value });
  }

  public deleteChecklist(): Promise<unknown> {
    return this.apiDelete("/");
  }

  public board(): Board {
    return new Board(this.config, `${this.baseEndpoint}/board`);
  }

  public cards(): Card {
    return new Card(this.config, `${this.baseEndpoint}/cards`);
  }

  public checkItem(checkItemId: string = ""): CheckItem {
    return new CheckItem(
      this.config,
      `${this.baseEndpoint}/checkItem/${checkItemId}`,
    );
  }

  public checkItems(checkItemId: string = ""): CheckItem {
    return new CheckItem(
      this.config,
      `${this.baseEndpoint}/checkItems/${checkItemId}`,
    );
  }
}
