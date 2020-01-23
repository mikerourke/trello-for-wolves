import { BaseResource } from "./BaseResource";
import { Action, ActionField, ActionFilter } from "./Action";
import { Attachment, AttachmentField, AttachmentFilter } from "./Attachment";
import { Board, BoardField } from "./Board";
import { CheckItem, CheckItemStateField } from "./CheckItem";
import { Checklist, ChecklistField } from "./Checklist";
import { Comment } from "./Comment";
import { Label, LabelColor } from "./Label";
import { List, ListField } from "./List";
import { Member, MemberField } from "./Member";
import { Sticker, StickerField } from "./Sticker";
import {
  AllOrNone,
  ArgumentGroup,
  KeepFromSourceField,
  PositionNumbered,
} from "../typeDefs";

export type CardAging = "pirate" | "regular";

export type CardField =
  | "badges"
  | "checkItemStates"
  | "closed"
  // The datetime of the last activity on the card. Note: There are activities
  // that update dateLastActivity that do not create a corresponding action.
  // For instance, updating the name field of a checklist item on a card does
  // not create an action but does update the card and board's
  // dateLastActivity value.
  | "dateLastActivity"
  | "desc"
  | "descData"
  | "due"
  | "dueComplete"
  | "email"
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
  | "url";

export type CardFilter = "all" | "closed" | "none" | "open" | "visible";

export class Card extends BaseResource {
  public getCards(params?: {
    actions?: ArgumentGroup<ActionFilter>;
    attachmentFields?: ArgumentGroup<AttachmentField>;
    attachments?: AttachmentFilter;
    before?: Date | null;
    checkItemStates?: boolean;
    checklists?: AllOrNone;
    fields?: ArgumentGroup<CardField>;
    filter?: CardFilter;
    limit?: number;
    memberFields?: ArgumentGroup<MemberField>;
    members?: boolean;
    since?: Date | null;
    stickers?: boolean;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getCard(params?: {
    actionFields?: ArgumentGroup<ActionField>;
    actionMemberCreatorFields?: ArgumentGroup<MemberField>;
    actions?: ArgumentGroup<ActionFilter>;
    actionsDisplay?: boolean;
    actionsEntities?: boolean;
    actionsLimit?: number;
    attachmentFields?: ArgumentGroup<AttachmentField>;
    attachments?: AttachmentFilter;
    board?: boolean;
    boardFields?: ArgumentGroup<BoardField>;
    checkItemStateFields?: ArgumentGroup<CheckItemStateField>;
    checkItemStates?: boolean;
    checklistFields?: ArgumentGroup<ChecklistField>;
    checklists?: AllOrNone;
    fields?: ArgumentGroup<CardField>;
    list?: boolean;
    listFields?: ArgumentGroup<ListField>;
    memberFields?: ArgumentGroup<MemberField>;
    members?: boolean;
    membersVoted?: boolean;
    memberVotedFields?: ArgumentGroup<MemberField>;
    pluginData?: boolean;
    stickerFields?: ArgumentGroup<StickerField>;
    stickers?: boolean;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getCardsFilteredBy(filter: CardFilter): Promise<unknown> {
    return this.apiGet(`/${filter}`);
  }

  public getFieldValue(field: CardField): Promise<unknown> {
    return this.apiGet(`/${field}`);
  }

  public voteOnCard(idMember: string): Promise<unknown> {
    return this.apiPost("/membersVoted", { value: idMember });
  }

  public removeVoteFromCard(idMember: string): Promise<unknown> {
    return this.apiDelete(`/membersVoted/${idMember}`);
  }

  public getPluginData(): Promise<unknown> {
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
    labels?: ArgumentGroup<LabelColor>;
    name?: string;
    pos?: PositionNumbered;
    urlSource?: string | null;
  }): Promise<unknown> {
    return this.apiPost("/", { ...params, separator: "/" });
  }

  public associateLabel(labelId: string): Promise<unknown> {
    return this.apiPost("/idLabels", { value: labelId });
  }

  public associateMember(memberId: string): Promise<unknown> {
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
  }): Promise<unknown> {
    return this.apiPut("/", params);
  }

  public updateClosedStatus(value: boolean): Promise<unknown> {
    return this.apiPut("/closed", { value });
  }

  public updateDescription(value: string): Promise<unknown> {
    return this.apiPut("/desc", { value });
  }

  public updateDueDate(value: Date | null): Promise<unknown> {
    return this.apiPut("/due", { value });
  }

  public updateDueComplete(value: boolean): Promise<unknown> {
    return this.apiPut("/dueComplete", { value });
  }

  /**
   * Update the Id of the image attachment of this card to use as its cover.
   * @example PUT /1/cards/:cardId/idAttachmentCover
   * @see https://developers.trello.com/advanced-reference/card#put-1-cards-card-id-or-shortlink-idattachmentcover
   */
  public updateAttachmentCoverImage(
    idAttachmentCover: string,
  ): Promise<unknown> {
    return this.apiPut("/idAttachmentCover", { value: idAttachmentCover });
  }

  public moveToBoard(
    boardId: string,
    params?: {
      idList?: string;
    },
  ): Promise<unknown> {
    return this.apiPut("/idBoard", { value: boardId, ...params });
  }

  public moveToList(listId: string): Promise<unknown> {
    return this.apiPut("/idList", { value: listId });
  }

  public associateMembers(memberIds: string[]): Promise<unknown> {
    return this.apiPut("/idMembers", { value: memberIds });
  }

  public updateName(value: string): Promise<unknown> {
    return this.apiPut("/name", { value });
  }

  public updatePosition(value: PositionNumbered): Promise<unknown> {
    return this.apiPut("/pos", { value });
  }

  public updateSubscribed(value: boolean): Promise<unknown> {
    return this.apiPut("/subscribed", { value });
  }

  public markAssociatedNotificationsRead(): Promise<unknown> {
    return this.apiPost("/markAssociatedNotificationsRead");
  }

  public deleteCard(): Promise<unknown> {
    return this.apiDelete("/");
  }

  public dissociateMember(memberId: string): Promise<unknown> {
    return this.apiDelete(`/idMembers/${memberId}`);
  }

  public dissociateLabel(labelId: string): Promise<unknown> {
    return this.apiDelete(`/idLabels/${labelId}`);
  }

  public actions(): Action {
    return new Action(this.config, `${this.baseEndpoint}/actions`);
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
