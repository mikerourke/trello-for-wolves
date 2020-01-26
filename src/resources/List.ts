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

export type ListFilter = "all" | "closed" | "none" | "open";

export interface ListRecord {
  /** The ID of the list. */
  id: string;
  /** The name of the list. */
  name: string;
  /** Whether the list is closed (archived). */
  closed: boolean;
  /** The ID of the board the list is on. */
  idBoard: string;
  /** The position of the list on the board. */
  pos: number;
  /** Whether the member is subscribed to this list. */
  subscribed: boolean;
  /**
   * A soft limit for number of open cards in the list used by the List
   * Limits Power-Up.
   */
  softLimit: number | null;
  limits?: LimitRecord;
  creationMethod?: string | null;
}

export type ListField = ValidResourceFields<ListRecord>;

export interface GetListsForBoardParams {
  cards?: CardFilter;
  cardFields?: AllOfOrListOf<CardField>;
  filter?: ListFilter;
  fields?: AllOfOrListOf<ListField>;
}

export interface GetListsViaQueryParams {
  lists: ListFilter;
  listFields?: AllOfOrListOf<ListField>;
}

export interface GetListsViaUrlParams {
  lists?: ListFilter;
  filter?: ListFilter;
}

type GetListsReturnType<
  TParams,
  TPayload
> = TParams extends GetListsForBoardParams
  ? ListRecord[]
  : TParams extends GetListsViaUrlParams
  ? ListRecord[]
  : TPayload & { lists: ListRecord[] };

type AnyGetListsParams =
  | GetListsForBoardParams
  | GetListsViaQueryParams
  | GetListsViaUrlParams;

export class List extends BaseResource {
  public getList(params?: {
    fields?: AllOfOrListOf<ListField>;
  }): TypedFetch<ListRecord> {
    return this.apiGet("/", params);
  }

  public getLists<
    TPayload extends object,
    TParams extends AnyGetListsParams = {}
  >(params?: TParams): TypedFetch<GetListsReturnType<TPayload, TParams>> {
    return this.apiGet("/", params);
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
    if (/board/gi.test(this.endpointElements[0])) {
      updatedParams = { ...params, idBoard: this.endpointElements[1] };
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
    return new Action(this.config, `${this.baseEndpoint}/actions`);
  }

  public board(): Board {
    return new Board(this.config, `${this.baseEndpoint}/board`);
  }

  public cards(): Card {
    return new Card(this.config, `${this.baseEndpoint}/cards`);
  }
}
