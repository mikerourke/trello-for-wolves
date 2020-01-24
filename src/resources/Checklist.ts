import { BaseResource } from "./BaseResource";
import { Board, BoardField } from "./Board";
import { Card, CardField, CardFilter } from "./Card";
import { CheckItem, CheckItemField } from "./CheckItem";
import {
  AllOfOrListOf,
  AllOrNone,
  PositionNumbered,
  TypedFetch,
  ValueResponse,
} from "../typeDefs";

export type ChecklistRecord = {
  /** The ID of the checklist. */
  id: string;
  /** The ID of the board the checklist is on. */
  idBoard: string;
  /** The ID of the card the checklist is on. */
  idCard: string;
  /** The name of the checklist. */
  name: string;
  /**
   * The position of the checklist on the card (relative to any other
   * checklists on the card).
   */
  pos: number;
};

export type ChecklistField = Omit<ChecklistRecord, "id">;

export type GetSingleChecklistParams = {
  cards?: CardFilter;
  checkItemFields?: AllOfOrListOf<CheckItemField>;
  checkItems?: AllOrNone;
  fields?: AllOfOrListOf<ChecklistField>;
};

export type NestedChecklistParams = {
  checklists?: AllOrNone;
  checklistFields?: AllOfOrListOf<ChecklistField>;
  checkItems?: "all";
  checkItemFields?: AllOfOrListOf<CheckItemField>;
};

export class Checklist<TGetSingleParams = {}> extends BaseResource {
  public getChecklist(
    params?: TGetSingleParams & GetSingleChecklistParams,
  ): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public getChecklists(params?: {
    cardFields?: AllOfOrListOf<CardField>;
    cards?: CardFilter;
    checkItemFields?: AllOfOrListOf<CheckItemField>;
    checkItems?: AllOrNone;
    fields?: AllOfOrListOf<ChecklistField>;
    filter?: AllOrNone;
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public getFieldValue<T>(field: ChecklistField): TypedFetch<ValueResponse<T>> {
    return this.apiGet(`/${field}`);
  }

  public addChecklist(params: {
    idCard?: string;
    idChecklistSource?: string;
    name?: string;
    pos?: PositionNumbered;
  }): TypedFetch<unknown> {
    let updatedArgs = params;
    if (this.endpointElements[0] === "cards") {
      updatedArgs = { ...params, idCard: this.endpointElements[1] };
    }
    return this.apiPost("/", updatedArgs);
  }

  public updateChecklist(params?: {
    name?: string;
    pos?: PositionNumbered;
  }): TypedFetch<unknown> {
    return this.apiPut("/", params);
  }

  public updateName(value: string): TypedFetch<unknown> {
    return this.apiPut("/name", { value });
  }

  public updatePosition(value: PositionNumbered): TypedFetch<unknown> {
    return this.apiPut("/pos", { value });
  }

  public deleteChecklist(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }

  public board(): Board {
    return new Board<{ fields?: AllOfOrListOf<BoardField> }>(
      this.config,
      `${this.baseEndpoint}/board`,
    );
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
