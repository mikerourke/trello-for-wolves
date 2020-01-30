import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import { Card } from "./Card";
import { List } from "./List";
import {
  Member,
  MemberCreatorRecord,
  MemberInvitedField,
  MemberField,
} from "./Member";
import { Organization } from "./Organization";
import {
  AllOrFieldOrListOf,
  FilterDate,
  Format,
  Limits,
  TypedFetch,
  ValidResourceFields,
  ValueResponse,
} from "../typeDefs";
import { Reaction, ReactionSummaryRecord } from "./Reaction";

/**
 * These action types are valid for any calls to get actions. The API may
 * throw an error if the action doesn't corresponded with the parent resource.
 */
export type ActionType =
  | "acceptEnterpriseJoinRequest"
  | "addAdminToBoard"
  | "addAdminToOrganization"
  | "addAttachmentToCard"
  | "addChecklistToCard"
  | "addLabelToCard"
  | "addMemberToBoard"
  | "addMemberToCard"
  | "addMemberToOrganization"
  | "addOrganizationToEnterprise"
  | "addToEnterprisePluginWhitelist"
  | "addToOrganizationBoard"
  | "commentCard"
  | "convertToCardFromCheckItem"
  | "copyBoard"
  | "copyCard"
  | "copyChecklist"
  | "createCheckItem" // Excluded Only
  | "createLabel"
  | "copyCommentCard"
  | "createBoard"
  | "createBoardInvitation"
  | "createBoardPreference"
  | "createCard"
  | "createList"
  | "createOrganization"
  | "createOrganizationInvitation"
  | "deleteAttachmentFromCard"
  | "deleteBoardInvitation"
  | "deleteCard"
  | "deleteCheckItem"
  | "deleteComment" // Excluded Only
  | "deleteLabel"
  | "deleteOrganizationInvitation"
  | "disableEnterprisePluginWhitelist"
  | "disablePlugin"
  | "disablePowerUp"
  | "emailCard"
  | "enableEnterprisePluginWhitelist"
  | "enablePlugin"
  | "enablePowerUp"
  | "makeAdminOfBoard"
  | "makeAdminOfOrganization"
  | "makeNormalMemberOfBoard"
  | "makeNormalMemberOfOrganization"
  | "makeObserverOfBoard"
  | "memberJoinedTrello"
  | "moveCardFromBoard"
  | "moveCardToBoard"
  | "moveListFromBoard"
  | "moveListToBoard"
  | "removeAdminFromBoard"
  | "removeAdminFromOrganization"
  | "removeChecklistFromCard"
  | "removeFromEnterprisePluginWhitelist"
  | "removeFromOrganizationBoard"
  | "removeLabelFromCard"
  | "removeMemberFromBoard"
  | "removeMemberFromCard"
  | "removeMemberFromOrganization"
  | "removeOrganizationFromEnterprise"
  | "unconfirmedBoardInvitation"
  | "unconfirmedOrganizationInvitation"
  | "updateBoard"
  | "updateCard"
  | "updateCheckItem"
  | "updateCheckItemStateOnCard"
  | "updateChecklist"
  | "updateComment" // Excluded Only
  | "updateLabel"
  | "updateList"
  | "updateMember"
  | "updateOrganization"
  | "voteOnCard";

/**
 * The data corresponding to an action. The fields that are present in the
 * record are contingent on the `fields`/`actionFields` param passed to
 * the method used to retrieve the action data.
 * @typedef {Object} ActionRecord
 * @property id The ID of the action.
 * @property idMemberCreator The ID of the member who caused the action.
 * @property data Relevant information regarding the action.
 * @property type The type of the action (based on the associated resource).
 * @property date Date the action occurred.
 * @property [limits] Limit data associated with the action.
 * @property [creationMethod] Creation method for the action.
 */
export interface ActionRecord<T = ActionType> {
  id: string;
  idMemberCreator: string;
  data: unknown;
  type: T;
  date: string;
  memberCreator: MemberCreatorRecord;
  limits?: Limits;
  creationMethod?: string | null;
}

export interface EntityRecord<T = ActionType> {
  id: string;
  type: T;
  text: string;
  shortLink?: string;
  username?: string;
  due?: string;
  current?: string;
}

export interface DisplayRecord<T = ActionType> {
  translationKey: string;
  entities: EntityRecord<T>[];
}

export type ActionField = ValidResourceFields<ActionRecord>;

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
  public getAction(params?: {
    display?: boolean;
    entities?: boolean;
    fields?: AllOrFieldOrListOf<ActionField>;
    member?: boolean;
    memberFields?: AllOrFieldOrListOf<MemberInvitedField>;
    memberCreator?: boolean;
    memberCreatorFields?: AllOrFieldOrListOf<MemberInvitedField>;
  }): TypedFetch<ActionRecord<TActionType>> {
    return this.apiGet("/", params);
  }

  public getActions(params?: {
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
    member?: boolean;
    memberFields?: AllOrFieldOrListOf<MemberInvitedField>;
    memberCreator?: boolean;
    memberCreatorFields?: AllOrFieldOrListOf<MemberInvitedField>;
  }): TypedFetch<ActionRecord<TActionType>[]> {
    return this.apiGet("/", params);
  }

  public getNestedActions<TPayload extends object>(params?: {
    actions?: AllOrFieldOrListOf<TActionType>;
    actionsEntities?: boolean;
    actionsDisplay?: boolean;
    actionsFormat?: Format;
    actionsSince?: string;
    actionsLimit?: number;
    actionFields?: AllOrFieldOrListOf<ActionField>;
    actionMember?: boolean;
    actionMemberFields?: AllOrFieldOrListOf<MemberField>;
    actionMemberCreator?: boolean;
    actionMemberCreatorFields?: AllOrFieldOrListOf<MemberField>;
  }): TypedFetch<TPayload & { actions: ActionRecord<TActionType>[] }> {
    return this.apiGetNested(params);
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
