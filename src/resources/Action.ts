import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import { Card } from "./Card";
import { List } from "./List";
import {
  Member,
  NestedMemberField,
  MemberCreatorRecord,
  MemberInvitedField,
} from "./Member";
import { Organization } from "./Organization";
import {
  AllOfOrListOf,
  FieldOrListOf,
  FilterDate,
  Format,
  Limits,
  TypedFetch,
  ValidResourceFields,
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
  | "updateLabel"
  | "updateList"
  | "updateMember"
  | "updateOrganization"
  | "voteOnCard";

/**
 * These actions will be sent to Webhooks but are not included in nested action
 * resource responses (e.g. GET board/[board_id]/actions).
 */
export type ExcludedActionType =
  | "addAdminToBoard"
  | "addAdminToOrganization"
  | "addLabelToCard"
  | "copyChecklist"
  | "createBoardInvitation"
  | "createBoardPreference"
  | "createCheckItem"
  | "createLabel"
  | "createOrganizationInvitation"
  | "deleteAttachmentFromCard"
  | "deleteCheckItem"
  | "deleteComment"
  | "deleteLabel"
  | "makeAdminOfOrganization"
  | "removeAdminFromBoard"
  | "removeAdminFromOrganization"
  | "removeLabelFromCard"
  | "removeMemberFromBoard"
  | "removeMemberFromOrganization"
  | "updateCheckItem"
  | "updateComment"
  | "updateLabel"
  | "voteOnCard";

type AnyActionType = ActionType & ExcludedActionType;

export interface ActionRecord<T = AnyActionType> {
  /** The ID of the action. */
  id: string;
  /** The ID of the member who caused the action. */
  idMemberCreator: string;
  /** Relevant information regarding the action. */
  data: unknown;
  /** The type of the action. */
  type: T;
  /** When the action occurred. */
  date: string;
  limits: Limits;
  memberCreator: MemberCreatorRecord;
}

export interface EntityRecord<T = AnyActionType> {
  id: string;
  type: T;
  text: string;
  shortLink?: string;
  username?: string;
  due?: string;
  current?: string;
}

export interface DisplayRecord<T = AnyActionType> {
  translationKey: string;
  entities: EntityRecord<T>[];
}

export type ActionField = ValidResourceFields<ActionRecord>;

export interface GetActionsViaQueryParams {
  actionsEntities?: boolean;
  actionsDisplay?: boolean;
  actionsFormat?: Format;
  actionsSince?: string;
  actionsLimit?: number;
  actionFields?: AllOfOrListOf<ActionField>;
  actionMember?: FieldOrListOf<NestedMemberField>;
  actionMemberFields?: string;
  actionMemberCreator?: boolean;
  actionMemberCreatorFields?: FieldOrListOf<NestedMemberField>;
}

export interface GetActionsViaUrlParams<T = AnyActionType> {
  entities?: boolean;
  display?: boolean;
  filter?: AllOfOrListOf<T>;
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
}

export type GetActionsReturnType<
  TParams,
  TPayload,
  TActionType
> = TParams extends GetActionsViaUrlParams
  ? ActionRecord<TActionType>[]
  : TPayload & { actions: ActionRecord<TActionType>[] };

export type AnyGetActionsParams<T> =
  | GetActionsViaQueryParams
  | GetActionsViaUrlParams<T>;

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
export class Action<TActionType = AnyActionType> extends BaseResource {
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

  public getActions<
    TPayload extends object,
    TParams extends AnyGetActionsParams<TActionType> = {}
  >(
    params?: TParams,
  ): TypedFetch<GetActionsReturnType<TParams, TPayload, TActionType>[]> {
    return this.apiGet("/", params);
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
    return new Board(this.config, `${this.baseEndpoint}/board`);
  }

  public card(): Card {
    return new Card(this.config, `${this.baseEndpoint}/card`);
  }

  public list(): List {
    return new List(this.config, `${this.baseEndpoint}/list`);
  }

  public member(): Member {
    return new Member(this.config, `${this.baseEndpoint}/member`);
  }

  public memberCreator(): Member {
    return new Member(this.config, `${this.baseEndpoint}/memberCreator`);
  }

  public organization(): Organization {
    return new Organization(this.config, `${this.baseEndpoint}/organization`);
  }
}
