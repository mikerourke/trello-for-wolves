import { BaseResource } from "./BaseResource";
import { Action } from "./Action";
import { Board, BoardField } from "./Board";
import { Card, CardField, CardFilter } from "./Card";
import { ArgumentGroup, PositionNumbered } from "../typeDefs";

export type ListField = "closed" | "idBoard" | "name" | "pos" | "subscribed";

export type ListFilter = "all" | "closed" | "none" | "open";

export class List extends BaseResource {
  public getLists(options?: {
    cards?: CardFilter;
    cardFields?: ArgumentGroup<CardField>;
    filter?: ListFilter;
    fields?: ArgumentGroup<ListField>;
  }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public getList(options?: {
    cards?: CardFilter;
    cardFields?: ArgumentGroup<CardField>;
    board?: boolean;
    boardFields?: ArgumentGroup<BoardField>;
    fields?: ArgumentGroup<ListField>;
  }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public getListsFilteredBy(filter: ListFilter): Promise<unknown> {
    return this.httpGet("/", { filter });
  }

  public getFieldValue(field: ListField): Promise<unknown> {
    return this.httpGet(`/${field}`);
  }

  public actions(): Action {
    return new Action(this.config, `${this.routePath}/actions`);
  }

  public board(): Board {
    return new Board(this.config, `${this.routePath}/board`);
  }

  public cards(): Card {
    return new Card(this.config, `${this.routePath}/cards`);
  }

  public updateList(options?: {
    name?: string;
    closed?: boolean;
    idBoard?: string;
    pos?: PositionNumbered;
    subscribed?: boolean;
  }): Promise<unknown> {
    return this.httpPut("/", options);
  }

  public updateClosedStatus(value: boolean): Promise<unknown> {
    return this.httpPut("/closed", { value });
  }

  public moveToBoard(
    boardId: string,
    options?: {
      pos?: PositionNumbered;
    },
  ): Promise<unknown> {
    return this.httpPut("/", { value: boardId, ...options });
  }

  public updateName(value: string): Promise<unknown> {
    return this.httpPut("/name", { value });
  }

  public updatePosition(value: PositionNumbered): Promise<unknown> {
    return this.httpPut("/pos", { value });
  }

  public updateSubscribed(value: boolean): Promise<unknown> {
    return this.httpPut("/subscribed", { value });
  }

  public addList(options: {
    name: string;
    idBoard?: string;
    idListSource?: string;
    pos?: PositionNumbered;
  }): Promise<unknown> {
    let updatedArgs = options;
    if (this.routePathElements[0] === "boards") {
      updatedArgs = { ...options, idBoard: this.routePathElements[1] };
    }
    return this.httpPost("/", updatedArgs);
  }

  public archiveAllCards(): Promise<unknown> {
    return this.httpPost("/archiveAllCards");
  }

  public moveAllCards(options: {
    idBoard: string;
    idList: string;
  }): Promise<unknown> {
    return this.httpPost("/moveAllCards", options);
  }
}
