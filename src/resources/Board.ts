import { BaseResource } from "./BaseResource";
import { Action, ActionField } from "./Action";
import { AttachmentField, AttachmentFilter } from "./Attachment";
import { BoardMyPrefs } from "./BoardMyPrefs";
import { BoardStar, BoardStarsFilter } from "./BoardStar";
import { Card, CardAging, CardField, CardFilter } from "./Card";
import { Checklist, ChecklistField } from "./Checklist";
import { CustomField } from "./CustomField";
import { Label, LabelColor, LabelField } from "./Label";
import { List, ListField, ListFilter } from "./List";
import { Member, MemberInvitedField, MemberFilter } from "./Member";
import { Membership, MembershipFilter } from "./Membership";
import { Organization, OrganizationField } from "./Organization";
import { Plugin } from "./Plugin";
import {
  AllOfOrListOf,
  AllOrNone,
  FilterDate,
  Format,
  KeepFromSourceField,
  Limits,
  PermissionLevel,
  TypedFetch,
  ValidResourceFields,
  ValueResponse,
} from "../typeDefs";

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

export type BoardBackgroundColor =
  | "blue"
  | "orange"
  | "green"
  | "red"
  | "purple"
  | "pink"
  | "lime"
  | "sky"
  | "grey";

export type BoardFilter =
  | "closed"
  | "members"
  | "open"
  | "organization"
  | "public"
  | "starred";

export type BoardMemberType = "admin" | "normal" | "observer";

export type BoardPermissionLevel = PermissionLevel | "org";

export type GroupPermission =
  | "disabled"
  | "members"
  | "observers"
  | "org"
  | "public";

export type PowerUp = "calendar" | "cardAging" | "recap" | "voting";

export type Invitation = "admins" | "members";

export interface BackgroundImageScaledRecord {
  url: string;
  height: number;
  width: number;
}

export interface BoardPrefsRecord {
  permissionLevel: PermissionLevel;
  /**
   * Determines whether the Voting Power-Up should hide who voted on cards or
   * not.
   */
  hideVotes: boolean;
  /** Who can vote on this board. */
  voting: GroupPermission;
  /** Who can comment on cards on this board. */
  comments: GroupPermission;
  /** Who can invite people to this board. */
  invitations: GroupPermission;
  /** Whether team members can join the board themselves. */
  selfJoin: boolean;
  /** Whether card covers should be displayed on this board. */
  cardCovers: boolean;
  isTemplate: boolean;
  cardAging: CardAging;
  /** Determines whether the calendar feed is enabled or not. */
  calendarFeedEnabled: boolean;
  /** The id of a custom background or color. */
  background: BoardBackgroundColor | string;
  backgroundImage: string;
  backgroundImageScaled: BackgroundImageScaledRecord[];
  backgroundTile: boolean;
  backgroundBrightness: string;
  backgroundBottomColor: string;
  backgroundTopColor: string;
  canBePublic: boolean;
  canBeEnterprise: boolean;
  canBeOrg: boolean;
  canBePrivate: boolean;
  canInvite: boolean;
}

export interface BoardRecord {
  /** The ID of the board. */
  id: string;
  /** The name of the board. */
  name: string;
  /**
   * The description of the board.
   * @deprecated
   */
  desc: string;
  /**
   * If the description includes custom emoji, this will contain the data
   * necessary to display them.
   */
  descData: unknown | null;
  /** Boolean whether the board has been closed or not. */
  closed: boolean;
  /** MongoID of the organization to which the board belongs. */
  idOrganization: string | null;
  /** Boolean whether the board has been pinned or not. */
  pinned: boolean;
  /** Persistent URL for the board. */
  url: string;
  /** URL for the board using only its shortMongoID. */
  shortUrl: string;
  /** Short for "preferences", these are the settings for the board. */
  prefs?: BoardPrefsRecord;
  /**
   * Object containing color keys and the label names given for one label of
   * each color on the board.
   */
  labelNames: Record<LabelColor, string>;
  /** Whether the board has been starred by the current request's user.. */
  starred: boolean;
  /** An object containing information on the limits that exist for the board. */
  limits: Limits;
  /**
   * Array of objects that represent the relationship of users to this board as
   * memberships.
   */
  memberships: Membership[];
  /** Whether the board is owned by an Enterprise or not. */
  enterpriseOwned: boolean;
  idEnterprise?: string | null;
  shortLink?: string;
  subscribed?: boolean;
  powerUps?: PowerUp[];
  dateLastActivity?: string;
  dateLastView?: string;
  idTags?: string;
  datePluginDisable?: string | null;
  creationMethod?: string | null;
  ixUpdate?: string;
  templateGallery?: string | null;
}

export interface BoardPluginRecord {
  id: string;
  idBoard: string;
  idPlugin: string;
}

export type BoardField = ValidResourceFields<BoardRecord>;

export interface GetBoardsViaQueryParams {
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
}

export interface GetBoardsViaUrlParams {
  actions?: AllOfOrListOf<BoardActionType>;
  actionFields?: AllOfOrListOf<ActionField>;
  actionsEntities?: boolean;
  actionsFormat?: Format;
  actionsLimit?: number;
  actionsSince?: FilterDate;
  fields?: AllOfOrListOf<BoardField>;
  filter?: AllOfOrListOf<BoardFilter>;
  lists?: ListFilter;
  memberships?: AllOfOrListOf<MembershipFilter>;
  organization?: boolean;
  organizationFields?: AllOfOrListOf<OrganizationField>;
}

export type GetBoardsReturnType<
  TParams,
  TPayload
> = TParams extends GetBoardsViaUrlParams
  ? BoardRecord[]
  : TPayload & { boards: BoardRecord[] };

export type AnyGetBoardsParams =
  | GetBoardsViaUrlParams
  | GetBoardsViaQueryParams;

export class Board extends BaseResource {
  public getBoard(params?: {
    actions?: AllOfOrListOf<BoardActionType>;
    actionFields?: AllOfOrListOf<ActionField>;
    actionMember?: boolean;
    actionMemberCreator?: boolean;
    actionMemberCreatorFields?: AllOfOrListOf<MemberInvitedField>;
    actionMemberFields?: AllOfOrListOf<MemberInvitedField>;
    actionsDisplay?: boolean;
    actionsEntities?: boolean;
    actionsFormat?: Format;
    actionsLimit?: number;
    actionsSince?: FilterDate;
    boardStars?: BoardStarsFilter;
    cardAttachmentFields?: AllOfOrListOf<AttachmentField>;
    cardAttachments?: AttachmentFilter;
    cardChecklists?: AllOrNone;
    cardFields?: AllOfOrListOf<CardField>;
    cardPluginData?: boolean;
    cards?: CardFilter;
    cardStickers?: boolean;
    checklistFields?: AllOfOrListOf<ChecklistField>;
    checklists?: AllOrNone;
    customFields?: boolean;
    fields?: AllOfOrListOf<BoardField>;
    labelFields?: AllOfOrListOf<LabelField>;
    labels?: AllOrNone;
    labelsLimit?: number;
    listFields?: AllOfOrListOf<ListField>;
    lists?: ListFilter;
    memberFields?: AllOfOrListOf<MemberInvitedField>;
    members?: MemberFilter;
    memberships?: AllOfOrListOf<MembershipFilter>;
    membershipsMember?: boolean;
    membershipsMemberFields?: AllOfOrListOf<MemberInvitedField>;
    membersInvited?: MemberFilter;
    membersInvitedFields?: AllOfOrListOf<MemberInvitedField>;
    myPrefs?: boolean;
    organization?: boolean;
    organizationFields?: AllOfOrListOf<OrganizationField>;
    organizationMemberships?: AllOfOrListOf<MembershipFilter>;
    organizationPluginData?: boolean;
    pluginData?: boolean;
    tags?: boolean;
  }): TypedFetch<BoardRecord> {
    return this.apiGet("/", params);
  }

  public getBoards<
    TPayload extends object,
    TParams extends AnyGetBoardsParams = {}
  >(params?: TParams): TypedFetch<GetBoardsReturnType<TParams, TPayload>> {
    return this.apiGet("/", params);
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
  }): TypedFetch<BoardRecord> {
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

  public updateBackground(value: string): TypedFetch<BoardRecord> {
    return this.apiPut("/prefs/background", { value });
  }

  public updateCalendarFeedEnabled(value: boolean): TypedFetch<BoardRecord> {
    return this.apiPut("/prefs/calendarFeedEnabled", { value });
  }

  public updateCardAging(value: CardAging): TypedFetch<BoardRecord> {
    return this.apiPut("/prefs/cardAging", { value });
  }

  public updateCardCovers(value: boolean): TypedFetch<BoardRecord> {
    return this.apiPut("/prefs/cardCovers", { value });
  }

  public updateComments(value: GroupPermission): TypedFetch<BoardRecord> {
    return this.apiPut("/prefs/comments", { value });
  }

  public updateInvitations(value: Invitation): TypedFetch<BoardRecord> {
    return this.apiPut("/prefs/invitations", { value });
  }

  public updatePermissionLevel(
    value: BoardPermissionLevel,
  ): TypedFetch<BoardRecord> {
    return this.apiPut("/prefs/permissionLevel", { value });
  }

  public updateSelfJoin(value: boolean): TypedFetch<BoardRecord> {
    return this.apiPut("/prefs/selfJoin", { value });
  }

  public updateVoting(value: GroupPermission): TypedFetch<BoardRecord> {
    return this.apiPut("/prefs/voting", { value });
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
    return new Action<BoardActionType>(
      this.config,
      `${this.baseEndpoint}/actions`,
    );
  }

  public boardStars(): BoardStar {
    return new BoardStar(this.config, `${this.baseEndpoint}/boardStars`);
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

  public myPrefs(): BoardMyPrefs {
    return new BoardMyPrefs(this.config, `${this.baseEndpoint}/myPrefs`);
  }

  public organization(): Organization {
    return new Organization(this.config, `${this.baseEndpoint}/organization`);
  }

  public plugins(): Plugin {
    return new Plugin(this.config, `${this.baseEndpoint}/plugins`);
  }
}
