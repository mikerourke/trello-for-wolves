import { BaseResource } from "./BaseResource";
import { Action } from "./Action";
import { Board, BoardField } from "./Board";
import { Card, CardField, CardFilter } from "./Card";
import { AllOfOrListOf, PositionNumbered, TypedFetch } from "../typeDefs";

export type ListField = "closed" | "idBoard" | "name" | "pos" | "subscribed";

export type ListFilter = "all" | "closed" | "none" | "open";

export class List extends BaseResource {
  public getLists(params?: {
    cardFields?: AllOfOrListOf<CardField>;
    cards?: CardFilter;
    fields?: AllOfOrListOf<ListField>;
    filter?: ListFilter;
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public getList(params?: {
    board?: boolean;
    boardFields?: AllOfOrListOf<BoardField>;
    cardFields?: AllOfOrListOf<CardField>;
    cards?: CardFilter;
    fields?: AllOfOrListOf<ListField>;
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public getListsFilteredBy(filter: ListFilter): TypedFetch<unknown> {
    return this.apiGet("/", { filter });
  }

  public getFieldValue(field: ListField): TypedFetch<unknown> {
    return this.apiGet(`/${field}`);
  }

  public addList(params: {
    name: string;
    idBoard?: string;
    idListSource?: string;
    pos?: PositionNumbered;
  }): TypedFetch<unknown> {
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
  }): TypedFetch<unknown> {
    return this.apiPut("/", params);
  }

  public updateClosedStatus(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/closed", { value });
  }

  public moveToBoard(
    boardId: string,
    params?: {
      pos?: PositionNumbered;
    },
  ): TypedFetch<unknown> {
    return this.apiPut("/", { value: boardId, ...params });
  }

  public updateName(value: string): TypedFetch<unknown> {
    return this.apiPut("/name", { value });
  }

  public updatePosition(value: PositionNumbered): TypedFetch<unknown> {
    return this.apiPut("/pos", { value });
  }

  public updateSubscribed(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/subscribed", { value });
  }

  public archiveAllCards(): TypedFetch<unknown> {
    return this.apiPost("/archiveAllCards");
  }

  public moveAllCards(params: {
    idBoard: string;
    idList: string;
  }): TypedFetch<unknown> {
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
