import { TrelloForWolvesError } from "../TrelloForWolvesError";

import {
  AllOrFieldOrListOf,
  ListField,
  ListFilter,
  ListRecord,
  NestedActionsParams,
  NestedBoardParams,
  NestedCardsParams,
  PositionOrFloat,
  TypedFetch,
  ValueResponse,
} from "../typeDefs";

import { Action } from "./Action";
import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import { Card } from "./Card";

export class List extends BaseResource {
  public getList(
    params?: {
      fields?: AllOrFieldOrListOf<ListField>;
    } & NestedActionsParams &
      NestedBoardParams &
      NestedCardsParams,
  ): TypedFetch<ListRecord> {
    return this.apiGet("/", params as Record<string, unknown>);
  }

  public getLists(
    params?: {
      filter?: ListFilter;
      fields?: AllOrFieldOrListOf<ListField>;
    } & NestedCardsParams,
  ): TypedFetch<ListRecord[]> {
    return this.apiGet("/", params as Record<string, unknown>);
  }

  public getListsFilteredBy(filter: ListFilter): TypedFetch<ListRecord[]> {
    return this.apiGet(`/${filter}`);
  }

  public getFieldValue<T>(field: ListField): TypedFetch<ValueResponse<T>> {
    return this.apiGet(`/${field}`);
  }

  public addList(params: {
    name: string;
    idBoard?: string;
    idListSource?: string;
    pos?: PositionOrFloat;
  }): TypedFetch<ListRecord> {
    const updatedParams = { ...params };
    if (this.isChildOf("board")) {
      updatedParams.idBoard = this.pathElements[1];
    }

    if (!updatedParams.idBoard) {
      throw new TrelloForWolvesError(
        `You must specify the "idBoard" param when calling addList()`,
      );
    }

    return this.apiPost("/", updatedParams);
  }

  public updateList(params: {
    name?: string;
    closed?: boolean;
    idBoard?: string;
    pos?: PositionOrFloat;
    subscribed?: boolean;
  }): TypedFetch<ListRecord> {
    return this.apiPut("/", params);
  }

  public updateClosedStatus(value: boolean): TypedFetch<ListRecord> {
    return this.apiPut("/closed", { value });
  }

  public moveToBoard(idBoard: string): TypedFetch<ListRecord> {
    return this.apiPut("/idBoard", { value: idBoard });
  }

  public updateName(value: string): TypedFetch<ListRecord> {
    return this.apiPut("/name", { value });
  }

  public updatePosition(value: PositionOrFloat): TypedFetch<ListRecord> {
    return this.apiPut("/pos", { value });
  }

  /**
   * Alters the soft limit for number of cards in the list. This is used in conjunction
   * with the List Limits Power-Up which will highlight lists that go over their set limit.
   * @param value A number between 0 and 5000 or "none" to remove the limit.
   */
  public updateSoftLimit(value: "none" | number): TypedFetch<ListRecord> {
    // Passing an empty value removes the limit on lists. We're forcing the
    // user to either specify "none" or a number to make the purpose of the
    // empty value clearer:
    const validValue = value === "none" ? "" : value;
    return this.apiPut("/softLimit", { value: validValue });
  }

  public updateSubscribed(value: boolean): TypedFetch<ListRecord> {
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
    return new Action(this.config, this.pathElements, "actions");
  }

  public board(): Board {
    return new Board(this.config, this.pathElements, "board");
  }

  public cards(): Card {
    return new Card(this.config, this.pathElements, "cards");
  }
}
