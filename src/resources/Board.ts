import { BaseResource } from "./BaseResource";
import { Action, ActionField } from "./Action";
import { AttachmentField, AttachmentFilter } from "./Attachment";
import { BoardMyPrefs } from "./BoardMyPrefs";
import { BoardStar, BoardStarsFilter } from "./BoardStar";
import { Card, CardAging, CardField, CardFilter } from "./Card";
import { Checklist, ChecklistField } from "./Checklist";
import { CustomField } from "./CustomField";
import { Label, LabelField } from "./Label";
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
  ColorName,
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

/**
 * @typedef {Object} BoardPrefsRecord
 * @property permissionLevel Determines whether the Voting Power-Up should hide who
 *                           voted on cards or not.
 * @property hideVotes Indicates if votes should be hidden.
 * @property voting Who can vote on this board.
 * @property comments Who can comment on cards on this board.
 * @property invitations Who can invite people to this board.
 * @property selfJoin Whether team members can join the board themselves.
 * @property cardCovers Whether card covers should be displayed on this board.
 * @property isTemplate Indicates if board can be used as a template.
 * @property cardAging
 * @property calendarFeedEnabled Determines whether the calendar feed is enabled or not.
 * @property background The id of a custom background or color.
 * @property backgroundImage URL of the board's background image.
 * @property backgroundImageScaled
 * @property backgroundTile
 * @property backgroundBrightness
 * @property backgroundBottomColor
 * @property backgroundTopColor
 * @property canBePublic
 * @property canBeEnterprise
 * @property canBeOrg
 * @property canBePrivate
 * @property canInvite
 */
export interface BoardPrefsRecord {
  permissionLevel: PermissionLevel;
  hideVotes: boolean;
  voting: GroupPermission;
  comments: GroupPermission;
  invitations: GroupPermission;
  selfJoin: boolean;
  cardCovers: boolean;
  isTemplate: boolean;
  cardAging: CardAging;
  calendarFeedEnabled: boolean;
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

/**
 * The data corresponding to a board. The fields that are present in the record
 * are contingent on the `fields`/`boardFields` param passed to the method
 * used to retrieve the board data.
 * @typedef {Object} BoardRecord
 * @property id The ID of the board.
 * @property name The name of the board.
 * @property desc The description of the board.
 * @property descData If the description includes custom emoji, this will contain
 *                    the data necessary to display them.
 * @property closed Boolean whether the board has been closed or not.
 * @property idOrganization MongoID of the organization to which the board belongs.
 * @property idEnterprise ID of the associated enterprise.
 * @property pinned Boolean whether the board has been pinned or not.
 * @property url Persistent URL for the board.
 * @property shortUrl URL for the board using only its shortMongoID.
 * @property prefs Short for "preferences", these are the settings for the board.
 * @property labelNames Object containing color keys and the label names given for one
 *                      label of each color on the board.
 * @property starred Whether the board has been starred by the current request's user.
 * @property memberships Array of objects that represent the relationship of users
 *                       to this board as memberships.
 * @property enterpriseOwned Whether the board is owned by an Enterprise or not.
 * @property [shortLink] Short link for the board.
 * @property [subscribed] Indicates if you are subscribed to the board.
 * @property [powerUps] Array of power ups associated with the board.
 * @property [dateLastActivity] The last date any activity took place on the board.
 * @property [dateLastView] The date the board was last viewed.
 * @property [idTags] Comma-separated list of tag IDs.
 * @property [datePluginDisable] Date a plugin was disabled.
 * @property [ixUpdate] Update index (no clue what this is)?
 * @property [templateGallery] Template gallery for the board.
 * @property [limits] Limit data associated with the board.
 * @property [creationMethod] Creation method for the board.
 */
export interface BoardRecord {
  id: string;
  name: string;
  desc: string;
  descData: unknown | null;
  closed: boolean;
  idOrganization: string | null;
  idEnterprise: string | null;
  pinned: boolean;
  url: string;
  shortUrl: string;
  prefs: BoardPrefsRecord;
  labelNames: Record<ColorName, string>;
  starred: boolean;
  memberships: Membership[];
  enterpriseOwned: boolean;
  shortLink?: string;
  subscribed?: boolean;
  powerUps?: PowerUp[];
  dateLastActivity?: string;
  dateLastView?: string;
  idTags?: string;
  datePluginDisable?: string | null;
  ixUpdate?: string;
  templateGallery?: string | null;
  limits?: Limits;
  creationMethod?: string | null;
}

export interface BoardPluginRecord {
  id: string;
  idBoard: string;
  idPlugin: string;
}

export type BoardField = ValidResourceFields<BoardRecord>;

/**
 * Boards are fundamental to Trello. A board may belong to 0 or 1 teams and can
 * have 0 or more lists.
 * @see https://developers.trello.com/reference#boards-2
 * @class
 */
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

  public getBoards(params?: {
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
  }): TypedFetch<BoardRecord[]> {
    return this.apiGet("/", params);
  }

  public getNestedBoards<TPayload extends object>(params?: {
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
  }): TypedFetch<TPayload & { boards: BoardRecord[] }> {
    return this.apiGetNested(params);
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
    idOrganization?: string;
    idBoardSource?: string;
    keepFromSource?: AllOfOrListOf<KeepFromSourceField>;
    powerUps?: AllOfOrListOf<PowerUp>;
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
    return this.apiPost("/idTags", { value });
  }

  public generateCalendarKey(): TypedFetch<unknown> {
    return this.apiPost("/calendarKey/generate");
  }

  public generateEmailKey(): TypedFetch<unknown> {
    return this.apiPost("/emailKey/generate");
  }

  public markAsViewed(): TypedFetch<unknown> {
    return this.apiPost("/markAsViewed");
  }

  public updateBoard(params: {
    name?: string;
    desc?: string;
    closed?: boolean;
    subscribed?: boolean;
    idOrganization?: string;
    prefs?: {
      permissionLevel?: BoardPermissionLevel;
      selfJoin?: boolean;
      cardCovers?: boolean;
      hideVotes?: boolean;
      invitations?: Invitation;
      voting?: GroupPermission;
      comments?: GroupPermission;
      background?: string;
      cardAging?: CardAging;
      calendarFeedEnabled?: boolean;
    };
    labelNames?: {
      green?: string;
      yellow?: string;
      orange?: string;
      red?: string;
      purple?: string;
      blue?: string;
    };
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
    labelColor: ColorName,
    labelName: string,
  ): TypedFetch<unknown> {
    return this.apiPut(`/labelNames/${labelColor}`, { value: labelName });
  }

  public updateName(value: string): TypedFetch<unknown> {
    return this.apiPut("/name", { value });
  }

  public updateSubscribed(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/subscribed", { value });
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

  public deleteBoard(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }

  public disableBoardPlugin(idPlugin: string): TypedFetch<unknown> {
    return this.apiDelete(`/boardPlugins/${idPlugin}`);
  }

  public deletePowerUp(powerUp: PowerUp): TypedFetch<unknown> {
    return this.apiDelete(`/powerUps/${powerUp}`);
  }

  public actions(idAction: string = ""): Action<BoardActionType> {
    return new Action<BoardActionType>(
      this.config,
      this.pathElements,
      "actions",
      {
        identifier: idAction,
        isReturnUrl: this.isReturnUrl,
      },
    );
  }

  public boardStars(idBoardStar: string = ""): BoardStar {
    return new BoardStar(this.config, this.pathElements, "boardStars", {
      identifier: idBoardStar,
      isReturnUrl: this.isReturnUrl,
    });
  }

  public cards(idCard: string = ""): Card {
    return new Card(this.config, this.pathElements, "cards", {
      identifier: idCard,
      isReturnUrl: this.isReturnUrl,
    });
  }

  public checklists(idChecklist: string = ""): Checklist {
    return new Checklist(this.config, this.pathElements, "checklists", {
      identifier: idChecklist,
      isReturnUrl: this.isReturnUrl,
    });
  }

  public customFields(idCustomField: string = ""): CustomField {
    return new CustomField(this.config, this.pathElements, "customFields", {
      identifier: idCustomField,
      isReturnUrl: this.isReturnUrl,
    });
  }

  public labels(idLabel: string = ""): Label {
    return new Label(this.config, this.pathElements, "labels", {
      identifier: idLabel,
      isReturnUrl: this.isReturnUrl,
    });
  }

  public lists(idList: string = ""): List {
    return new List(this.config, this.pathElements, "lists", {
      identifier: idList,
      isReturnUrl: this.isReturnUrl,
    });
  }

  public members(idMember: string = ""): Member {
    return new Member(this.config, this.pathElements, "members", {
      identifier: idMember,
      isReturnUrl: this.isReturnUrl,
    });
  }

  public membersInvited(): Member {
    return new Member(this.config, this.pathElements, "membersInvited", {
      isReturnUrl: this.isReturnUrl,
    });
  }

  public memberships(idMembership: string = ""): Membership {
    return new Membership(this.config, this.pathElements, "memberships", {
      identifier: idMembership,
      isReturnUrl: this.isReturnUrl,
    });
  }

  public myPrefs(): BoardMyPrefs {
    return new BoardMyPrefs(this.config, this.pathElements, "myPrefs", {
      isReturnUrl: this.isReturnUrl,
    });
  }

  public organization(): Organization {
    return new Organization(this.config, this.pathElements, "organization", {
      isReturnUrl: this.isReturnUrl,
    });
  }

  public plugins(): Plugin {
    return new Plugin(this.config, this.pathElements, "plugins", {
      isReturnUrl: this.isReturnUrl,
    });
  }
}
