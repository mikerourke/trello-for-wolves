import { TrelloForWolvesError } from "../TrelloForWolvesError";
import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import { Card } from "./Card";
import { CheckItem } from "./CheckItem";
import {
  AllOrFieldOrListOf,
  AllOrNone,
  AnyParams,
  CheckItemField,
  ChecklistField,
  ChecklistRecord,
  NestedActionsParams,
  NestedBoardParams,
  NestedCardsParams,
  NestedChecklistsParams,
  PositionOrFloat,
  TypedFetch,
  ValueResponse,
} from "../typeDefs";

type GetChecklistsParams =
  | {
      fields?: AllOrFieldOrListOf<ChecklistField>;
      filter?: AllOrNone;
      checkItems?: AllOrNone;
      checkItemFields?: AllOrFieldOrListOf<CheckItemField>;
    }
  | NestedChecklistsParams;

/**
 * Checklists are lists on boards that have items that can be completed or
 * "checked off".
 * @see https://developers.trello.com/reference#checklist
 * @class
 */
export class Checklist extends BaseResource {
  public getChecklist(
    params?: {
      fields?: AllOrFieldOrListOf<ChecklistField>;
      checkItems?: AllOrNone;
      checkItemFields?: AllOrFieldOrListOf<CheckItemField>;
    } & NestedActionsParams &
      NestedBoardParams &
      NestedCardsParams,
  ): TypedFetch<ChecklistRecord> {
    return this.apiGet("/", params as Record<string, unknown>);
  }

  public getChecklists(
    params?: GetChecklistsParams & NestedActionsParams & NestedBoardParams,
  ): TypedFetch<ChecklistRecord[]> {
    return this.apiGet("/", params as AnyParams);
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
      updatedParams.idCard = this.parentElements[1];
    }

    if (!updatedParams.idCard) {
      throw new TrelloForWolvesError(
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
