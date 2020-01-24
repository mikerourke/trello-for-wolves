import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import { Card } from "./Card";
import { List } from "./List";
import {
  Member,
  MemberBasicField,
  MemberCreatorRecord,
  MemberField,
} from "./Member";
import { Organization } from "./Organization";
import { CommentReactionRecord } from "./Reaction";
import {
  AllOfOrListOf,
  FieldOrListOf,
  Format,
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

export type CommentLimitsReactionsRecord = {
  perAction: CommentReactionRecord;
  uniquePerAction: CommentReactionRecord;
};

export type ActionRecord<T = AnyActionType> = {
  id: string;
  idMemberCreator: string;
  data: unknown;
  type: T;
  date: string;
  limits: {
    reactions?: CommentLimitsReactionsRecord;
  };
  memberCreator: MemberCreatorRecord;
};

export type ActionEntityRecord<T = AnyActionType> = {
  id: string;
  type: T;
  text: string;
  shortLink?: string;
  username?: string;
};

export type ActionDisplayRecord<T = AnyActionType> = {
  translationKey: string;
  entities: ActionEntityRecord<T>[];
};

export type ActionField = Omit<keyof ActionRecord, "memberCreator">;

export type GetSingleActionParams = {
  display?: boolean;
  entities?: boolean;
  fields?: AllOfOrListOf<ActionField>;
  member?: boolean;
  memberCreator?: boolean;
  memberCreatorFields?: AllOfOrListOf<MemberField>;
  memberFields?: AllOfOrListOf<MemberField>;
};

export type NestedActionsParams = {
  actionsEntities?: boolean;
  actionsDisplay?: boolean;
  actionsFormat?: Format;
  actionsSince?: string;
  actionsLimit?: number;
  actionFields?: AllOfOrListOf<ActionField>;
  actionMember?: FieldOrListOf<MemberBasicField>;
  actionMemberFields?: string;
  actionMemberCreator?: boolean;
  actionMemberCreatorFields?: FieldOrListOf<MemberBasicField>;
};

export class Action<TActionType = AnyActionType> extends BaseResource {
  public getAction(
    params?: GetSingleActionParams,
  ): TypedFetch<ActionRecord<TActionType>> {
    return this.apiGet("/", params);
  }

  public getActions(
    params?: NestedActionsParams,
  ): TypedFetch<ActionRecord<TActionType>[]> {
    return this.apiGet("/", params);
  }

  public getFieldValue<T>(field: ActionField): TypedFetch<ValueResponse<T>> {
    return this.apiGet(`/${field}`);
  }

  public getDisplay(): TypedFetch<ActionDisplayRecord<TActionType>> {
    return this.apiGet("/display");
  }

  public getEntities(): TypedFetch<ActionEntityRecord<TActionType>[]> {
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
