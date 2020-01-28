import { BaseResource } from "./BaseResource";
import { Action } from "./Action";
import { Attachment, AttachmentField, AttachmentFilter } from "./Attachment";
import { Board, BoardField } from "./Board";
import { CheckItem } from "./CheckItem";
import { Checklist, ChecklistField } from "./Checklist";
import { Comment } from "./Comment";
import { Label, LabelColor, LabelRecord } from "./Label";
import { List } from "./List";
import { Member, MemberInvitedField } from "./Member";
import { Sticker, StickerField } from "./Sticker";
import {
  AllOfOrListOf,
  AllOrNone,
  FieldOrListOf,
  FileUpload,
  FilterDate,
  KeepFromSourceField,
  PositionNumbered,
  TypedFetch,
  ValidResourceFields,
  ValueResponse,
} from "../typeDefs";

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
  address?: string;
  locationName?: string;
  coordinates?: CardCoordinatesRecord | string;
}

/**
 * The data associated with a Card object returned from the Trello API. It
 * includes fields from {@link CardMapPowerUpRecord}.
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
 * @property idShort Numeric ID for the card on this board. Only unique to the board, and subject to
 *                   change as the card moves.
 * @property labels Array of label objects on this card.
 * @property manualCoverAttachment Whether the card cover image was selected automatically by
 *                                 Trello, or manually by the user.
 * @property name Name of the card.
 * @property pos Position of the card in the list.
 * @property shortLink The 8 character shortened ID for the card.
 * @property shortUrl URL to the card without the name slug.
 * @property subscribed Whether this member is subscribed to the card.
 * @property url Full URL to the card, with the name slug.
 */
export interface CardRecord extends CardMapPowerUpRecord {
  id: string;
  badges: CardBadgeRecord;
  checkItemStates: string[];
  closed: boolean;
  dateLastActivity: string;
  desc: string;
  descData: string;
  due: string;
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
}

export type CardField = ValidResourceFields<CardRecord>;

export class Card extends BaseResource {
  public getCard(params?: {
    fields?: AllOfOrListOf<CardField>;
    actions?: AllOfOrListOf<CardActionType>;
    attachments?: AttachmentFilter;
    attachmentFields?: AllOfOrListOf<AttachmentField>;
    members?: boolean;
    memberFields?: AllOfOrListOf<MemberInvitedField>;
    membersVoted?: boolean;
    memberVotedFields?: AllOfOrListOf<MemberInvitedField>;
    checkItemStates?: boolean;
    checklists?: AllOrNone;
    checklistFields?: AllOfOrListOf<ChecklistField>;
    board?: boolean;
    boardFields?: AllOfOrListOf<BoardField>;
    list?: boolean;
    pluginData?: boolean;
    stickers?: boolean;
    stickerFields?: AllOfOrListOf<StickerField>;
    customFieldItems?: boolean;
  }): TypedFetch<CardRecord> {
    this.validateGetSingle();
    return this.apiGet("/", params);
  }

  public getCards(params?: {
    actions?: AllOfOrListOf<CardActionType>;
    attachmentFields?: AllOfOrListOf<AttachmentField>;
    attachments?: AttachmentFilter;
    before?: FilterDate;
    checkItemStates?: boolean;
    checklists?: AllOrNone;
    customFieldItems?: boolean;
    fields?: AllOfOrListOf<CardField>;
    filter?: CardFilter;
    limit?: number;
    memberFields?: AllOfOrListOf<MemberInvitedField>;
    members?: boolean;
    pluginData?: boolean;
    since?: FilterDate;
    sort: "none" | "-id";
    stickers?: boolean;
  }): TypedFetch<CardRecord[]> {
    return this.apiGet("/", params);
  }

  public getNestedCards<TPayload extends object>(params?: {
    cards?: AllOfOrListOf<CardFilter>;
    cardFields?: AllOfOrListOf<CardField>;
    cardMembers?: boolean;
    cardMemberFields?: AllOfOrListOf<MemberInvitedField>;
    cardAttachments?: AttachmentFilter;
    cardAttachmentFields?: AllOfOrListOf<AttachmentField>;
    cardStickers?: boolean;
    cardsModifiedSince?: string | null;
    cardCustomFieldItems?: boolean;
  }): TypedFetch<TPayload & { cards: CardRecord[] }> {
    return this.apiGetNested(params);
  }

  public getCardsFilteredBy(filter: CardFilter): TypedFetch<CardRecord[]> {
    return this.apiGet(`/${filter}`);
  }

  public getFieldValue<T>(field: CardField): TypedFetch<ValueResponse<T>> {
    return this.apiGet(`/${field}`);
  }

  public voteOnCard(idMember: string): TypedFetch<unknown> {
    return this.apiPost("/membersVoted", { value: idMember });
  }

  public removeVoteFromCard(idMember: string): TypedFetch<unknown> {
    return this.apiDelete(`/membersVoted/${idMember}`);
  }

  public getPluginData(): TypedFetch<unknown> {
    return this.apiGet("/pluginData");
  }

  public addCard(
    params: {
      name?: string;
      desc?: string;
      pos?: PositionNumbered;
      due?: Date | null;
      dueComplete?: boolean;
      idList?: string;
      idMembers?: string[];
      idLabels?: string[];
      urlSource?: string | null;
      fileSource?: FileUpload;
      idCardSource?: string;
      keepFromSource?: FieldOrListOf<KeepFromSourceField>;
      labels?: AllOfOrListOf<LabelColor>;
    } & CardMapPowerUpRecord,
  ): TypedFetch<CardRecord> {
    return this.apiPost("/", { ...params, separator: "/" });
  }

  public associateLabel(labelId: string): TypedFetch<unknown> {
    return this.apiPost("/idLabels", { value: labelId });
  }

  public associateMember(memberId: string): TypedFetch<unknown> {
    return this.apiPost("/idMembers", { value: memberId });
  }

  public updateCard(
    params: {
      name?: string;
      desc?: string;
      closed?: boolean;
      idMembers?: string[];
      idAttachmentCover?: string;
      idList?: string;
      idLabels?: string[];
      idBoard?: string;
      pos?: PositionNumbered;
      due?: Date | null;
      dueComplete?: boolean;
      subscribed?: boolean;
    } & CardMapPowerUpRecord,
  ): TypedFetch<CardRecord> {
    this.validateUpdate(params);
    return this.apiPut("/", params);
  }

  public updateClosedStatus(value: boolean): TypedFetch<CardRecord> {
    return this.apiPut("/closed", { value });
  }

  public updateDescription(value: string): TypedFetch<CardRecord> {
    return this.apiPut("/desc", { value });
  }

  public updateDueDate(value: Date | null): TypedFetch<CardRecord> {
    return this.apiPut("/due", { value });
  }

  public updateDueComplete(value: boolean): TypedFetch<CardRecord> {
    return this.apiPut("/dueComplete", { value });
  }

  /**
   * Update the Id of the image attachment of this card to use as its cover.
   * @example PUT /1/cards/:cardId/idAttachmentCover
   * @see https://developers.trello.com/advanced-reference/card#put-1-cards-card-id-or-shortlink-idattachmentcover
   */
  public updateAttachmentCoverImage(
    idAttachmentCover: string,
  ): TypedFetch<unknown> {
    return this.apiPut("/idAttachmentCover", { value: idAttachmentCover });
  }

  public moveToBoard(
    idBoard: string,
    params?: {
      idList?: string;
    },
  ): TypedFetch<unknown> {
    return this.apiPut("/idBoard", { value: idBoard, ...params });
  }

  public moveToList(idList: string): TypedFetch<unknown> {
    return this.apiPut("/idList", { value: idList });
  }

  public associateMembers(idMembers: string[]): TypedFetch<unknown> {
    return this.apiPut("/idMembers", { value: idMembers });
  }

  public updateName(value: string): TypedFetch<CardRecord> {
    return this.apiPut("/name", { value });
  }

  public updatePosition(value: PositionNumbered): TypedFetch<CardRecord> {
    return this.apiPut("/pos", { value });
  }

  public updateSubscribed(value: boolean): TypedFetch<CardRecord> {
    return this.apiPut("/subscribed", { value });
  }

  public markAssociatedNotificationsRead(): TypedFetch<unknown> {
    return this.apiPost("/markAssociatedNotificationsRead");
  }

  public deleteCard(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }

  public dissociateMember(idMember: string): TypedFetch<unknown> {
    return this.apiDelete(`/idMembers/${idMember}`);
  }

  public dissociateLabel(idLabel: string): TypedFetch<unknown> {
    return this.apiDelete(`/idLabels/${idLabel}`);
  }

  public actions(): Action<CardActionType> {
    return new Action<CardActionType>(
      this.config,
      this.pathElements,
      "actions",
    );
  }

  public attachments(idAttachment: string = ""): Attachment {
    return new Attachment(
      this.config,
      this.pathElements,
      "attachments",
      idAttachment,
    );
  }

  public board(): Board {
    return new Board(this.config, this.pathElements, "board");
  }

  public checkItemStates(): CheckItem {
    return new CheckItem(this.config, this.pathElements, "checkItemStates");
  }

  public checklist(checklistId: string): Checklist {
    return new Checklist(
      this.config,
      this.pathElements,
      "checklist",
      checklistId,
    );
  }

  public checklists(checklistId: string = ""): Checklist {
    return new Checklist(
      this.config,
      this.pathElements,
      "checklists",
      checklistId,
    );
  }

  public checkItem(checkItemId: string): CheckItem {
    return new CheckItem(
      this.config,
      this.pathElements,
      "checkItem",
      checkItemId,
    );
  }

  public comments(commentId: string = ""): Comment {
    return new Comment(this.config, this.pathElements, `actions/${commentId}`);
  }

  public labels(): Label {
    return new Label(this.config, this.pathElements, "labels");
  }

  public list(): List {
    return new List(this.config, this.pathElements, "list");
  }

  public members(): Member {
    return new Member(this.config, this.pathElements, "members");
  }

  public stickers(stickerId: string = ""): Sticker {
    return new Sticker(this.config, this.pathElements, "stickers", stickerId);
  }
}
