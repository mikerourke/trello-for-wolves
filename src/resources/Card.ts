// @flow
import { generateTypeMap } from '../utils/type-mapper';
import BaseResource from './BaseResource';
import Action from './Action';
import Attachment from './Attachment';
import Board from './Board';
import CheckItem from './CheckItem';
import Checklist from './Checklist';
import Comment from './Comment';
import Label from './Label';
import List from './List';
import Member from './Member';
import Sticker from './Sticker';
import type {
  ActionField,
  ActionFilter,
  AllOrNone,
  ArgumentGroup,
  AttachmentField,
  AttachmentFilter,
  BoardField,
  CheckItemStateField,
  ChecklistField,
  KeepFromSourceField,
  LabelColor,
  ListField,
  MemberField,
  PositionNumbered,
  StickerField,
} from '../typeDefs';

export const cardAgingMap = generateTypeMap('pirate', 'regular');
export type CardAging = $Keys<typeof cardAgingMap>;

export const cardFieldMap = generateTypeMap(
  'badges',
  'checkItemStates',
  'closed',
  // The datetime of the last activity on the card. Note: There are activities
  // that update dateLastActivity that do not create a corresponding action.
  // For instance, updating the name field of a checklist item on a card does
  // not create an action but does update the card and board's
  // dateLastActivity value.
  'dateLastActivity',
  'desc',
  'descData',
  'due',
  'dueComplete',
  'email',
  'idAttachmentCover',
  'idBoard',
  'idChecklists',
  'idLabels',
  'idList',
  'idMembers',
  'idMembersVoted',
  'idShort',
  'labels',
  'manualCoverAttachment',
  'name',
  'pos',
  'shortLink',
  'shortUrl',
  'subscribed',
  'url',
);
export type CardField = $Keys<typeof cardFieldMap>;

export const cardFilterMap = generateTypeMap('all', 'closed', 'none', 'open', 'visible');
export type CardFilter = $Keys<typeof cardFilterMap>;

/**
 * @namespace Card
 */
export default class Card extends BaseResource {
  getCards(
    queryArgs?: {
      actions?: ArgumentGroup<ActionFilter>,
      attachments?: AttachmentFilter,
      attachmentFields?: ArgumentGroup<AttachmentField>,
      stickers?: boolean,
      members?: boolean,
      memberFields?: ArgumentGroup<MemberField>,
      checkItemStates?: boolean,
      checklists?: AllOrNone,
      limit?: number,
      since?: ?Date,
      before?: ?Date,
      filter?: CardFilter,
      fields?: ArgumentGroup<CardField>,
    },
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getCard(
    queryArgs?: {
      actions?: ArgumentGroup<ActionFilter>,
      actionsEntities?: boolean,
      actionsDisplay?: boolean,
      actionsLimit?: number,
      actionFields?: ArgumentGroup<ActionField>,
      actionMemberCreatorFields?: ArgumentGroup<MemberField>,
      attachments?: AttachmentFilter,
      attachmentFields?: ArgumentGroup<AttachmentField>,
      members?: boolean,
      memberFields?: ArgumentGroup<MemberField>,
      membersVoted?: boolean,
      memberVotedFields?: ArgumentGroup<MemberField>,
      checkItemStates?: boolean,
      checkItemStateFields?: ArgumentGroup<CheckItemStateField>,
      checklists?: AllOrNone,
      checklistFields?: ArgumentGroup<ChecklistField>,
      board?: boolean,
      boardFields?: ArgumentGroup<BoardField>,
      list?: boolean,
      listFields?: ArgumentGroup<ListField>,
      pluginData?: boolean,
      stickers?: boolean,
      stickerFields?: ArgumentGroup<StickerField>,
      fields?: ArgumentGroup<CardField>,
    },
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getCardsFilteredBy(filter: CardFilter): Promise<any> {
    return this.httpGet(`/${filter}`);
  }

  getFieldValue(field: CardField): Promise<any> {
    return this.httpGet(`/${field}`);
  }

  actions() {
    return new Action(this.config, `${this.routePath}/actions`);
  }

  attachments(attachmentId?: string = '') {
    return new Attachment(this.config, `${this.routePath}/attachments/${attachmentId}`);
  }

  board() {
    return new Board(this.config, `${this.routePath}/board`);
  }

  checkItemStates() {
    return new CheckItem(this.config, `${this.routePath}/checkItemStates`);
  }

  checklist(checklistId: string) {
    return new Checklist(this.config, `${this.routePath}/checklist/${checklistId}`);
  }

  checklists(checklistId?: string = '') {
    return new Checklist(this.config, `${this.routePath}/checklists/${checklistId}`);
  }

  checkItem(checkItemId: string) {
    return new CheckItem(this.config, `${this.routePath}/checkItem/${checkItemId}`);
  }

  comments(commentId?: string = '') {
    return new Comment(this.config, `${this.routePath}/actions/${commentId}`);
  }

  labels() {
    return new Label(this.config, `${this.routePath}/labels`);
  }

  list() {
    return new List(this.config, `${this.routePath}/list`);
  }

  members() {
    return new Member(this.config, `${this.routePath}/members`);
  }

  membersVoted(memberId?: string = '') {
    return new Member(this.config, `${this.routePath}/membersVoted`, memberId);
  }

  getPluginData(): Promise<any> {
    return this.httpGet('/pluginData');
  }

  stickers(stickerId?: string = '') {
    return new Sticker(this.config, `${this.routePath}/stickers/${stickerId}`);
  }

  updateCard(
    queryArgs?: {
      name?: string,
      desc?: string,
      closed?: boolean,
      idMembers?: Array<string>,
      idAttachmentCover?: string,
      idList?: string,
      idLabels?: Array<string>,
      idBoard?: string,
      pos?: PositionNumbered,
      due?: ?Date,
      dueComplete?: boolean,
      subscribed?: boolean,
    },
  ): Promise<any> {
    return this.httpPut('/', queryArgs);
  }

  updateClosedStatus(value: boolean): Promise<any> {
    return this.httpPut('/closed', { value });
  }

  updateDescription(value: string): Promise<any> {
    return this.httpPut('/desc', { value });
  }

  updateDueDate(value: ?Date): Promise<any> {
    return this.httpPut('/due', { value });
  }

  updateDueComplete(value: boolean): Promise<any> {
    return this.httpPut('/dueComplete', { value });
  }

  /**
   * Update the Id of the image attachment of this card to use as its cover.
   * @example PUT /1/cards/:cardId/idAttachmentCover
   * @see {@link https://developers.trello.com/advanced-reference/card#put-1-cards-card-id-or-shortlink-idattachmentcover}
   */
  updateAttachmentCoverImage(idAttachmentCover: string): Promise<any> {
    return this.httpPut('/idAttachmentCover', { value: idAttachmentCover });
  }

  moveToBoard(
    boardId: string,
    queryArgs?: {
      idList?: string,
    },
  ): Promise<any> {
    return this.httpPut('/idBoard', { value: boardId, ...queryArgs });
  }

  moveToList(listId: string): Promise<any> {
    return this.httpPut('/idList', { value: listId });
  }

  associateMembers(memberIds: Array<string>): Promise<any> {
    return this.httpPut('/idMembers', { value: memberIds });
  }

  updateName(value: string): Promise<any> {
    return this.httpPut('/name', { value });
  }

  updatePosition(value: PositionNumbered): Promise<any> {
    return this.httpPut('/pos', { value });
  }

  updateSubscribed(value: boolean): Promise<any> {
    return this.httpPut('/subscribed', { value });
  }

  addCard(
    queryArgs: {
      idList: string,
      name?: string,
      desc?: string,
      pos?: PositionNumbered,
      due?: ?Date,
      dueComplete?: boolean,
      idMembers?: Array<string>,
      idLabels?: Array<string>,
      urlSource?: ?string,
      fileSource?: Object,
      idCardSource?: string,
      keepFromSource?: KeepFromSourceField | Array<KeepFromSourceField>,
    } | {
      // These are for adding a card from a List.
      name: string,
      desc?: string,
      labels?: ArgumentGroup<LabelColor>,
      idMembers?: Array<string>,
      due?: ?Date,
    },
  ): Promise<any> {
    return this.httpPost('/', queryArgs);
  }

  associateLabel(labelId: string): Promise<any> {
    return this.httpPost('/idLabels', { value: labelId });
  }

  /* istanbul ignore next: Requires special permissions */
  associateMember(memberId: string): Promise<any> {
    return this.httpPost('/idMembers', { value: memberId });
  }

  markAssociatedNotificationsRead(): Promise<any> {
    return this.httpPost('/markAssociatedNotificationsRead');
  }

  deleteCard(): Promise<any> {
    return this.httpDelete('/');
  }

  dissociateMember(memberId: string): Promise<any> {
    return this.httpDelete(`/idMembers/${memberId}`);
  }

  dissociateLabel(labelId: string): Promise<any> {
    return this.httpDelete(`/idLabels/${labelId}`);
  }
}
