import { TrelloForWolvesError } from "../TrelloForWolvesError";
import { BaseResource } from "./BaseResource";
import { Action } from "./Action";
import { Attachment, AttachmentField, AttachmentFilter } from "./Attachment";
import { Board, BoardField } from "./Board";
import { CheckItem } from "./CheckItem";
import { Checklist, ChecklistField } from "./Checklist";
import { Comment } from "./Comment";
import { CustomField } from "./CustomField";
import { CustomFieldOption } from "./CustomFieldOption";
import { Label, LabelRecord } from "./Label";
import { List } from "./List";
import { Member, MemberInvitedField } from "./Member";
import { Sticker, StickerField } from "./Stickers";
import {
  AllOrFieldOrListOf,
  AllOrNone,
  ColorName,
  DateValue,
  FieldOrListOf,
  FileUpload,
  FilterDate,
  KeepFromSourceField,
  Limits,
  PositionOrFloat,
  TypedFetch,
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

export class Card extends BaseResource {
  public getCard(params?: {
    fields?: AllOrFieldOrListOf<CardField>;
    actions?: AllOrFieldOrListOf<CardActionType>;
    attachments?: AttachmentFilter;
    attachmentFields?: AllOrFieldOrListOf<AttachmentField>;
    members?: boolean;
    memberFields?: AllOrFieldOrListOf<MemberInvitedField>;
    membersVoted?: boolean;
    memberVotedFields?: AllOrFieldOrListOf<MemberInvitedField>;
    checkItemStates?: boolean;
    checklists?: AllOrNone;
    checklistFields?: AllOrFieldOrListOf<ChecklistField>;
    board?: boolean;
    boardFields?: AllOrFieldOrListOf<BoardField>;
    list?: boolean;
    pluginData?: boolean;
    stickers?: boolean;
    stickerFields?: AllOrFieldOrListOf<StickerField>;
    customFieldItems?: boolean;
  }): TypedFetch<CardRecord> {
    return this.apiGet("/", params);
  }

  public getCards(params?: {
    fields?: AllOrFieldOrListOf<CardField>;
    filter?: CardFilter;
    actions?: AllOrFieldOrListOf<CardActionType>;
    attachments?: AttachmentFilter;
    attachmentFields?: AllOrFieldOrListOf<AttachmentField>;
    members?: boolean;
    memberFields?: AllOrFieldOrListOf<MemberInvitedField>;
    checkItemStates?: boolean;
    checklists?: AllOrNone;
    pluginData?: boolean;
    stickers?: boolean;
    customFieldItems?: boolean;
    before?: FilterDate;
    since?: FilterDate;
    sort: "none" | "-id";
    limit?: number;
  }): TypedFetch<CardRecord[]> {
    const validParams = this.setValidDateParams(["before", "since"], params);
    return this.apiGet("/", validParams);
  }

  public getNestedCards<TPayload extends object>(params?: {
    cards?: AllOrFieldOrListOf<CardFilter>;
    cardFields?: AllOrFieldOrListOf<CardField>;
    cardMembers?: boolean;
    cardMemberFields?: AllOrFieldOrListOf<MemberInvitedField>;
    cardAttachments?: AttachmentFilter;
    cardAttachmentFields?: AllOrFieldOrListOf<AttachmentField>;
    cardStickers?: boolean;
    cardsModifiedSince?: FilterDate;
    cardCustomFieldItems?: boolean;
  }): TypedFetch<TPayload & { cards: CardRecord[] }> {
    const validParams = this.setValidDateParams(["cardsModifiedSince"], params);
    return this.apiGetNested(validParams);
  }

  public getCardsFilteredBy(filter: CardFilter): TypedFetch<CardRecord[]> {
    return this.apiGet(`/${filter}`);
  }

  public getFieldValue<T>(field: CardField): TypedFetch<ValueResponse<T>> {
    return this.apiGet(`/${field}`);
  }

  public getPluginData(): TypedFetch<unknown> {
    return this.apiGet("/pluginData");
  }

  public addCard(params?: {
    name?: string;
    desc?: string;
    pos?: PositionOrFloat;
    due?: DateValue;
    dueComplete?: boolean;
    idList?: string;
    idMembers?: string[];
    idLabels?: string[];
    urlSource?: string | null;
    fileSource?: FileUpload;
    idCardSource?: string;
    keepFromSource?: FieldOrListOf<KeepFromSourceField>;
    labels?: AllOrFieldOrListOf<ColorName>;
    address?: string;
    locationName?: string;
    coordinates?: CardCoordinatesRecord | string;
  }): TypedFetch<CardRecord> {
    const validParams = this.setValidDateParams(["due"], params) ?? {};

    if (this.isChildOf("list")) {
      validParams.idList = validParams.idList ?? this.identifier;
    }

    if (!validParams.idList) {
      throw new TrelloForWolvesError(
        `You must pass specify the "idList" param or pass a list ID to the lists() instance when calling addCard()`,
      );
    }

    return this.apiPost("/", { ...validParams, separator: "/" });
  }

  public updateCard(params: {
    name?: string;
    desc?: string;
    closed?: boolean;
    idMembers?: string[];
    idAttachmentCover?: string;
    idList?: string;
    idLabels?: string[];
    idBoard?: string;
    pos?: PositionOrFloat;
    due?: DateValue;
    dueComplete?: boolean;
    subscribed?: boolean;
    address?: string;
    locationName?: string;
    coordinates?: CardCoordinatesRecord | string;
  }): TypedFetch<CardRecord> {
    const validParams = this.setValidDateParams(["due"], params);
    return this.apiPut("/", validParams);
  }

  public updateClosedStatus(value: boolean): TypedFetch<CardRecord> {
    return this.apiPut("/closed", { value });
  }

  public updateDescription(value: string): TypedFetch<CardRecord> {
    return this.apiPut("/desc", { value });
  }

  public updateDueDate(value: DateValue): TypedFetch<CardRecord> {
    const validValue = this.dateToIsoString(value);
    return this.apiPut("/due", { value: validValue });
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

  public updateName(value: string): TypedFetch<CardRecord> {
    return this.apiPut("/name", { value });
  }

  public updatePosition(value: PositionOrFloat): TypedFetch<CardRecord> {
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

  public actions(): Action<CardActionType> {
    return new Action<CardActionType>(
      this.config,
      this.pathElements,
      "actions",
    );
  }

  public attachments(idAttachment: string = ""): Attachment {
    return new Attachment(this.config, this.pathElements, "attachments", {
      identifier: idAttachment,
    });
  }

  public board(): Board {
    return new Board(this.config, this.pathElements, "board");
  }

  public checkItem(idCheckItem: string): CheckItem {
    return new CheckItem(this.config, this.pathElements, "checkItem", {
      identifier: idCheckItem,
    });
  }

  public checkItemStates(): CheckItem {
    return new CheckItem(this.config, this.pathElements, "checkItemStates");
  }

  public checklist(idChecklist: string): Checklist {
    return new Checklist(this.config, this.pathElements, "checklist", {
      identifier: idChecklist,
    });
  }

  public checklists(idChecklist: string = ""): Checklist {
    return new Checklist(this.config, this.pathElements, "checklists", {
      identifier: idChecklist,
    });
  }

  public comments(idComment: string = ""): Comment {
    return new Comment(this.config, this.pathElements, "actions", {
      identifier: idComment,
    });
  }

  public customField(idCustomField: string): CustomField {
    const updatedPathElements = this.pathElements.reduce((acc, pathElement) => {
      if (pathElement === "cards") {
        return [...acc, "card"];
      }
      return [...acc, pathElement];
    }, [] as string[]);

    return new CustomField(this.config, updatedPathElements, "customField", {
      identifier: idCustomField,
    });
  }

  public customFieldItems(): CustomFieldOption {
    return new CustomFieldOption(
      this.config,
      this.pathElements,
      "customFieldItems",
    );
  }

  public labels(idLabel: string = ""): Label {
    return new Label(this.config, this.pathElements, "labels", {
      identifier: idLabel,
    });
  }

  public list(): List {
    return new List(this.config, this.pathElements, "list");
  }

  public members(idMember: string = ""): Member {
    return new Member(this.config, this.pathElements, "members", {
      identifier: idMember,
    });
  }

  public membersVoted(idMember: string = ""): Member {
    return new Member(this.config, this.pathElements, "membersVoted", {
      identifier: idMember,
    });
  }

  public stickers(idSticker: string = ""): Sticker {
    return new Sticker(this.config, this.pathElements, "stickers", {
      identifier: idSticker,
    });
  }
}
