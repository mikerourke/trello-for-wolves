import {
  ActionField,
  ActionRecord,
  ActionType,
  AllOrFieldOrListOf,
  DisplayRecord,
  EntityRecord,
  FilterDate,
  Format,
  NestedMemberCreatorParams,
  NestedMemberParams,
  NestedReactionsParams,
  ReactionSummaryRecord,
  TypedFetch,
  ValueResponse,
} from "../typeDefs";

import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import { Card } from "./Card";
import { List } from "./List";
import { Member } from "./Member";
import { Organization } from "./Organization";
import { Reaction } from "./Reaction";

/**
 * Actions are generated whenever an action occurs in Trello. For instance, when
 * a user deletes a card, a deleteCard action is generated and includes
 * information about the deleted card, the list the card was in, the board the
 * card was on, the user that deleted the card, and the idObject of the action.
 *
 * Actions for Trello objects can be listed from nested action endpoints - e.g.
 * the resource GET /1/boards/[board_id]/actions lists all of the actions for
 * the given board.
 *
 * Note: The only action that can be added, updated, and deleted is a "commentCard"
 * action. If you wish to perform any of these operations, use the `comment()`
 * initializer on a `Card` instance (e.g. `trello.cards().comments().addComment()`.
 * @see https://developers.trello.com/reference#actions
 * @class
 */
export class Action<TActionType = ActionType> extends BaseResource {
  public getAction(
    params?: {
      display?: boolean;
      entities?: boolean;
      fields?: AllOrFieldOrListOf<ActionField>;
    } & NestedMemberParams &
      NestedMemberCreatorParams &
      NestedReactionsParams,
  ): TypedFetch<ActionRecord<TActionType>> {
    return this.apiGet("/", params as Record<string, unknown>);
  }

  public getActions(
    params?: {
      entities?: boolean;
      display?: boolean;
      filter?: AllOrFieldOrListOf<TActionType>;
      fields?: AllOrFieldOrListOf<ActionField>;
      limit?: number;
      format?: Format;
      since?: FilterDate;
      before?: FilterDate;
      page?: number; // Not allowed for Card resources
      idModels?: string;
    } & NestedMemberParams &
      NestedMemberCreatorParams &
      NestedReactionsParams,
  ): TypedFetch<ActionRecord<TActionType>[]> {
    return this.apiGet("/", params as Record<string, unknown>);
  }

  public getFieldValue<T>(field: ActionField): TypedFetch<ValueResponse<T>> {
    return this.apiGet(`/${field}`);
  }

  public getDisplay(): TypedFetch<DisplayRecord<TActionType>> {
    return this.apiGet("/display");
  }

  public getEntities(): TypedFetch<EntityRecord<TActionType>[]> {
    return this.apiGet("/entities");
  }

  public getReactionsSummary(): TypedFetch<ReactionSummaryRecord[]> {
    return this.apiGet("/reactionsSummary");
  }

  public updateAction(params: {
    text: string;
  }): TypedFetch<ActionRecord<TActionType>> {
    return this.apiPut("/", params);
  }

  public updateText(value: string): TypedFetch<ActionRecord<TActionType>> {
    return this.apiPut("/text", { value });
  }

  public deleteAction(): TypedFetch<ValueResponse<null>> {
    return this.apiDelete("/");
  }

  public board(): Board {
    return new Board(this.config, this.pathElements, "board");
  }

  public card(): Card {
    return new Card(this.config, this.pathElements, "card");
  }

  public list(): List {
    return new List(this.config, this.pathElements, "list");
  }

  public member(): Member {
    return new Member(this.config, this.pathElements, "member");
  }

  public memberCreator(): Member {
    return new Member(this.config, this.pathElements, "memberCreator");
  }

  public organization(): Organization {
    return new Organization(this.config, this.pathElements, "organization");
  }

  public reactions(idReaction: string = ""): Reaction {
    return new Reaction(this.config, this.pathElements, "reactions", {
      identifier: idReaction,
    });
  }
}
