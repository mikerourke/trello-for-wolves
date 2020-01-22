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
  public getCards(options?: {
    actions?: ArgumentGroup<ActionFilter>;
    attachments?: AttachmentFilter;
    attachmentFields?: ArgumentGroup<AttachmentField>;
    stickers?: boolean;
    members?: boolean;
    memberFields?: ArgumentGroup<MemberField>;
    checkItemStates?: boolean;
    checklists?: AllOrNone;
    limit?: number;
    since?: Date | null;
    before?: Date | null;
    filter?: CardFilter;
    fields?: ArgumentGroup<CardField>;
  }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public getCard(options?: {
    actions?: ArgumentGroup<ActionFilter>;
    actionsEntities?: boolean;
    actionsDisplay?: boolean;
    actionsLimit?: number;
    actionFields?: ArgumentGroup<ActionField>;
    actionMemberCreatorFields?: ArgumentGroup<MemberField>;
    attachments?: AttachmentFilter;
    attachmentFields?: ArgumentGroup<AttachmentField>;
    members?: boolean;
    memberFields?: ArgumentGroup<MemberField>;
    membersVoted?: boolean;
    memberVotedFields?: ArgumentGroup<MemberField>;
    checkItemStates?: boolean;
    checkItemStateFields?: ArgumentGroup<CheckItemStateField>;
    checklists?: AllOrNone;
    checklistFields?: ArgumentGroup<ChecklistField>;
    board?: boolean;
    boardFields?: ArgumentGroup<BoardField>;
    list?: boolean;
    listFields?: ArgumentGroup<ListField>;
    pluginData?: boolean;
    stickers?: boolean;
    stickerFields?: ArgumentGroup<StickerField>;
    fields?: ArgumentGroup<CardField>;
  }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public getCardsFilteredBy(filter: CardFilter): Promise<unknown> {
    return this.httpGet(`/${filter}`);
  }

  public getFieldValue(field: CardField): Promise<unknown> {
    return this.httpGet(`/${field}`);
  }

  public actions(): Action {
    return new Action(this.config, `${this.routePath}/actions`);
  }

  public attachments(attachmentId: string = ""): Attachment {
    return new Attachment(
      this.config,
      `${this.routePath}/attachments/${attachmentId}`,
    );
  }

  public board(): Board {
    return new Board(this.config, `${this.routePath}/board`);
  }

  public checkItemStates(): CheckItem {
    return new CheckItem(this.config, `${this.routePath}/checkItemStates`);
  }

  public checklist(checklistId: string): Checklist {
    return new Checklist(
      this.config,
      `${this.routePath}/checklist/${checklistId}`,
    );
  }

  public checklists(checklistId: string = ""): Checklist {
    return new Checklist(
      this.config,
      `${this.routePath}/checklists/${checklistId}`,
    );
  }

  public checkItem(checkItemId: string): CheckItem {
    return new CheckItem(
      this.config,
      `${this.routePath}/checkItem/${checkItemId}`,
    );
  }

  public comments(commentId: string = ""): Comment {
    return new Comment(this.config, `${this.routePath}/actions/${commentId}`);
  }

  public labels(): Label {
    return new Label(this.config, `${this.routePath}/labels`);
  }

  public list(): List {
    return new List(this.config, `${this.routePath}/list`);
  }

  public members(): Member {
    return new Member(this.config, `${this.routePath}/members`);
  }

  public membersVoted(memberId: string = ""): Member {
    return new Member(this.config, `${this.routePath}/membersVoted`, memberId);
  }

  public getPluginData(): Promise<unknown> {
    return this.httpGet("/pluginData");
  }

  public stickers(stickerId: string = ""): Sticker {
    return new Sticker(this.config, `${this.routePath}/stickers/${stickerId}`);
  }

  public updateCard(options?: {
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
  }): Promise<unknown> {
    return this.httpPut("/", options);
  }

  public updateClosedStatus(value: boolean): Promise<unknown> {
    return this.httpPut("/closed", { value });
  }

  public updateDescription(value: string): Promise<unknown> {
    return this.httpPut("/desc", { value });
  }

  public updateDueDate(value: Date | null): Promise<unknown> {
    return this.httpPut("/due", { value });
  }

  public updateDueComplete(value: boolean): Promise<unknown> {
    return this.httpPut("/dueComplete", { value });
  }

  /**
   * Update the Id of the image attachment of this card to use as its cover.
   * @example PUT /1/cards/:cardId/idAttachmentCover
   * @see {@link https://developers.trello.com/advanced-reference/card#put-1-cards-card-id-or-shortlink-idattachmentcover}
   */
  public updateAttachmentCoverImage(
    idAttachmentCover: string,
  ): Promise<unknown> {
    return this.httpPut("/idAttachmentCover", { value: idAttachmentCover });
  }

  public moveToBoard(
    boardId: string,
    options?: {
      idList?: string;
    },
  ): Promise<unknown> {
    return this.httpPut("/idBoard", { value: boardId, ...options });
  }

  public moveToList(listId: string): Promise<unknown> {
    return this.httpPut("/idList", { value: listId });
  }

  public associateMembers(memberIds: string[]): Promise<unknown> {
    return this.httpPut("/idMembers", { value: memberIds });
  }

  public updateName(value: string): Promise<unknown> {
    return this.httpPut("/name", { value });
  }

  public updatePosition(value: PositionNumbered): Promise<unknown> {
    return this.httpPut("/pos", { value });
  }

  public updateSubscribed(value: boolean): Promise<unknown> {
    return this.httpPut("/subscribed", { value });
  }

  public addCard(
    options:
      | {
          idList: string;
          name?: string;
          desc?: string;
          pos?: PositionNumbered;
          due?: Date | null;
          dueComplete?: boolean;
          idMembers?: string[];
          idLabels?: string[];
          urlSource?: string | null;
          fileSource?: Record<string, any>;
          idCardSource?: string;
          keepFromSource?: KeepFromSourceField | KeepFromSourceField[];
        }
      | {
          // These are for adding a card from a List.
          name: string;
          desc?: string;
          labels?: ArgumentGroup<LabelColor>;
          idMembers?: string[];
          due?: Date | null;
        },
  ): Promise<unknown> {
    return this.httpPost("/", { ...options, separator: "/" });
  }

  public associateLabel(labelId: string): Promise<unknown> {
    return this.httpPost("/idLabels", { value: labelId });
  }

  public associateMember(memberId: string): Promise<unknown> {
    return this.httpPost("/idMembers", { value: memberId });
  }

  public markAssociatedNotificationsRead(): Promise<unknown> {
    return this.httpPost("/markAssociatedNotificationsRead");
  }

  public deleteCard(): Promise<unknown> {
    return this.httpDelete("/");
  }

  public dissociateMember(memberId: string): Promise<unknown> {
    return this.httpDelete(`/idMembers/${memberId}`);
  }

  public dissociateLabel(labelId: string): Promise<unknown> {
    return this.httpDelete(`/idLabels/${labelId}`);
  }
}
