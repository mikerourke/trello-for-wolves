import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import { Card, CardFilter } from "./Card";
import { CheckItem, CheckItemField } from "./CheckItem";
import {
  AllOfOrListOf,
  AllOrNone,
  Limits,
  PositionNumbered,
  TypedFetch,
  ValidResourceFields,
  ValueResponse,
} from "../typeDefs";

/**
 * @typedef {Object} ChecklistRecord
 * @property id The ID of the checklist.
 * @property idBoard The ID of the board the checklist is on.
 * @property idCard The ID of the card the checklist is on.
 * @property name The name of the checklist.
 * @property pos The position of the checklist on the card (relative to any other checklists
 *               on the card).
 * @property [limits] Limit data associated with the checklist.
 * @property [creationMethod] Creation method for the checklist.
 */
export interface ChecklistRecord {
  id: string;
  idBoard: string;
  idCard: string;
  name: string;
  pos: number;
  limits?: Limits;
  creationMethod?: string | null;
}

export type ChecklistField = ValidResourceFields<ChecklistRecord>;

export class Checklist extends BaseResource {
  public getChecklist(params?: {
    cards?: CardFilter;
    checkItemFields?: AllOfOrListOf<CheckItemField>;
    checkItems?: AllOrNone;
    fields?: AllOfOrListOf<ChecklistField>;
  }): TypedFetch<ChecklistRecord> {
    this.validateGetSingle();
    return this.apiGet("/", params);
  }

  public getChecklists(params?: {
    cards?: CardFilter;
    checkItemFields?: AllOfOrListOf<CheckItemField>;
    checkItems?: AllOrNone;
    fields?: AllOfOrListOf<ChecklistField>;
    filter?: AllOrNone;
  }): TypedFetch<ChecklistRecord[]> {
    return this.apiGet("/", params);
  }

  public getNestedChecklists<TPayload extends object>(params?: {
    checklists?: AllOrNone;
    checklistFields?: AllOfOrListOf<ChecklistField>;
    checkItems?: "all";
    checkItemFields?: AllOfOrListOf<CheckItemField>;
  }): TypedFetch<TPayload & { checklists: ChecklistRecord[] }> {
    return this.apiGetNested(params);
  }

  public getFieldValue<T>(field: ChecklistField): TypedFetch<ValueResponse<T>> {
    return this.apiGet(`/${field}`);
  }

  public addChecklist(params: {
    idCard?: string;
    idChecklistSource?: string;
    name?: string;
    pos?: PositionNumbered;
  }): TypedFetch<ChecklistRecord> {
    let updatedArgs = params;
    if (this.pathElements[0] === "cards") {
      updatedArgs = { ...params, idCard: this.pathElements[1] };
    }
    return this.apiPost("/", updatedArgs);
  }

  public updateChecklist(params: {
    name?: string;
    pos?: PositionNumbered;
  }): TypedFetch<ChecklistRecord> {
    this.validateUpdate(params);
    return this.apiPut("/", params);
  }

  public updateName(value: string): TypedFetch<ChecklistRecord> {
    return this.apiPut("/name", { value });
  }

  public updatePosition(value: PositionNumbered): TypedFetch<ChecklistRecord> {
    return this.apiPut("/pos", { value });
  }

  public deleteChecklist(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }

  public board(): Board {
    return new Board(this.config, this.pathElements, "board");
  }

  public cards(): Card {
    return new Card(this.config, this.pathElements, "cards");
  }

  public checkItem(checkItemId: string = ""): CheckItem {
    return new CheckItem(
      this.config,
      this.pathElements,
      "checkItem",
      checkItemId,
    );
  }

  public checkItems(checkItemId: string = ""): CheckItem {
    return new CheckItem(
      this.config,
      this.pathElements,
      "checkItems",
      checkItemId,
    );
  }
}
