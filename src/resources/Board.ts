import { BaseResource } from "./BaseResource";
import { Action, ActionField } from "./Action";
import { BoardMyPref } from "./BoardMyPref";
import {
  BoardPermissionLevel,
  BoardPref,
  GroupPermission,
  Invitation,
} from "./BoardPref";
import { BoardStarRecord, BoardStarsFilter } from "./BoardStar";
import { Card, CardAging, CardFilter } from "./Card";
import { Checklist } from "./Checklist";
import { CustomField } from "./CustomField";
import { Label, LabelColor } from "./Label";
import { List, ListFilter } from "./List";
import { Member, MemberField, MemberFilter } from "./Member";
import { Membership, MembershipFilter } from "./Membership";
import { Organization } from "./Organization";
import { Plugin } from "./Plugin";
import {
  AllOfOrListOf,
  AllOrNone,
  FilterDate,
  Format,
  KeepFromSourceField,
  PermissionLevel,
  QueryParamsByName,
  TypedFetch,
  ValueResponse,
} from "../typeDefs";

export type BoardRecord = {
  id: string;
  name: string;
  desc: string;
  descData: string | null;
  closed: boolean;
  idOrganization: string | null;
  idEnterprise: string | null;
  pinned: boolean;
  url: string;
  shortUrl: string;
  labelNames: Record<LabelColor, string>;
  starred?: boolean;
  shortLink?: string;
  subscribed?: boolean;
  powerUps?: string[];
  dateLastActivity?: string;
  dateLastView?: string;
  idTags?: string;
  datePluginDisable?: string | null;
  creationMethod?: string | null;
  ixUpdate?: string;
  templateGallery?: string | null;
  enterpriseOwned?: boolean;
};

export type BoardPluginRecord = {
  id: string;
  idBoard: string;
  idPlugin: string;
};

export type BoardStarsResponseRecord = {
  id: string;
  boardStars: BoardStarRecord[];
};

export type BoardActionType =
  | "addAttachmentToCard"
  | "addChecklistToCard"
  | "addMemberToBoard"
  | "addMemberToCard"
  | "addMemberToOrganization"
  | "addToOrganizationBoard"
  | "commentCard"
  | "convertToCardFromCheckItem"
  | "copyBoard"
  | "copyCard"
  | "copyCommentCard"
  | "createBoard"
  | "createCard"
  | "createList"
  | "createOrganization"
  | "deleteAttachmentFromCard"
  | "deleteBoardInvitation"
  | "deleteCard"
  | "deleteOrganizationInvitation"
  | "disablePowerUp"
  | "emailCard"
  | "enablePowerUp"
  | "makeAdminOfBoard"
  | "makeNormalMemberOfBoard"
  | "makeNormalMemberOfOrganization"
  | "makeObserverOfBoard"
  | "memberJoinedTrello"
  | "moveCardFromBoard"
  | "moveCardToBoard"
  | "moveListFromBoard"
  | "moveListToBoard"
  | "removeChecklistFromCard"
  | "removeFromOrganizationBoard"
  | "removeMemberFromCard"
  | "unconfirmedBoardInvitation"
  | "unconfirmedOrganizationInvitation"
  | "updateBoard"
  | "updateCard"
  | "updateCard:closed"
  | "updateCard:desc"
  | "updateCard:idList"
  | "updateCard:name"
  | "updateCheckItemStateOnCard"
  | "updateChecklist"
  | "updateList"
  | "updateList:closed"
  | "updateList:name"
  | "updateMember"
  | "updateOrganization";

export type BoardField =
  | "closed"
  | "dateLastActivity"
  | "dateLastView"
  | "desc"
  | "descData"
  | "idOrganization"
  | "invitations"
  | "invited"
  | "labelNames"
  | "memberships"
  | "name"
  | "pinned"
  | "powerUps"
  | "prefs"
  | "shortLink"
  | "shortUrl"
  | "starred"
  | "subscribed"
  | "url";

export type BoardFilter =
  | "closed"
  | "members"
  | "open"
  | "organization"
  | "public"
  | "starred";

export type BoardMemberType = "admin" | "normal" | "observer";

export type PowerUp = "calendar" | "cardAging" | "recap" | "voting";

export type GetBoardParams = {
  actions?: AllOfOrListOf<BoardActionType>;
  boardStars?: BoardStarsFilter;
  cards?: CardFilter;
  cardPluginData?: boolean;
  checklists?: AllOrNone;
  customFields?: boolean;
  fields?: AllOfOrListOf<BoardField>;
  labels?: AllOrNone;
  lists?: ListFilter;
  members?: MemberFilter;
  memberships?: AllOfOrListOf<MembershipFilter>;
  membersInvited?: MemberFilter;
  membersInvitedFields?: AllOfOrListOf<MemberField>;
  myPrefs?: boolean;
  organization?: boolean;
  organizationPluginData?: boolean;
  pluginData?: boolean;
  tags?: boolean;
};

export type NestedBoardsParams = {
  boards?: AllOfOrListOf<BoardFilter>;
  boardFields?: AllOfOrListOf<BoardField>;
  boardActions?: AllOfOrListOf<BoardActionType>;
  boardActionsEntities?: boolean;
  boardActionsDisplay?: boolean;
  boardActionsFormat?: Format;
  boardActionsSince?: FilterDate;
  boardActionsLimit?: number;
  boardActionFields?: AllOfOrListOf<ActionField>;
  boardLists?: ListFilter;
};

export class Board<
  TGetSingleParams = GetBoardParams,
  TGetMultipleParams = NestedBoardsParams
> extends BaseResource {
  public getBoard(params?: TGetSingleParams): TypedFetch<BoardRecord> {
    return this.apiGet("/", params as QueryParamsByName);
  }

  public getBoards(params?: TGetMultipleParams): TypedFetch<BoardRecord[]> {
    return this.apiGet("/", params as QueryParamsByName);
  }

  public getBoardsFilteredBy(
    filter: AllOfOrListOf<BoardFilter>,
  ): TypedFetch<unknown> {
    return this.apiGet("/", { filter });
  }

  public getFieldValue<T>(field: BoardField): TypedFetch<ValueResponse<T>> {
    return this.apiGet(`/${field}`);
  }

  public getBoardPlugins(): TypedFetch<BoardPluginRecord[]> {
    return this.apiGet("/boardPlugins");
  }

  public getBoardStars(params?: {
    filter?: BoardStarsFilter;
  }): TypedFetch<BoardStarsResponseRecord> {
    return this.apiGet("/boardStars", params);
  }

  public getTags(): TypedFetch<unknown> {
    return this.apiGet("/idTags");
  }

  public addBoard(params: {
    name: string;
    defaultLabels?: boolean;
    defaultLists?: boolean;
    desc?: string;
    idBoardSource?: string;
    idOrganization?: string;
    keepFromSource?: AllOfOrListOf<KeepFromSourceField>;
    prefs?: {
      permissionLevel?: PermissionLevel;
      voting?: GroupPermission;
      comments?: GroupPermission;
      invitations?: Invitation;
      selfJoin?: boolean;
      cardCovers?: boolean;
      background?: string;
      cardAging?: CardAging;
    };
    powerUps?: AllOfOrListOf<PowerUp>;
  }): TypedFetch<unknown> {
    return this.apiPost("/", { ...params, separator: "_" });
  }

  public enableBoardPlugin(idPlugin: string): TypedFetch<unknown> {
    return this.apiPost("/boardPlugins", { idPlugin });
  }

  public addPowerUp(value: PowerUp): TypedFetch<unknown> {
    return this.apiPost("/powerUps", { value });
  }

  public addTags(value: string): TypedFetch<unknown> {
    return this.apiPost("/tags", { value });
  }

  public generateCalendarKey(): TypedFetch<unknown> {
    return this.apiPost("/calendarKey/generate");
  }

  public generateEmailKey(): TypedFetch<unknown> {
    return this.apiPost("/emailKey/generate");
  }

  public updateBoard(params?: {
    closed?: boolean;
    desc?: string;
    idOrganization?: string;
    labelNames?: {
      blue?: string;
      green?: string;
      orange?: string;
      purple?: string;
      red?: string;
      yellow?: string;
    };
    name?: string;
    prefs?: {
      background?: string;
      calendarFeedEnabled?: boolean;
      cardAging?: CardAging;
      cardCovers?: boolean;
      comments?: GroupPermission;
      invitations?: Invitation;
      permissionLevel?: BoardPermissionLevel;
      selfJoin?: boolean;
      voting?: GroupPermission;
    };
    subscribed?: boolean;
  }): TypedFetch<unknown> {
    return this.apiPut("/", { ...params, separator: "/" });
  }

  public updateClosedStatus(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/closed", { value });
  }

  public updateDescription(value: string): TypedFetch<unknown> {
    return this.apiPut("/desc", { value });
  }

  public moveToOrganization(organizationId: string): TypedFetch<unknown> {
    return this.apiPut("/idOrganization", { value: organizationId });
  }

  public updateLabelNameForColor(
    labelColor: LabelColor,
    value: string,
  ): TypedFetch<unknown> {
    return this.apiPut(`/labelNames/${labelColor}`, { value });
  }

  public updateName(value: string): TypedFetch<unknown> {
    return this.apiPut("/name", { value });
  }

  public updateSubscribed(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/subscribed", { value });
  }

  public markAsViewed(): TypedFetch<unknown> {
    return this.apiPost("/markAsViewed");
  }

  public deleteBoard(id: string): TypedFetch<unknown> {
    return this.apiDelete("/", { id });
  }

  public disableBoardPlugin(idPlugin: string): TypedFetch<unknown> {
    return this.apiDelete("/boardPlugins", { idPlugin });
  }

  public deletePowerUp(powerUp: PowerUp): TypedFetch<unknown> {
    return this.apiDelete(`/powerUps/${powerUp}`);
  }

  public actions(): Action {
    return new Action(this.config, `${this.baseEndpoint}/actions`);
  }

  public cards(cardId: string = ""): Card {
    return new Card(this.config, `${this.baseEndpoint}/cards/${cardId}`);
  }

  public checklists(): Checklist {
    return new Checklist(this.config, `${this.baseEndpoint}/checklists`);
  }

  public customFields(): CustomField {
    return new CustomField(this.config, `${this.baseEndpoint}/customFields`);
  }

  public labels(labelId: string = ""): Label {
    return new Label(this.config, `${this.baseEndpoint}/labels/${labelId}`);
  }

  public lists(): List {
    return new List(this.config, `${this.baseEndpoint}/lists`);
  }

  public members(memberId: string = ""): Member {
    return new Member(this.config, `${this.baseEndpoint}/members/${memberId}`);
  }

  public membersInvited(): Member {
    return new Member(this.config, `${this.baseEndpoint}/membersInvited`);
  }

  public memberships(membershipId: string = ""): Membership {
    return new Membership(
      this.config,
      `${this.baseEndpoint}/memberships/${membershipId}`,
    );
  }

  public myPrefs(): BoardMyPref {
    return new BoardMyPref(this.config, `${this.baseEndpoint}/myPrefs`);
  }

  public organization(): Organization {
    return new Organization(this.config, `${this.baseEndpoint}/organization`);
  }

  public plugins(): Plugin {
    return new Plugin(this.config, `${this.baseEndpoint}/plugins`);
  }

  public prefs(): BoardPref {
    return new BoardPref(this.config, `${this.baseEndpoint}/prefs`);
  }
}
