import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import { Card, CardFilter } from "./Card";
import { CheckItem, CheckItemField, CheckItemRecord } from "./CheckItem";
import {
  AllOrFieldOrListOf,
  AllOrNone,
  Limits,
  PositionOrFloat,
  TypedFetch,
  ValueResponse,
} from "../typeDefs";

/**
 * The data corresponding to a checklist. The fields that are present in the
 * record are contingent on the `fields`/`checklistFields` param passed to the
 * method used to retrieve the checklist data.
 * @typedef {Object} ChecklistRecord
 * @property id The ID of the checklist.
 * @property idBoard The ID of the board the checklist is on.
 * @property idCard The ID of the card the checklist is on.
 * @property name The name of the checklist.
 * @property pos The position of the checklist on the card (relative to any other
 *               checklists on the card).
 * @property checkItems Array of check items in the checklist.
 * @property [limits] Limit data associated with the checklist.
 * @property [creationMethod] Creation method for the checklist.
 */
export interface ChecklistRecord {
  id: string;
  idBoard: string;
  idCard: string;
  name: string;
  pos: number;
  checkItems?: CheckItemRecord[];
  limits?: Limits;
  creationMethod?: string | null;
}

export type ChecklistField = "id" | "idBoard" | "idCard" | "name" | "pos";

/**
 * Checklists are lists on boards that have items that can be completed or
 * "checked off".
 * @see https://developers.trello.com/reference#checklist
 * @class
 */
export class Checklist extends BaseResource {
  public getChecklist(params?: {
    cards?: CardFilter;
    checkItemFields?: AllOrFieldOrListOf<CheckItemField>;
    checkItems?: AllOrNone;
    fields?: AllOrFieldOrListOf<ChecklistField>;
  }): TypedFetch<ChecklistRecord> {
    return this.apiGet("/", params);
  }

  public getChecklists(params?: {
    cards?: CardFilter;
    checkItemFields?: AllOrFieldOrListOf<CheckItemField>;
    checkItems?: AllOrNone;
    fields?: AllOrFieldOrListOf<ChecklistField>;
    filter?: AllOrNone;
  }): TypedFetch<ChecklistRecord[]> {
    return this.apiGet("/", params);
  }

  public getNestedChecklists<TPayload extends object>(params?: {
    checklists?: AllOrNone;
    checklistFields?: AllOrFieldOrListOf<ChecklistField>;
    checkItems?: "all";
    checkItemFields?: AllOrFieldOrListOf<CheckItemField>;
  }): TypedFetch<TPayload & { checklists: ChecklistRecord[] }> {
    return this.apiGetNested(params);
  }

  public getFieldValue<T>(field: ChecklistField): TypedFetch<ValueResponse<T>> {
    return this.apiGet(`/${field}`);
  }

  public addChecklist(params: {
    idCard?: string;
    name?: string;
    pos?: PositionOrFloat;
    idChecklistSource?: string;
  }): TypedFetch<ChecklistRecord> {
    const updatedParams = { ...params };
    if (this.isChildOf("card")) {
      updatedParams.idCard = this.pathElements[1];
    }

    if (!updatedParams.idCard) {
      throw new Error(
        `You must specify the "idCard" param when calling addLabel()`,
      );
    }

    return this.apiPost("/", updatedParams);
  }

  public updateChecklist(params: {
    name?: string;
    pos?: PositionOrFloat;
  }): TypedFetch<ChecklistRecord> {
    return this.apiPut("/", params);
  }

  public updateName(value: string): TypedFetch<ChecklistRecord> {
    return this.apiPut("/name", { value });
  }

  public updatePosition(value: PositionOrFloat): TypedFetch<ChecklistRecord> {
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

  public checkItem(idCheckItem: string): CheckItem {
    return new CheckItem(this.config, this.pathElements, "checkItem", {
      identifier: idCheckItem,
    });
  }

  public checkItems(idCheckItem: string = ""): CheckItem {
    return new CheckItem(this.config, this.pathElements, "checkItems", {
      identifier: idCheckItem,
    });
  }
}
