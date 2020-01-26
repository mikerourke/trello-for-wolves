import { BaseResource } from "./BaseResource";
import { Action, ActionField } from "./Action";
import { Attachment, AttachmentField, AttachmentFilter } from "./Attachment";
import { Board, BoardField } from "./Board";
import { CheckItem, CheckItemStateField } from "./CheckItem";
import { Checklist, ChecklistField } from "./Checklist";
import { Comment } from "./Comment";
import { Label, LabelColor, LabelRecord } from "./Label";
import { List, ListField } from "./List";
import { Member, MemberInvitedField } from "./Member";
import { Sticker, StickerField } from "./Sticker";
import {
  AllOfOrListOf,
  AllOrNone,
  FilterDate,
  KeepFromSourceField,
  PositionNumbered,
  TypedFetch,
  ValidResourceFields,
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

export interface CardCoordinatesRecord {
  latitude: number;
  longitude: number;
}

export interface CardRecord {
  /** The ID of the card. */
  id: string;
  /**
   * Pieces of information about the card that are displayed on the front of
   * the card.
   */
  badges: CardBadgeRecord;
  checkItemStates: string[];
  /**
   * Whether the card is closed (archived). Note: Archived lists and boards do
   * not cascade archives to cards. A card can have closed: false but be on an
   * archived board.
   */
  closed: boolean;
  /**
   * The datetime of the last activity on the card. Note: There are activities
   * that update dateLastActivity that do not create a corresponding action.
   * For instance, updating the name field of a checklist item on a card does
   * not create an action but does update the card and board's
   * dateLastActivity value.
   */
  dateLastActivity: string;
  /** The description for the card. Up to 16384 chars. */
  desc: string;
  /**
   * If the description has custom emoji, this field will provide the data
   * necessary to display them.
   */
  descData: string;
  /** The due date on the card, if one exists. */
  due: string;
  /** Whether the due date has been marked complete. */
  dueComplete: boolean;
  /** The id of the attachment selected as the cover image, if one exists. */
  idAttachmentCover: string;
  /** The ID of the board the card is on. */
  idBoard: string;
  /** An array of checklist IDs that are on this card. */
  idChecklists: string[];
  /** An array of label IDs that are on this card. */
  idLabels: string[];
  /** The ID of the list the card is in. */
  idList: string;
  /** An array of member IDs that are on this card. */
  idMembers: string[];
  /** An array of member IDs who have voted on this card. */
  idMembersVoted: string[];
  /**
   * Numeric ID for the card on this board. Only unique to the board, and
   * subject to change as the card moves.
   */
  idShort: number;
  /** Array of label objects on this card. */
  labels: LabelRecord[];
  /**
   * Whether the card cover image was selected automatically by Trello, or
   * manually by the user.
   */
  manualCoverAttachment: boolean;
  /** Name of the card. */
  name: string;
  /** Position of the card in the list. */
  pos: number;
  /** The 8 character shortened ID for the card. */
  shortLink: string;
  /** URL to the card without the name slug. */
  shortUrl: string;
  /** Whether this member is subscribed to the card. */
  subscribed: boolean;
  /** Full URL to the card, with the name slug. */
  url: string;
  /** Address of card location. */
  address: string;
  /** Name of card location. */
  locationName: string;
  /**
   * Either a comma-separated string in the format latitude,longitude or an
   * object containing keys for latitude and longitude whose values are
   * numbers between -180 and 180.
   */
  coordinates: CardCoordinatesRecord | string;
}

export type CardField = ValidResourceFields<CardRecord>;

export interface GetCardsViaQueryParams {
  cardAttachmentFields?: AllOfOrListOf<AttachmentField>;
  cardAttachments?: AttachmentFilter;
  cardCustomFieldItems?: boolean;
  cardFields?: AllOfOrListOf<CardField>;
  cardMemberFields?: AllOfOrListOf<MemberInvitedField>;
  cardMembers?: boolean;
  cards?: AllOfOrListOf<CardFilter>;
  cardsModifiedSince?: string | null;
  cardStickers?: boolean;
}

export interface GetCardsViaUrlParams {
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
}

export type GetCardsReturnType<
  TParams,
  TPayload
> = TParams extends GetCardsViaQueryParams
  ? TPayload & { cards: CardRecord[] }
  : CardRecord[];

export type AllGetCardsParams = GetCardsViaUrlParams | GetCardsViaQueryParams;

export class Card extends BaseResource {
  public getCard(params?: {
    actionFields?: AllOfOrListOf<ActionField>;
    actionMemberCreatorFields?: AllOfOrListOf<MemberInvitedField>;
    actions?: AllOfOrListOf<CardActionType>;
    actionsDisplay?: boolean;
    actionsEntities?: boolean;
    actionsLimit?: number;
    attachmentFields?: AllOfOrListOf<AttachmentField>;
    attachments?: AttachmentFilter;
    board?: boolean;
    boardFields?: AllOfOrListOf<BoardField>;
    checkItemStateFields?: AllOfOrListOf<CheckItemStateField>;
    checkItemStates?: boolean;
    checklistFields?: AllOfOrListOf<ChecklistField>;
    checklists?: AllOrNone;
    fields?: AllOfOrListOf<CardField>;
    list?: boolean;
    listFields?: AllOfOrListOf<ListField>;
    memberFields?: AllOfOrListOf<MemberInvitedField>;
    members?: boolean;
    membersVoted?: boolean;
    memberVotedFields?: AllOfOrListOf<MemberInvitedField>;
    pluginData?: boolean;
    stickerFields?: AllOfOrListOf<StickerField>;
    stickers?: boolean;
  }): TypedFetch<CardRecord> {
    return this.apiGet("/", params);
  }

  public getCards<TPayload extends object, TParams extends AllGetCardsParams>(
    params?: TParams,
  ): TypedFetch<GetCardsReturnType<TParams, TPayload>> {
    return this.apiGet("/", params);
  }

  public getCardsFilteredBy(filter: CardFilter): TypedFetch<unknown> {
    return this.apiGet(`/${filter}`);
  }

  public getFieldValue(field: CardField): TypedFetch<unknown> {
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

  public addCard(params: {
    desc?: string;
    due?: Date | null;
    dueComplete?: boolean;
    fileSource?: Record<string, any>;
    idCardSource?: string;
    idLabels?: string[];
    idList?: string;
    idMembers?: string[];
    keepFromSource?: KeepFromSourceField | KeepFromSourceField[];
    labels?: AllOfOrListOf<LabelColor>;
    name?: string;
    pos?: PositionNumbered;
    urlSource?: string | null;
  }): TypedFetch<unknown> {
    return this.apiPost("/", { ...params, separator: "/" });
  }

  public associateLabel(labelId: string): TypedFetch<unknown> {
    return this.apiPost("/idLabels", { value: labelId });
  }

  public associateMember(memberId: string): TypedFetch<unknown> {
    return this.apiPost("/idMembers", { value: memberId });
  }

  public updateCard(params?: {
    closed?: boolean;
    desc?: string;
    due?: Date | null;
    dueComplete?: boolean;
    idAttachmentCover?: string;
    idBoard?: string;
    idLabels?: string[];
    idList?: string;
    idMembers?: string[];
    name?: string;
    pos?: PositionNumbered;
    subscribed?: boolean;
  }): TypedFetch<unknown> {
    return this.apiPut("/", params);
  }

  public updateClosedStatus(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/closed", { value });
  }

  public updateDescription(value: string): TypedFetch<unknown> {
    return this.apiPut("/desc", { value });
  }

  public updateDueDate(value: Date | null): TypedFetch<unknown> {
    return this.apiPut("/due", { value });
  }

  public updateDueComplete(value: boolean): TypedFetch<unknown> {
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
    boardId: string,
    params?: {
      idList?: string;
    },
  ): TypedFetch<unknown> {
    return this.apiPut("/idBoard", { value: boardId, ...params });
  }

  public moveToList(listId: string): TypedFetch<unknown> {
    return this.apiPut("/idList", { value: listId });
  }

  public associateMembers(memberIds: string[]): TypedFetch<unknown> {
    return this.apiPut("/idMembers", { value: memberIds });
  }

  public updateName(value: string): TypedFetch<unknown> {
    return this.apiPut("/name", { value });
  }

  public updatePosition(value: PositionNumbered): TypedFetch<unknown> {
    return this.apiPut("/pos", { value });
  }

  public updateSubscribed(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/subscribed", { value });
  }

  public markAssociatedNotificationsRead(): TypedFetch<unknown> {
    return this.apiPost("/markAssociatedNotificationsRead");
  }

  public deleteCard(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }

  public dissociateMember(memberId: string): TypedFetch<unknown> {
    return this.apiDelete(`/idMembers/${memberId}`);
  }

  public dissociateLabel(labelId: string): TypedFetch<unknown> {
    return this.apiDelete(`/idLabels/${labelId}`);
  }

  public actions(): Action {
    return new Action<CardActionType>(
      this.config,
      `${this.baseEndpoint}/actions`,
    );
  }

  public attachments(attachmentId: string = ""): Attachment {
    return new Attachment(
      this.config,
      `${this.baseEndpoint}/attachments/${attachmentId}`,
    );
  }

  public board(): Board {
    return new Board(this.config, `${this.baseEndpoint}/board`);
  }

  public checkItemStates(): CheckItem {
    return new CheckItem(this.config, `${this.baseEndpoint}/checkItemStates`);
  }

  public checklist(checklistId: string): Checklist {
    return new Checklist(
      this.config,
      `${this.baseEndpoint}/checklist/${checklistId}`,
    );
  }

  public checklists(checklistId: string = ""): Checklist {
    return new Checklist(
      this.config,
      `${this.baseEndpoint}/checklists/${checklistId}`,
    );
  }

  public checkItem(checkItemId: string): CheckItem {
    return new CheckItem(
      this.config,
      `${this.baseEndpoint}/checkItem/${checkItemId}`,
    );
  }

  public comments(commentId: string = ""): Comment {
    return new Comment(
      this.config,
      `${this.baseEndpoint}/actions/${commentId}`,
    );
  }

  public labels(): Label {
    return new Label(this.config, `${this.baseEndpoint}/labels`);
  }

  public list(): List {
    return new List(this.config, `${this.baseEndpoint}/list`);
  }

  public members(): Member {
    return new Member(this.config, `${this.baseEndpoint}/members`);
  }

  public stickers(stickerId: string = ""): Sticker {
    return new Sticker(
      this.config,
      `${this.baseEndpoint}/stickers/${stickerId}`,
    );
  }
}
