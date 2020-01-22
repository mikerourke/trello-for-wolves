import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import { Card, CardField, CardFilter } from "./Card";
import { CheckItem, CheckItemField } from "./CheckItem";
import { AllOrNone, ArgumentGroup, PositionNumbered } from "../typeDefs";

export type ChecklistField = "idBoard" | "idCard" | "name" | "pos";

export class Checklist extends BaseResource {
  public getChecklists(params?: {
    cards?: CardFilter;
    cardFields?: ArgumentGroup<CardField>;
    checkItems?: AllOrNone;
    checkItemFields?: ArgumentGroup<CheckItemField>;
    filter?: AllOrNone;
    fields?: ArgumentGroup<ChecklistField>;
  }): Promise<unknown> {
    return this.httpGet("/", params);
  }

  public getChecklist(params?: {
    cards?: CardFilter;
    cardFields?: ArgumentGroup<CardField>;
    checkItems?: AllOrNone;
    checkItemFields?: ArgumentGroup<CheckItemField>;
    fields?: ArgumentGroup<ChecklistField>;
  }): Promise<unknown> {
    return this.httpGet("/", params);
  }

  public getFieldValue(field: ChecklistField): Promise<unknown> {
    return this.httpGet(`/${field}`);
  }

  public board(): Board {
    return new Board(this.config, `${this.routePath}/board`);
  }

  public cards(): Card {
    return new Card(this.config, `${this.routePath}/cards`);
  }

  public checkItem(checkItemId: string = ""): CheckItem {
    return new CheckItem(
      this.config,
      `${this.routePath}/checkItem/${checkItemId}`,
    );
  }

  public checkItems(checkItemId: string = ""): CheckItem {
    return new CheckItem(
      this.config,
      `${this.routePath}/checkItems/${checkItemId}`,
    );
  }

  public addChecklist(params: {
    idCard?: string;
    name?: string;
    pos?: PositionNumbered;
    idChecklistSource?: string;
  }): Promise<unknown> {
    let updatedArgs = params;
    if (this.routePathElements[0] === "cards") {
      updatedArgs = { ...params, idCard: this.routePathElements[1] };
    }
    return this.httpPost("/", updatedArgs);
  }

  public updateChecklist(params?: {
    name?: string;
    pos?: PositionNumbered;
  }): Promise<unknown> {
    return this.httpPut("/", params);
  }

  public updateName(value: string): Promise<unknown> {
    return this.httpPut("/name", { value });
  }

  public updatePosition(value: PositionNumbered): Promise<unknown> {
    return this.httpPut("/pos", { value });
  }

  public deleteChecklist(): Promise<unknown> {
    return this.httpDelete("/");
  }
}
