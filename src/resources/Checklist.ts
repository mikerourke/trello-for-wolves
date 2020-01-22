import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import { Card, CardField, CardFilter } from "./Card";
import { CheckItem, CheckItemField } from "./CheckItem";
import { AllOrNone, ArgumentGroup, PositionNumbered } from "../typeDefs";

export type ChecklistField = "idBoard" | "idCard" | "name" | "pos";

export class Checklist extends BaseResource {
  public getChecklists(options?: {
    cards?: CardFilter;
    cardFields?: ArgumentGroup<CardField>;
    checkItems?: AllOrNone;
    checkItemFields?: ArgumentGroup<CheckItemField>;
    filter?: AllOrNone;
    fields?: ArgumentGroup<ChecklistField>;
  }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public getChecklist(options?: {
    cards?: CardFilter;
    cardFields?: ArgumentGroup<CardField>;
    checkItems?: AllOrNone;
    checkItemFields?: ArgumentGroup<CheckItemField>;
    fields?: ArgumentGroup<ChecklistField>;
  }): Promise<unknown> {
    return this.httpGet("/", options);
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

  public updateChecklist(options?: {
    name?: string;
    pos?: PositionNumbered;
  }): Promise<unknown> {
    return this.httpPut("/", options);
  }

  public updateName(value: string): Promise<unknown> {
    return this.httpPut("/name", { value });
  }

  public updatePosition(value: PositionNumbered): Promise<unknown> {
    return this.httpPut("/pos", { value });
  }

  public addChecklist(options: {
    idCard?: string;
    name?: string;
    pos?: PositionNumbered;
    idChecklistSource?: string;
  }): Promise<unknown> {
    let updatedArgs = options;
    if (this.routePathElements[0] === "cards") {
      updatedArgs = { ...options, idCard: this.routePathElements[1] };
    }
    return this.httpPost("/", updatedArgs);
  }

  public deleteChecklist(): Promise<unknown> {
    return this.httpDelete("/");
  }
}
