import { BaseResource } from "./BaseResource";
import { Action } from "./Action";
import { Board, BoardField } from "./Board";
import { Card, CardField, CardFilter } from "./Card";
import { ArgumentGroup, PositionNumbered } from "../typeDefs";

export type ListField = "closed" | "idBoard" | "name" | "pos" | "subscribed";

export type ListFilter = "all" | "closed" | "none" | "open";

export class List extends BaseResource {
  public getLists(params?: {
    cardFields?: ArgumentGroup<CardField>;
    cards?: CardFilter;
    fields?: ArgumentGroup<ListField>;
    filter?: ListFilter;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getList(params?: {
    board?: boolean;
    boardFields?: ArgumentGroup<BoardField>;
    cardFields?: ArgumentGroup<CardField>;
    cards?: CardFilter;
    fields?: ArgumentGroup<ListField>;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getListsFilteredBy(filter: ListFilter): Promise<unknown> {
    return this.apiGet("/", { filter });
  }

  public getFieldValue(field: ListField): Promise<unknown> {
    return this.apiGet(`/${field}`);
  }

  public addList(params: {
    name: string;
    idBoard?: string;
    idListSource?: string;
    pos?: PositionNumbered;
  }): Promise<unknown> {
    let updatedArgs = params;
    if (this.endpointElements[0] === "boards") {
      updatedArgs = { ...params, idBoard: this.endpointElements[1] };
    }
    return this.apiPost("/", updatedArgs);
  }

  public updateList(params?: {
    closed?: boolean;
    idBoard?: string;
    name?: string;
    pos?: PositionNumbered;
    subscribed?: boolean;
  }): Promise<unknown> {
    return this.apiPut("/", params);
  }

  public updateClosedStatus(value: boolean): Promise<unknown> {
    return this.apiPut("/closed", { value });
  }

  public moveToBoard(
    boardId: string,
    params?: {
      pos?: PositionNumbered;
    },
  ): Promise<unknown> {
    return this.apiPut("/", { value: boardId, ...params });
  }

  public updateName(value: string): Promise<unknown> {
    return this.apiPut("/name", { value });
  }

  public updatePosition(value: PositionNumbered): Promise<unknown> {
    return this.apiPut("/pos", { value });
  }

  public updateSubscribed(value: boolean): Promise<unknown> {
    return this.apiPut("/subscribed", { value });
  }

  public archiveAllCards(): Promise<unknown> {
    return this.apiPost("/archiveAllCards");
  }

  public moveAllCards(params: {
    idBoard: string;
    idList: string;
  }): Promise<unknown> {
    return this.apiPost("/moveAllCards", params);
  }

  public actions(): Action {
    return new Action(this.config, `${this.baseEndpoint}/actions`);
  }

  public board(): Board {
    return new Board(this.config, `${this.baseEndpoint}/board`);
  }

  public cards(): Card {
    return new Card(this.config, `${this.baseEndpoint}/cards`);
  }
}
