import { BaseResource } from "./BaseResource";
import { Action } from "./Action";
import { Board } from "./Board";
import { Card, CardField, CardFilter } from "./Card";
import {
  AllOfOrListOf,
  LimitRecord,
  PositionNumbered,
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
    this.validateGetSingle();
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
    pos?: PositionNumbered;
  }): TypedFetch<ListRecord> {
    let updatedParams = params;
    if (/board/gi.test(this.pathElements[0])) {
      updatedParams = { ...params, idBoard: this.pathElements[1] };
    }
    return this.apiPost("/", updatedParams);
  }

  public updateList(params: {
    name?: string;
    closed?: boolean;
    idBoard?: string;
    pos?: PositionNumbered;
    subscribed?: boolean;
  }): TypedFetch<ListRecord> {
    return this.apiPut("/", params);
  }

  public updateClosedStatus(value: boolean): TypedFetch<ListRecord> {
    return this.apiPut("/closed", { value });
  }

  public moveToBoard(
    idBoard: string,
    params?: {
      pos?: PositionNumbered;
    },
  ): TypedFetch<unknown> {
    return this.apiPut("/", { value: idBoard, ...params });
  }

  public updateName(value: string): TypedFetch<ListRecord> {
    return this.apiPut("/name", { value });
  }

  public updatePosition(value: PositionNumbered): TypedFetch<ListRecord> {
    return this.apiPut("/pos", { value });
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
