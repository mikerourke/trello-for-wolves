import { BaseResource } from "./BaseResource";
import { Action } from "./Action";
import { Board } from "./Board";
import { Card, CardField, CardFilter } from "./Card";
import {
  AllOfOrListOf,
  LimitRecord,
  PositionOrFloat,
  TypedFetch,
  ValidResourceFields,
  ValueResponse,
} from "../typeDefs";
import { LabelRecord } from "./Label";

export type ListFilter = "all" | "closed" | "none" | "open";

/**
 * @typedef {Object} ListRecord
 * @property id The ID of the list.
 * @property name The name of the list.
 * @property closed Whether the list is closed (archived).
 * @property idBoard The ID of the board the list is on.
 * @property pos The position of the list on the board.
 * @property subscribed Whether the member is subscribed to this list.
 * @property softLimit A soft limit for number of open cards in the list used by the
 *                     List Limits Power-Up.
 * @property [limits] Limit data associated with the list.
 * @property [creationMethod] Creation method for the list.
 */
export interface ListRecord {
  id: string;
  name: string;
  closed: boolean;
  idBoard: string;
  pos: number;
  subscribed: boolean;
  softLimit: number | null;
  limits?: LimitRecord;
  creationMethod?: string | null;
}

export type ListField = ValidResourceFields<ListRecord>;

export class List extends BaseResource {
  public getList(params?: {
    fields?: AllOfOrListOf<ListField>;
  }): TypedFetch<ListRecord> {
    return this.apiGet("/", params);
  }

  public getLists(params?: {
    cards?: CardFilter;
    cardFields?: AllOfOrListOf<CardField>;
    filter?: ListFilter;
    fields?: AllOfOrListOf<ListField>;
  }): TypedFetch<LabelRecord[]> {
    return this.apiGet("/", params);
  }

  public getNestedLists<TPayload extends object>(params?: {
    lists: ListFilter;
    listFields?: AllOfOrListOf<ListField>;
  }): TypedFetch<TPayload & { lists: ListRecord[] }> {
    return this.apiGetNested(params);
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
    let updatedParams = params;
    if (this.isChildOf("board")) {
      updatedParams = { ...params, idBoard: this.pathElements[1] };
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

  public moveToBoard(params?: { pos?: PositionOrFloat }): TypedFetch<unknown> {
    if (!this.isChildOf("board")) {
      throw new Error(
        "You can only call `moveToBoard()` from a board resource",
      );
    }

    const idBoard = this.pathElements[1];
    if (idBoard === "") {
      throw new Error(
        "You must specify an ID for the board instance (`trello.boards(<NEED ID>).lists('lIsTiD').moveToBoard()`)",
      );
    }

    if (!this.identifier) {
      throw new Error(
        "You must specify an ID for the lists instance (`trello.boards('bOarDiD').lists(<NEED ID>).moveToBoard()`)",
      );
    }

    return this.apiPut(`/${idBoard}`, params);
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
    return new Action(this.config, this.pathElements, "actions", {
      isReturnUrl: this.isReturnUrl,
    });
  }

  public board(): Board {
    return new Board(this.config, this.pathElements, "board", {
      isReturnUrl: this.isReturnUrl,
    });
  }

  public cards(): Card {
    return new Card(this.config, this.pathElements, "cards", {
      isReturnUrl: this.isReturnUrl,
    });
  }
}
