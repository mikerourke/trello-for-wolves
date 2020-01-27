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
  AllOfOrListOf,
  FilterDate,
  Format,
  Limits,
  TypedFetch,
  ValueResponse,
} from "../typeDefs";

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
 * @typedef {Object} ActionRecord
 * @property id The ID of the action.
 * @property idMemberCreator The ID of the member who caused the action.
 * @property data Relevant information regarding the action.
 * @property type The type of the action (based on the associated resource).
 * @property date Date the action occurred.
 * @property limits Limit data associated with the action.
 * @property [memberCreator] Optional member creator details.
 */
export interface ActionRecord<T = ActionType> {
  id: string;
  idMemberCreator: string;
  data: unknown;
  type: T;
  date: string;
  limits: Limits;
  memberCreator: MemberCreatorRecord;
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

export type ActionField = "id" | "data" | "date" | "idMemberCreator" | "type";

/**
 * Actions are generated whenever an action occurs in Trello. For instance, when
 * a user deletes a card, a deleteCard action is generated and includes
 * information about the deleted card, the list the card was in, the board the
 * card was on, the user that deleted the card, and the idObject of the action.
 *
 * Actions for Trello objects can be listed from nested action endpoints - e.g.
 * the resource GET /1/boards/[board_id]/actions lists all of the actions for
 * the given board.
 * @see https://developers.trello.com/reference#actions
 * @class
 */
export class Action<TActionType = ActionType> extends BaseResource {
  public getAction(params?: {
    display?: boolean;
    entities?: boolean;
    fields?: AllOfOrListOf<ActionField>;
    member?: boolean;
    memberFields?: AllOfOrListOf<MemberInvitedField>;
    memberCreator?: boolean;
    memberCreatorFields?: AllOfOrListOf<MemberInvitedField>;
  }): TypedFetch<ActionRecord<TActionType>> {
    return this.apiGet("/", params);
  }

  public getActions(params?: {
    entities?: boolean;
    display?: boolean;
    filter?: AllOfOrListOf<TActionType>;
    fields?: AllOfOrListOf<ActionField>;
    limit?: number;
    format?: Format;
    since?: FilterDate;
    before?: FilterDate;
    page?: number; // Not allowed for Card resources
    idModels?: string;
    member?: boolean;
    memberFields?: AllOfOrListOf<MemberInvitedField>;
    memberCreator?: boolean;
    memberCreatorFields?: AllOfOrListOf<MemberInvitedField>;
  }): TypedFetch<ActionRecord<TActionType>[]> {
    return this.apiGet("/", params);
  }

  public getNestedActions<TPayload extends object>(params?: {
    actions?: AllOfOrListOf<TActionType>;
    actionsEntities?: boolean;
    actionsDisplay?: boolean;
    actionsFormat?: Format;
    actionsSince?: string;
    actionsLimit?: number;
    actionFields?: AllOfOrListOf<ActionField>;
    actionMember?: boolean;
    actionMemberFields?: AllOfOrListOf<MemberField>;
    actionMemberCreator?: boolean;
    actionMemberCreatorFields?: AllOfOrListOf<MemberField>;
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
}
