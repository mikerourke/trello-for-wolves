export interface TrelloConfig {
  key: string;
  token: string;
  backoffTime?: number;
  maxRetryAttempts?: number;
}

export type AllOrNone = "all" | "none";

export type AnyParams = Record<string, unknown>;

export type FieldOrListOf<T> = T | T[];

export type AllOrFieldOrListOf<T> = FieldOrListOf<T> | "all";

export type DateValue = Date | string | null;

export type FilterDate = DateValue | "lastView";

export type Format = "count" | "list" | "minimal";

export type ColorName =
  | "blue"
  | "green"
  | "orange"
  | "purple"
  | "red"
  | "yellow"
  // These colors are also available, they're just not documented:
  | "sky"
  | "lime"
  | "pink"
  | "black";

export type KeepFromSourceField =
  | "attachments"
  | "checklists"
  | "comments"
  | "due"
  | "labels"
  | "members"
  | "none"
  | "stickers";

export type PermissionLevel = "private" | "public";

export type Position = "bottom" | "top";

export type PositionOrFloat = Position | number;

export interface TypedResponse<TPayload = unknown> extends Response {
  json<TResult = TPayload>(): Promise<TResult>;
}

export type TypedFetch<T> = Promise<TypedResponse<T>>;

export interface ValueResponse<T> {
  _value: T;
}

export type FileUpload = Blob | File | FormData;

export interface LimitRecord {
  status: string;
  disableAt: number;
  warnAt: number;
}

export interface Limits {
  attachments?: {
    perBoard?: LimitRecord;
    perCard?: LimitRecord;
  };
  boards?: {
    totalMembersPerBoard?: LimitRecord;
    totalPerMember?: LimitRecord;
  };
  cards?: {
    openPerBoard?: LimitRecord;
    openPerList?: LimitRecord;
    totalPerBoard?: LimitRecord;
    totalPerLimit?: LimitRecord;
  };
  checklists?: {
    perBoard?: LimitRecord;
    perCard?: LimitRecord;
  };
  checkItems?: {
    perChecklist?: LimitRecord;
  };
  customFields?: {
    perBoard?: LimitRecord;
  };
  customFieldOptions?: {
    perField?: LimitRecord;
  };
  labels?: {
    perBoard?: LimitRecord;
  };
  lists?: {
    openPerBoard?: LimitRecord;
    totalPerBoard?: LimitRecord;
  };
  orgs?: {
    totalPerMember?: LimitRecord;
    totalMembersPerOrg?: LimitRecord;
    freeBoardsPerOrg?: LimitRecord;
  };
  stickers?: {
    perCard?: LimitRecord;
  };
  reactions?: {
    perAction?: LimitRecord;
    uniquePerAction?: LimitRecord;
  };
}

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
  limits?: Limits;
  creationMethod?: string | null;
  member?: MemberRecord;
  memberCreator?: MemberRecord;
  reactions?: ReactionRecord[];
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

export type AttachmentFilter = boolean | "cover";

/**
 * @typedef {Object} AttachmentPreviewRecord
 * @property bytes Size of the preview in bytes.
 * @property url URL path to the image preview.
 * @property height Height of the preview (in pixels).
 * @property width Width of the preview (in pixels).
 * @property scaled Whether or not the preview is scaled.
 * @property _id ID of the attachment preview (automatically assigned).
 */
export interface AttachmentPreviewRecord {
  bytes: number;
  url: string;
  height: number;
  width: number;
  scaled: boolean;
  _id: string;
}

/**
 * The data corresponding to an attachment on a board. The fields that are
 * present in the record are contingent on the `fields` param passed to
 * the method used to retrieve the attachment data.
 * @typedef {Object} AttachmentRecord
 * @property id The ID of the attachment.
 * @property bytes The size of the attachment in bytes.
 * @property date The date the attachment was added.
 * @property edgeColor For image attachments, the extracted edge color.
 * @property idMember The ID of the member who attached the attachment.
 * @property isUpload Whether the attachment was uploaded.
 * @property mimeType The mimeType for the attachment. Default is null. MIME types are only stored/returned
 *                    if it is sent when initially creating the attachment. The Trello web client does not
 *                    set the mimeType when uploading attachments.
 * @property name The name of the attachment.
 * @property pos The position of the attachment in the attachments list.
 * @property previews If the image is an uploaded image, Trello will generate some various sized previews.
 * @property url The URL to the attachment.
 * @property [limits] Limits associated with the attachment.
 * @property [creationMethod] Creation method for the attachment.
 */
export interface AttachmentRecord {
  id: string;
  bytes: number;
  date: string;
  edgeColor: string;
  idMember: string;
  isUpload: boolean;
  mimeType: string;
  name: string;
  pos: number;
  previews: AttachmentPreviewRecord[];
  url: string;
  limits?: Limits;
  creationMethod?: string | null;
}

export type AttachmentField =
  | "id"
  | "bytes"
  | "date"
  | "edgeColor"
  | "idMember"
  | "isUpload"
  | "mimeType"
  | "name"
  | "pos"
  | "previews"
  | "url";

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
  | "all"
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
  actions?: ActionRecord[];
  boardStars?: (Omit<BoardStarRecord, "id"> & { _id: string })[];
  cards?: CardRecord[];
  checklists?: ChecklistRecord[];
  customFields?: CustomFieldRecord[];
  labels?: LabelRecord[];
  lists?: ListRecord[];
  members?: MemberRecord[];
  membersInvited?: MemberRecord[];
  memberships?: MembershipRecord[];
  notifications?: MemberRecord[];
  organization?: OrganizationRecord;
}

export interface BoardPluginRecord {
  id: string;
  idBoard: string;
  idPlugin: string;
}

export type BoardField =
  | "id"
  | "name"
  | "desc"
  | "descData"
  | "closed"
  | "idOrganization"
  | "pinned"
  | "url"
  | "shortUrl"
  | "prefs"
  | "labelNames"
  | "starred"
  | "limits"
  | "memberships"
  | "enterpriseOwned";

export type BoardBackgroundBrightness = "dark" | "light" | "unknown";

export type BoardBackgroundType = "custom" | "default" | "premium";

export type BoardBackgroundFilter = BoardBackgroundType | "all" | "none";

/**
 * The data corresponding to a board background. The fields that are present in
 * the record are contingent on the `fields` param passed to the method used to
 * retrieve the board background data.
 * @typedef {Object} BoardBackgroundRecord
 * @property id The ID of the board background.
 * @property brightness The brightness value for the text/other elements.
 * @property color Color of the board background.
 * @property tile Whether the background should be tiled.
 * @property type Type of board background.
 */
export interface BoardBackgroundRecord {
  id: string;
  brightness: BoardBackgroundBrightness;
  color: ColorName;
  tile: boolean;
  type: BoardBackgroundType;
}

export interface BoardBackgroundImageScaledRecord {
  id: string;
  _id: string;
  scaled: boolean;
  url: string;
  bytes: number;
  height: number;
  width: number;
}

export interface BoardBackgroundImageRecord
  extends Omit<BoardBackgroundRecord, "color"> {
  bottomColor: string | null;
  topColor: string | null;
  fullSizeUrl: string;
  scaled: BoardBackgroundImageScaledRecord[];
}

export type CustomBoardBackgroundRecord = BoardBackgroundImageRecord;

export type AnyBoardBackgroundRecord =
  | BoardBackgroundRecord
  | CustomBoardBackgroundRecord;

export type BoardBackgroundField =
  | "brightness"
  | "fullSizeUrl"
  | "scaled"
  | "tile";

export type EmailPosition = "bottom" | "top";

export interface BoardMyPrefsRecord {
  emailPosition: EmailPosition;
  idEmailList: string;
  showListGuide: boolean;
  showSidebar: boolean;
  showSidebarActivity: boolean;
  showSidebarBoardActions: boolean;
  showSidebarMembers: boolean;
}

export type BoardStarsFilter = "mine" | "none";

export interface BoardStarRecord {
  id: string;
  idBoard: string;
  pos: number;
}

export type CardAging = "pirate" | "regular";

export type CardFilter = "all" | "closed" | "none" | "open" | "visible";

export type CardActionType =
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

export interface CardBadgeRecord {
  attachments: number;
  checkItems: number;
  checkItemsChecked: number;
  comments: number;
  description: boolean;
  due: string | null;
  dueComplete: boolean;
  fogbugz: string;
  subscribed: boolean;
  viewingMemberVoted: boolean;
  votes: number;
}

/**
 * @typedef {Object} CardCoordinatesRecord
 * @property latitude Latitude of the coordinate.
 * @property longitude Longitude of the coordinate.
 */
export interface CardCoordinatesRecord {
  latitude: number;
  longitude: number;
}

/**
 * The data associated with the card's location fields. These fields are only
 * available if the Map Power-Up is enabled.
 * @typedef {Object} CardMapPowerUpRecord
 * @property address Address of card location.
 * @property locationName Name of card location.
 * @property coordinates Either a comma-separated string in the format latitude,longitude or an object
 *                       containing keys for latitude and longitude whose values are numbers between -180 and 180.
 *                       See the {@link CardCoordinatesRecord} type.
 */
export interface CardMapPowerUpRecord {
  address: string;
  locationName: string;
  coordinates: CardCoordinatesRecord | string;
}

/**
 * The data corresponding to a card. The fields that are present in the
 * record are contingent on the `fields`/`cardFields` param passed to the method
 * used to retrieve the card data. It includes fields from the
 * {@link CardMapPowerUpRecord}.
 * @typedef {Object} CardRecord
 * @property id The ID of the card.
 * @property badges Pieces of information about the card that are displayed on the front of the card.
 * @property checkItemStates States of the check items.
 * @property closed Whether the card is closed (archived). Note: Archived lists and boards do not cascade
 *                  archives to cards. A card can have closed: false but be on an archived board.
 * @property dateLastActivity The datetime of the last activity on the card. Note: There are activities
 *                            that update dateLastActivity that do not create a corresponding action. For instance,
 *                            updating the name field of a checklist item on a card does not create an action but
 *                            does update the card and board's dateLastActivity value.
 * @property desc The description for the card. Up to 16384 chars.
 * @property descData If the description has custom emoji, this field will provide the data necessary to
 *                    display them.
 * @property due The due date on the card, if one exists.
 * @property dueComplete Whether the due date has been marked complete.
 * @property idAttachmentCover The id of the attachment selected as the cover image, if one exists.
 * @property idBoard The ID of the board the card is on.
 * @property idChecklists An array of checklist IDs that are on this card.
 * @property idLabels An array of label IDs that are on this card.
 * @property idList The ID of the list the card is in.
 * @property idMembers An array of member IDs that are on this card.
 * @property idMembersVoted An array of member IDs who have voted on this card.
 * @property idShort Numeric ID for the card on this board. Only unique to the board,
 *                   and subject to change as the card moves.
 * @property labels Array of label objects on this card.
 * @property manualCoverAttachment Whether the card cover image was selected automatically
 *                                 by Trello, or manually by the user.
 * @property name Name of the card.
 * @property pos Position of the card in the list.
 * @property shortLink The 8 character shortened ID for the card.
 * @property shortUrl URL to the card without the name slug.
 * @property subscribed Whether this member is subscribed to the card.
 * @property url Full URL to the card, with the name slug.
 * @property [limits] Limit data associated with the card.
 * @property [creationMethod] Creation method for the card.
 */
export interface CardRecord extends CardMapPowerUpRecord {
  id: string;
  badges: CardBadgeRecord;
  checkItemStates: string[];
  closed: boolean;
  dateLastActivity: string;
  desc: string;
  descData: string;
  due: string | null;
  dueComplete: boolean;
  idAttachmentCover: string;
  idBoard: string;
  idChecklists: string[];
  idLabels: string[];
  idList: string;
  idMembers: string[];
  idMembersVoted: string[];
  idShort: number;
  labels: LabelRecord[];
  manualCoverAttachment: boolean;
  name: string;
  pos: number;
  shortLink: string;
  shortUrl: string;
  subscribed: boolean;
  url: string;
  limits?: Limits;
  creationMethod?: string | null;
  actions?: ActionRecord[];
  attachments?: AttachmentRecord[];
  board?: BoardRecord;
  checklists?: ChecklistRecord[];
  customFieldItems?: CustomFieldOptionRecord[];
  list?: ListRecord[];
  members?: MemberRecord[];
  membersVoted?: MemberRecord[];
  stickers?: StickerRecord[];
}

export type CardField =
  | "id"
  | "checkItemStates"
  | "closed"
  | "dateLastActivity"
  | "desc"
  | "descData"
  | "due"
  | "dueComplete"
  | "idAttachmentCover"
  | "idBoard"
  | "idChecklists"
  | "idLabels"
  | "idList"
  | "idMembers"
  | "idMembersVoted"
  | "idShort"
  | "labels"
  | "manualCoverAttachment"
  | "name"
  | "pos"
  | "shortLink"
  | "shortUrl"
  | "subscribed"
  | "url"
  | "address"
  | "locationName"
  | "coordinates";

export type CheckItemState = "complete" | "incomplete";

export type CheckItemStateField = "idCheckItem" | "state";

/**
 * The data corresponding to a check item. The fields that are present in the
 * record are contingent on the `fields` param passed to the method used to
 * retrieve the check item data.
 * @typedef {Object} CheckItemRecord
 * @property id The ID of the check item.
 * @property idChecklist The ID of the parent checklist.
 * @property name The name of the check item.
 * @property nameData Additional data associated with the check item.
 * @property pos Position of the check item in the checklist.
 * @property state Current state of the check item.
 * @property due Date the check item is due.
 * @property type Type of the check item (this is usually null).
 * @property [creationMethod] Creation method for the check item.
 */
export type CheckItemRecord = {
  id: string;
  idChecklist: string;
  name: string;
  nameData: string | null;
  pos: number;
  state: CheckItemState;
  due: string | null;
  type: string | null;
  creationMethod?: string | null;
};

export type CheckItemField = "name" | "nameData" | "pos" | "state" | "type";

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
  actions?: ActionRecord[];
  board?: BoardRecord;
  cards?: CardRecord[];
}

export type ChecklistField = "id" | "idBoard" | "idCard" | "name" | "pos";

export interface CommentRecord {
  id: string;
  idMemberCreator: string;
  data: {
    text: string;
    textData?: {
      emoji?: Record<string, string>;
    };
  };
  card: EntityRecord;
  board: EntityRecord;
  list: EntityRecord;
  type: string;
  date: string | null;
  memberCreator?: MemberRecord;
  limits?: Limits;
}

export interface CustomEmojiRecord {
  id: string;
  name: string;
  url: string;
}

export type CustomEmojiField = keyof CustomEmojiRecord;

export type CustomFieldType = "number" | "date" | "text" | "checkbox" | "list";

export type CustomFieldOptionValueRecord =
  | { text: string }
  | { number: number }
  | { date: Date | string }
  | { checked: boolean };

export interface CustomFieldOptionRecord {
  color: ColorName | string;
  pos: PositionOrFloat;
  value: CustomFieldOptionValueRecord;
}

/**
 * The data corresponding to a custom field.
 * @typedef {Object} CustomFieldRecord
 * @property id The ID of the Custom Field definition.
 * @property idModel The ID of the model that the Custom Field is defined on. This
 *                   should always be an ID of a board.
 * @property modelType The type of model that the Custom Field is being defined for.
 *                     This should always be "board".
 * @property fieldGroup A hash created from the fields of a Custom Field used to manage
 *                      Custom Fields and values between boards. For more on its use,
 *                      check out the Grouping Custom Fields Across Boards section of
 *                      the Custom Fields guide.
 *                      @see https://developers.trello.com/v1.0/docs/getting-started-custom-fields#section-grouping-custom-fields-across-boards
 * @property name The name of the Custom Field. This is displayed to the user in the Trello clients.
 * @property pos The position of the Custom Field. This will be used to determine the
 *               order that Custom Fields should be listed when being shown to the user.
 * @property type Determines the type of values that can be used when setting values for
 *                Custom Fields on cards.
 * @property options An array of objects used for Custom Fields of the list type. The
 *                   objects contain data about the options available for the dropdown.
 * @property display An object that contains this custom fields display properties.
 */
export interface CustomFieldRecord {
  id: string;
  idModel: string;
  modelType: string;
  fieldGroup: string;
  name: string;
  pos: PositionOrFloat;
  type: CustomFieldType;
  options?: CustomFieldOptionRecord[];
  display: {
    cardFront: boolean;
  };
  actions?: ActionRecord[];
}

export type SortOrder = "asc" | "ascending" | "desc" | "descending" | "id";

export type EnterpriseUserType =
  | "all"
  | "member"
  | "collaborator"
  | "saml"
  | "none";

export type EnterpriseMemberFilter =
  | "member"
  | "collaborator"
  | "saml"
  | "none"
  | "member-unconfirmed"
  | "collaborator-unconfirmed"
  | "all";

export interface EnterprisePrefsRecord {
  ssoOnly: boolean;
  signup: {
    message: string;
    confirmation: string;
    banner: string;
    bannerHtml: string;
    confirmationHtml: string;
    messageHtml: string;
  };
  mandatoryTransferDate: string | null;
  maxMembers: number | null;
}

/**
 The data corresponding to an enterprise. The fields that are present in the
 * record are contingent on the `fields` param passed to the method used to
 * retrieve the enterprise data.
 * @typedef {Object} EnterpriseRecord
 * @property id The ID of the enterprise.
 * @property name Short-form name of the enterprise.
 * @property displayName Long-form name of the enterprise used when displaying
 *                       the full name of the enterprise.
 * @property prefs JSON Object containing information about the preferences set
 *                 within the enterprise.
 * @property ssoActivationFailed Determines whether SSO successfully activated.
 * @property idAdmins Array of Member IDs that are admins of the enterprise.
 * @property idMembers Array of Member IDs that belong to the enterprise.
 * @property idOrganizations Array of Organization IDs that belong to the enterprise.
 * @property products Array of products that the enterprise has enabled.
 * @property userTypes Object containing keys for every member type and values
 *                     representing the count of each type of member.
 * @property [ssoDateDelayed] I don't know what this value is and I can't check because
 *                            I'm not part of an enterprise.
 */
export interface EnterpriseRecord {
  id: string;
  name: string;
  displayName: string;
  prefs: EnterprisePrefsRecord;
  ssoActivationFailed: boolean;
  idAdmins: string[];
  idMembers: string[];
  idOrganizations: string[];
  products: number[];
  userTypes: Record<EnterpriseUserType, number>;
  ssoDateDelayed?: unknown;
  members?: MemberRecord[];
  organizations?: OrganizationRecord[];
}

export type EnterpriseField =
  | "id"
  | "name"
  | "displayName"
  | "prefs"
  | "ssoActivationFailed"
  | "idAdmins"
  | "idMembers"
  | "idOrganizations"
  | "products"
  | "userTypes";

export type GetEnterprisesField =
  | "name"
  | "displayName"
  | "prefs"
  | "ssoActivationFailed"
  | "ssoDateDelayed"
  | "idAdmins";

/**
 * @typedef {Object} LabelRecord
 * @property id The ID of the label.
 * @property idBoard The ID of the board the label is on.
 * @property name The optional name of the label (0 - 16384 chars).
 * @property color The color of the label (null means no color, and the label will
 *                 not show on the front of cards).
 * @property [limits] Limit data associated with the label.
 * @property [creationMethod] Creation method for the label.
 */
export interface LabelRecord {
  id: string;
  idBoard: string;
  name: string;
  color: ColorName | null;
  limits?: Limits;
  creationMethod?: string | null;
  actions?: ActionRecord[];
}

export type LabelField = "id" | "idBoard" | "name" | "color";

export type ListFilter = "all" | "closed" | "none" | "open";

/**
 * @typedef {Object} ListRecord
 * @property id The ID of the list.
 * @property name The name of the list.
 * @property closed Whether the list is closed (archived).
 * @property idBoard The ID of the board the list is on.
 * @property pos The position of the list on the board.
 * @property subscribed Whether the member is subscribed to this list.
 * @property softLimit A soft limit for number of open cards in the list used by the
 *                     List Limits Power-Up.
 * @property [limits] Limit data associated with the list.
 * @property [creationMethod] Creation method for the list.
 */
export interface ListRecord {
  id: string;
  name: string;
  closed: boolean;
  idBoard: string;
  pos: number;
  subscribed: boolean;
  softLimit: number | null;
  limits?: LimitRecord;
  creationMethod?: string | null;
  actions?: ActionRecord[];
  board?: BoardRecord;
  cards?: CardRecord[];
}

export type ListField =
  | "id"
  | "name"
  | "closed"
  | "idBoard"
  | "pos"
  | "float"
  | "subscribed"
  | "softLimit";

export type AvatarSourceField = "gravatar" | "none" | "upload";

export type MemberType = "admin" | "normal";

export type MemberLoginType = "password" | "saml" | "google" | "android";

export type MemberFilter = "admins" | "all" | "none" | "normal" | "owners";

export enum MemberProduct {
  BusinessClass = 10,
  GoldMonthly = 37,
  GoldAnnual = 38,
}

export interface MemberPrefsRecord {
  sendSummaries: boolean;
  minutesBetweenSummaries: number;
  minutesBeforeDeadlineToNotify: number;
  colorBlind: boolean;
  locale: string;
  timezoneInfo: {
    timezoneNext: string;
    dateNext: string;
    offsetNext: number;
    timezoneCurrent: string;
    offsetCurrent: number;
  };
  twoFactor: {
    enabled: boolean;
    needsNewBackups: false;
  };
  privacy: {
    fullName: string;
    avatar: string;
  };
}

export interface MessageDismissedRecord {
  _id: string;
  name: string;
  count: number;
  lastDismissed: string;
}

/**
 * The data corresponding to a member. The fields that are present in the
 * record are contingent on the `fields`/`memberFields` param passed to
 * the method used to retrieve the member data. This contains the most
 * comprehensive data.
 * @typedef {Object} MemberRecord
 * @property id The ID of the member.
 * @property avatarHash Member profile image.
 * @property avatarUrl The URL of the current avatar being used, regardless of
 *                     whether it is a gravatar or uploaded avatar.
 * @property initials The member's initials, used for display when there isn't an avatar set.
 * @property fullName The full display name for the member.
 * @property username The username for the member. What is shown in @mentions for example.
 * @property confirmed Whether the member has confirmed their email address after signing up.
 * @property memberType Type of member ("ghost" has been invited to join but has not
 *                      created a Trello account.
 * @property bio Optional bio for the member.
 * @property bioData If the bio includes custom emoji, this object will contain the
 *                   information necessary to display them.
 * @property idPremOrgsAdmin An array of organization IDs this member is an admin of.
 * @property products Array of numbers that represent premium features.
 *                    10: member has Trello Gold as a result of being in a Business Class team.
 *                    37: member has monthly Trello Gold.
 *                    38: member has annual Trello Gold.
 * @property status Status of the member.
 * @property url The URL to the member's profile page.
 * @property idEnterprisesDeactivated
 * @property avatarSource The source of the user's avatar - either via "upload" or "gravatar".
 * @property email The primary email address for the member. You can only read your own.
 * @property gravatarHash Same as avatarHash.
 * @property idBoards An array of board IDs this member is on.
 * @property idBoardsPinned An array of pinned board IDs.
 * @property idOrganizations An array of organization IDs this member is in.
 * @property idEnterprisesAdmin An array of enterprise IDs this member is an admin of.
 * @property loginTypes The types of logins a user can use.
 * @property oneTimeMessagesDismissed Array of message IDs that were dismissed.
 * @property prefs Preferences associated with the member.
 * @property premiumFeatures Array of premium feature details.
 * @property trophies Array of trophies.
 * @property uploadedAvatarHash Same as avatar hash.
 * @property uploadedAvatarUrl The URL of the uploaded avatar if one has been uploaded.
 */
export interface MemberRecord {
  id: string;
  avatarHash: string | null;
  avatarUrl: string;
  initials: string;
  fullName: string;
  username: string;
  confirmed: boolean;
  memberType: "normal" | "ghost";
  bio: string;
  bioData: { emoji: unknown } | null;
  idPremOrgsAdmin?: string[];
  products?: number[] | MemberProduct[];
  status?: string;
  url?: string;
  idEnterprisesDeactivated?: string[];
  activityBlocked?: boolean;
  nonPublic?: unknown;
  nonPublicAvailable?: boolean;
  aaEmail?: string | null;
  aaEnrolledDate?: string | null;
  aaId?: string | null;
  idMemberReferrer?: string | null;
  isAaMastered?: boolean;
  ixUpdate?: string;
  limits?: Limits;
  messagesDismissed?: MessageDismissedRecord[];
  marketingOptIn?: { optedIn: boolean; date: string };
  idEnterprise?: string | null;
  avatarSource: Omit<AvatarSourceField, "none"> | null;
  email: string | null;
  gravatarHash: string | null;
  idBoards: string[];
  idBoardsPinned: string[];
  idOrganizations: string[];
  idEnterprisesAdmin: string[];
  loginTypes: MemberLoginType[];
  oneTimeMessagesDismissed: string[];
  prefs: MemberPrefsRecord;
  premiumFeatures: unknown[];
  trophies: unknown[];
  uploadedAvatarHash: unknown | null;
  uploadedAvatarUrl: string;
  actions?: ActionRecord[];
  boardBackgrounds?: BoardBackgroundRecord[];
  boards?: BoardRecord[];
  boardsInvited?: BoardRecord[];
  boardStars?: BoardStarRecord[];
  cards?: CardRecord[];
  customBoardBackgrounds?: CustomBoardBackgroundRecord[];
  customEmoji?: CustomEmojiRecord[];
  customStickers?: CustomStickerRecord[];
  enterprises?: EnterpriseRecord[];
  notifications?: NotificationRecord[];
  organizations?: OrganizationRecord[];
  organizationsInvited?: OrganizationRecord[];
  savedSearches?: SavedSearchRecord[];
  tokens?: TokenRecord[];
}

export type MemberField =
  | "id"
  | "avatarHash"
  | "avatarUrl"
  | "avatarSource"
  | "bio"
  | "bioData"
  | "confirmed"
  | "email"
  | "fullName"
  | "gravatarHash"
  | "idBoards"
  | "idBoardsPinned"
  | "idOrganizations"
  | "idEnterprisesAdmin"
  | "idPremOrgsAdmin"
  | "initials"
  | "loginTypes"
  | "memberType"
  | "oneTimeMessagesDismissed"
  | "prefs"
  | "premiumFeatures"
  | "products"
  | "status"
  | "trophies"
  | "uploadedAvatarHash"
  | "uploadedAvatarUrl"
  | "url"
  | "username";

export type MembershipFilter =
  | "active"
  | "admin"
  | "all"
  | "deactivated"
  | "me"
  | "none"
  | "normal";

export interface MembershipRecord {
  id: string;
  idMember: string;
  memberType: string;
  unconfirmed: boolean;
  deactivated: boolean;
  orgMemberType?: string;
  actions?: ActionRecord[];
  member?: MemberRecord;
}

export type ReadFilter = "all" | "read" | "unread";

export type NotificationType =
  | "addAdminToBoard"
  | "addAdminToOrganization"
  | "addedAttachmentToCard"
  | "addedMemberToCard"
  | "addedToBoard"
  | "addedToCard"
  | "addedToOrganization"
  | "cardDueSoon"
  | "changeCard"
  | "closeBoard"
  | "commentCard"
  | "createdCard"
  | "declinedInvitationToBoard"
  | "declinedInvitationToOrganization"
  | "invitedToBoard"
  | "invitedToOrganization"
  | "makeAdminOfBoard"
  | "makeAdminOfOrganization"
  | "memberJoinedTrello"
  | "mentionedOnCard"
  | "removedFromBoard"
  | "removedFromCard"
  | "removedFromOrganization"
  | "removedMemberFromCard"
  | "unconfirmedInvitedToBoard"
  | "unconfirmedInvitedToOrganization"
  | "updateCheckItemStateOnCard";

/**
 * The data corresponding to a notification. The fields that are present in the
 * record are contingent on the `fields`/`notificationFields` param passed to
 * the method used to retrieve the notification data.
 * @typedef {Object} NotificationRecord
 * @property id The ID of the notification.
 * @property data Relevant data regarding the notification.
 * @property date The datetime the notification was triggered.
 * @property idMemberCreator The ID of the member who triggered the notification.
 * @property type The type of the notification.
 * @property unread Whether the notification hasn't been read yet.
 * @property [memberCreator] Member creator data associated with the notification.
 * @property [dateRead] Date the notification was read.
 * @property [idAction] Action ID associated with the notification.
 * @property [reactions] Reactions data associated with the notification.
 */
export interface NotificationRecord {
  id: string;
  data: unknown;
  date: string;
  idMemberCreator: string;
  type: NotificationType;
  unread: boolean;
  dateRead?: string;
  idAction?: string | null;
  board?: BoardRecord;
  card?: CardRecord;
  member?: MemberRecord;
  memberCreator?: MemberRecord;
  organization?: OrganizationRecord;
  reactions?: ReactionRecord[];
}

export type NotificationField =
  | "id"
  | "data"
  | "date"
  | "idMemberCreator"
  | "type"
  | "unread";

export type OrganizationFilter = "all" | "members" | "none" | "public";

export type BoardVisibilityFilter = "admin" | "none" | "org";

export type BoardVisibilityRestrictionLevel = "org" | "private" | "public";

export interface OrganizationPrefsRecord {
  associatedDomain: string;
  boardVisibilityRestrict: {
    orgRestriction: BoardVisibilityFilter;
    privateRestriction: BoardVisibilityFilter;
    publicRestriction: BoardVisibilityFilter;
  };
  externalMembersDisabled: boolean;
  googleAppsVersion: number;
  orgInviteRestrict: string;
  permissionLevel: PermissionLevel;
}

/**
 * The data corresponding to an Organization. The fields that are present in the
 * record are contingent on the `fields`/`organizationFields` param passed to
 * the method used to retrieve the Organization data.
 * @typedef {Object} OrganizationRecord
 * @property id The ID of the organization.
 * @property billableMemberCount
 * @property desc The description for the team
 * @property descData If there are custom emoji in the desc this will contain
 *                    information about them.
 * @property displayName The name for the team. For example: Trello Inc.
 * @property idBoards An array of board IDs that are in the team.
 * @property invitations Array of invitations.
 * @property invited Indicates if invited.
 * @property logoHash Hash string for the organization logo.
 * @property memberships Array of memberships associated with the organization.
 * @property name The programmatic name for the team. For example: `trelloinc`.
 * @property powerUps Array of power ups associated with the organization.
 * @property prefs The preferences (settings) for the team.
 * @property premiumFeatures Array of premium features associated with the organization.
 * @property products Array of products associated with the organization.
 * @property url The URL to the team page on Trello.
 * @property website Website for the organization.
 */
export interface OrganizationRecord {
  id: string;
  billableMemberCount: string;
  desc: string;
  descData: object;
  displayName: string;
  idBoards: string[];
  invitations: unknown[];
  invited: string;
  logoHash: string;
  name: string;
  powerUps: number[];
  prefs: OrganizationPrefsRecord;
  premiumFeatures: string[];
  products: number[];
  url: string;
  website: string;
  actions?: ActionRecord[];
  boards?: BoardRecord[];
  members?: MemberRecord[];
  membersInvited?: MemberRecord[];
  memberships?: MembershipRecord[];
}

export type OrganizationField =
  | "id"
  | "billableMemberCount"
  | "desc"
  | "descData"
  | "displayName"
  | "idBoards"
  | "invitations"
  | "logoHash"
  | "memberships"
  | "name"
  | "powerUps"
  | "prefs"
  | "premiumFeatures"
  | "products"
  | "url"
  | "website";

export type PluginFilter = "enabled" | "available";

export type PluginCapability =
  | "attachment-sections"
  | "attachment-thumbnail"
  | "authorization-status"
  | "board-buttons"
  | "card-back-section"
  | "card-badges"
  | "card-buttons"
  | "card-detail-badges"
  | "card-from-url"
  | "format-url"
  | "list-actions"
  | "list-sorters"
  | "on-enable"
  | "on-disable"
  | "remove-data"
  | "show-authorization"
  | "show-settings";

/**
 * Listings are what users see when they view your Power-Up in the Power-Up directory.
 * @property name Display name of the plugin.
 * @property locale Associated locale for the plugin.
 * @property description This will be shown to your user when they view more information
 *                       about your Power-Up in the directory. Your description should include
 *                       what the Power-Up does, links to more information, and images of the
 *                       Power-Up in action.
 * @property overview A short description to intro your Power-Up and its features. This will
 *                    be shown when users search for Power-ups and when we need a short
 *                    one-liner about your Power-Up.
 */
export interface PluginListingRecord {
  name: string;
  locale: string;
  description: string;
  overview: string;
}

export interface PluginComplianceRecord {
  lastPolled: {
    memberPrivacy: string;
  };
  dateUpdatedStoresPersonalData: string;
  storesPersonalData: boolean;
}

/**
 * The plugin object is used to represent Power-Ups in Trello's API.
 * @property id The ID of the plugin.
 * @property capabilities Actions the plugin is allowed to perform.
 * @property iframeConnectorUrl The URL for the iframe connector that will be loaded when the Power-Up is enabled.
 * @property name Display name of the plugin.
 * @property public Indicates if the plugin is publicly available.
 * @property listings
 * @property compliance
 */
export interface PluginRecord {
  id: string;
  capabilities: PluginCapability[];
  iframeConnectorUrl: string;
  name: string;
  public: boolean;
  icon: {
    url: string;
  };
  listings: PluginListingRecord[];
  compliance: PluginComplianceRecord;
}

export interface VendorPluginRecord extends Omit<PluginRecord, "listings"> {
  idOrganizationOwner?: string;
  author?: string;
  categories?: string[];
  privacyUrl?: string;
  moderatedState?: string | null;
  supportEmail?: string;
  url?: string;
  tags?: string[];
  heroImageUrl?: {
    _id: string;
    "@2x": string;
    "12x": string;
  };
  isCompliantWithPrivacyStandards?: string | null;
  usageBrackets?: Record<string, number>;
  claimedDomains?: string[];
  listing?: PluginListingRecord;
}

export interface EmojiSkinVariationRecord {
  unified: string;
  native: string;
  sheetX: number;
  sheetY: number;
}

export interface ReactionEmojiRecord {
  unified: string;
  native: string;
  name: string;
  skinVariation: string;
  shortName: string;
}

export interface EmojiRecord extends ReactionEmojiRecord {
  shortNames: string[];
  text: string | null;
  texts: string[] | null;
  category: string;
  sheetX: number;
  sheetY: number;
  skinVariations: Record<string, EmojiSkinVariationRecord>;
  tts?: string;
  keywords?: string[];
}

export interface ReactionRecord {
  id: string;
  idMember: string;
  idModel: string;
  idEmoji: string;
  member?: MemberRecord;
  emoji?: EmojiRecord;
}

export interface ReactionSummaryRecord {
  count: number;
  id: string;
  firstReacted: string;
  idEmoji: string;
  idModel: string;
  idReaction: string;
  emoji: ReactionEmojiRecord;
}

export interface SavedSearchRecord {
  id: string;
  name: string;
  query: string;
  pos: number;
}

export type ModelType =
  | "actions"
  | "boards"
  | "cards"
  | "members"
  | "organizations";

export type DefaultFreeStickerName =
  | "check"
  | "heart"
  | "warning"
  | "clock"
  | "smile"
  | "laugh"
  | "huh"
  | "frown"
  | "thumbsup"
  | "thumbsdown"
  | "star"
  | "rocketship";

export type DefaultPremiumStickerName =
  | "taco-love"
  | "taco-confused"
  | "taco-cool"
  | "taco-angry"
  | "taco-celebrate"
  | "taco-robot"
  | "taco-alert"
  | "taco-active"
  | "taco-money"
  | "taco-reading"
  | "taco-trophy"
  | "taco-sleeping"
  | "taco-pixel"
  | "taco-proto"
  | "taco-embarrassed"
  | "taco-clean"
  | "pete-happy"
  | "pete-love"
  | "pete-broken"
  | "pete-alert"
  | "pete-talk"
  | "pete-vacation"
  | "pete-confused"
  | "pete-shipped"
  | "pete-busy"
  | "pete-completed"
  | "pete-space"
  | "pete-sketch"
  | "pete-ghost"
  | "pete-award"
  | "pete-music";

/**
 * Trello has a set of built-in stickers that are available to members.
 * @typedef {string} DefaultStickerName
 * @see https://developers.trello.com/reference#stickers
 */
export type DefaultStickerName = DefaultFreeStickerName &
  DefaultPremiumStickerName;

export interface StickerScaledRecord {
  _id: string;
  url: string;
  height: number;
  width: number;
  scaled: boolean;
}

/**
 * The data corresponding to a Sticker associated with a Card.
 * @typedef {Object} StickerRecord
 * @property id The ID of the sticker.
 * @property image The name of the sticker if it is a default sticker or a
 *                 generated id if it is a custom sticker.
 * @property imageScaled An array of scaled versions of the sticker image.
 * @property imageUrl Direct URL to the image.
 * @property left How far to the left of the card the sticker is placed.
 * @property top How far from the top of the card the sticker is placed.
 * @property rotate How much the sticker has been rotated.
 * @property zIndex The ordering for display which tells you which sticker would
 *                  show on top of another.
 */
export interface StickerRecord {
  id: string;
  image: string;
  imageScaled: StickerScaledRecord[];
  imageUrl: string;
  left: number;
  top: number;
  rotate: number;
  zIndex: number;
}

export interface CustomStickerRecord {
  id: string;
  url: string;
  scaled: StickerScaledRecord[];
}

export type StickerField =
  | "id"
  | "image"
  | "imageScaled"
  | "imageUrl"
  | "left"
  | "top"
  | "rotate"
  | "zIndex";

export interface TokenPermissionRecord {
  idModel: string;
  modelType: string;
  read: boolean;
  write: boolean;
}

export interface TokenRecord {
  id: string;
  identifier: string;
  idMember: string;
  dateCreated: string;
  dateExpires: string | null;
  permissions: TokenPermissionRecord[];
}

export interface TokenDeletedRecord extends Omit<TokenRecord, "permissions"> {
  token: string;
  idApplication: string;
  origin: string;
  permissions: TokenPermissionRecord & { _id: string }[];
}

export type TokenField = keyof TokenRecord;

export interface TypeRecord {
  id: string;
  type: string;
}

/**
 * The data corresponding to a webhook.
 * @typedef {Object} WebhookRecord
 * @property id ID of the webhook.
 * @property description Description provided when creating webhook.
 * @property idModel ID of the Trello object the webhook is watching. This can be
 *                   any Trello object ID (list, board, card, member, etc.).
 * @property callbackURL The URL that the webhook will POST information to.
 * @property active Determines whether the webhook is active or not.
 */
export interface WebhookRecord {
  id: string;
  description: string;
  idModel: string;
  callbackURL: string;
  active: boolean;
}

export type WebhookField =
  | "id"
  | "description"
  | "idModel"
  | "callbackURL"
  | "active";

export interface NestedActionsParams {
  actions?: AllOrFieldOrListOf<ActionType>;
  actionsEntities?: boolean;
  actionsDisplay?: boolean;
  actionsFormat?: Format;
  actionsSince?: FilterDate;
  actionsLimit?: number;
  actionFields?: AllOrFieldOrListOf<ActionField>;
  actionMember?: boolean;
  actionMemberFields?: AllOrFieldOrListOf<MemberField>;
  actionMemberCreator?: boolean;
  actionMemberCreatorFields?: AllOrFieldOrListOf<MemberField>;
}

export interface NestedBoardParams {
  board?: boolean;
  boardFields?: AllOrFieldOrListOf<BoardField>;
}

export interface NestedBoardsParams {
  boards?: AllOrFieldOrListOf<BoardFilter>;
  boardFields?: AllOrFieldOrListOf<BoardField>;
  boardActions?: AllOrFieldOrListOf<BoardActionType>;
  boardActionsEntities?: boolean;
  boardActionsDisplay?: boolean;
  boardActionsFormat?: Format;
  boardActionsSince?: FilterDate;
  boardActionsLimit?: number;
  boardActionFields?: AllOrFieldOrListOf<ActionField>;
  boardLists?: ListFilter;
}

export interface NestedCardParams {
  card?: boolean;
  cardFields?: AllOrFieldOrListOf<CardField>;
}

export interface NestedCardsParams {
  cards?: CardFilter;
  cardFields?: AllOrFieldOrListOf<CardField>;
  cardMembers?: boolean;
  cardMemberFields?: AllOrFieldOrListOf<MemberField>;
  cardAttachments?: AttachmentFilter;
  cardAttachmentFields?: AllOrFieldOrListOf<AttachmentField>;
  cardStickers?: boolean;
  cardsModifiedSince?: FilterDate;
  cardCustomFieldItems?: boolean;
}

export interface NestedChecklistsParams {
  checklists?: AllOrNone;
  checklistFields?: AllOrFieldOrListOf<ChecklistField>;
  checkItems?: "all";
  checkItemFields?: AllOrFieldOrListOf<CheckItemField>;
}

export interface NestedCustomFieldsParams {
  customFields?: boolean;
}

export interface NestedEnterprisesParams {
  enterprises?: boolean;
  enterpriseFields?: AllOrFieldOrListOf<GetEnterprisesField>;
}

export interface NestedLabelsParams {
  labels?: AllOrNone;
  labelFields?: AllOrFieldOrListOf<LabelField>;
  /** A number from 0 to 1000. */
  labelsLimit?: number;
}

export interface NestedListsParams {
  lists?: ListFilter;
  listFields?: AllOrFieldOrListOf<ListField>;
}

export interface NestedMemberParams {
  member?: boolean;
  memberFields?: AllOrFieldOrListOf<MemberField>;
}

export interface NestedMemberCreatorParams {
  memberCreator?: boolean;
  memberCreatorFields?: AllOrFieldOrListOf<MemberField>;
}

export interface NestedMembersParams {
  members?: MemberFilter;
  memberFields?: AllOrFieldOrListOf<MemberField>;
}

export interface NestedMembersInvitedParams {
  membersInvited?: MemberFilter;
  membersInvitedFields?: AllOrFieldOrListOf<MemberField>;
}

export interface NestedMembershipsParams {
  memberships?: MembershipFilter;
}

export interface NestedNotificationsParams {
  notifications?: AllOrFieldOrListOf<NotificationType>;
  notificationsEntities?: boolean;
  notificationsDisplay?: boolean;
  notificationsLimit?: number;
  notificationFields?: AllOrFieldOrListOf<NotificationField>;
  notificationMemberCreator?: boolean;
  notificationMemberCreatorFields?: AllOrFieldOrListOf<MemberField>;
  notificationBefore?: string | null;
  notificationSince?: string | null;
}

export interface NestedOrganizationParams {
  organization?: boolean;
  organizationFields?: AllOrFieldOrListOf<OrganizationField>;
}

export interface NestedOrganizationsParams {
  organizations?: OrganizationFilter;
  organizationFields?: AllOrFieldOrListOf<OrganizationField>;
}

export interface NestedReactionsParams {
  reactions?: boolean;
  reactionsSummary?: boolean;
  reactionsMember?: boolean;
  reactionsMemberFields?: AllOrFieldOrListOf<MemberField>;
  reactionsEmoji?: boolean;
}
