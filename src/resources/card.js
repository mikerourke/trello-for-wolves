/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';
import Action from './action';
import Attachment from './attachment';
import Board from './board';
import CheckItem from './check-item';
import Checklist from './checklist';
import Comment from './comment';
import Label from './label';
import List from './list';
import Member from './member';
import Sticker from './sticker';

/* Types */
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
} from '../types';

export type CardAging = 'pirate' | 'regular'; // eslint-disable-line no-undef

export type CardField =
  'badges'
  | 'checkItemStates'
  | 'closed'
  // The datetime of the last activity on the card. Note: There are activities
  // that update dateLastActivity that do not create a corresponding action.
  // For instance, updating the name field of a checklist item on a card does
  // not create an action but does update the card and board's
  // dateLastActivity value.
  | 'dateLastActivity'
  | 'desc'
  | 'descData'
  | 'due'
  | 'dueComplete'
  | 'email'
  | 'idAttachmentCover'
  | 'idBoard'
  | 'idChecklists'
  | 'idLabels'
  | 'idList'
  | 'idMembers'
  | 'idMembersVoted'
  | 'idShort'
  | 'labels'
  | 'manualCoverAttachment'
  | 'name'
  | 'pos'
  | 'shortLink'
  | 'shortUrl'
  | 'subscribed'
  | 'url';

export type CardFilter = 'all' | 'closed' | 'none' | 'open' | 'visible';

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
    } = {},
  ): Promise<*> {
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
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getCardsFilteredBy(filter: CardFilter): Promise<*> {
    return this.httpGet(`/${filter}`);
  }

  getFieldValue(field: CardField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  actions() {
    return new Action(this.auth, `${this.routePath}/actions`);
  }

  attachments(attachmentId?: string = '') {
    return new Attachment(
      this.auth, `${this.routePath}/attachments/${attachmentId}`);
  }

  board() {
    return new Board(this.auth, `${this.routePath}/board`);
  }

  checkItemStates() {
    return new CheckItem(this.auth, `${this.routePath}/checkItemStates`);
  }

  checklist(checklistId: string) {
    return new Checklist(
      this.auth, `${this.routePath}/checklist/${checklistId}`);
  }

  checklists(checklistId?: string = '') {
    return new Checklist(
      this.auth, `${this.routePath}/checklists/${checklistId}`);
  }

  checkItem(checkItemId: string) {
    return new CheckItem(
      this.auth, `${this.routePath}/checkItem/${checkItemId}`);
  }

  comments(commentId?: string = '') {
    return new Comment(
      this.auth, `${this.routePath}/actions/${commentId}`);
  }

  labels() {
    return new Label(this.auth, `${this.routePath}/labels`);
  }

  list() {
    return new List(this.auth, `${this.routePath}/list`);
  }

  members() {
    return new Member(this.auth, `${this.routePath}/members`);
  }

  membersVoted(memberId?: string = '') {
    return new Member(this.auth, `${this.routePath}/membersVoted`, memberId);
  }

  getPluginData(): Promise<*> {
    return this.httpGet('/pluginData');
  }

  stickers(stickerId?: string = '') {
    return new Sticker(
      this.auth, `${this.routePath}/stickers/${stickerId}`);
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
    } = {},
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateClosedStatus(value: boolean): Promise<*> {
    return this.httpPut('/closed', { value });
  }

  updateDescription(value: string): Promise<*> {
    return this.httpPut('/desc', { value });
  }

  updateDueDate(value: ?Date): Promise<*> {
    return this.httpPut('/due', { value });
  }

  updateDueComplete(value: boolean): Promise<*> {
    return this.httpPut('/dueComplete', { value });
  }

  /**
   * Update the Id of the image attachment of this card to use as its cover.
   * @example PUT /1/cards/:cardId/idAttachmentCover
   * @see {@link https://developers.trello.com/advanced-reference/card#put-1-cards-card-id-or-shortlink-idattachmentcover}
   */
  updateAttachmentCoverImage(idAttachmentCover: string): Promise<*> {
    return this.httpPut('/idAttachmentCover', { value: idAttachmentCover });
  }

  moveToBoard(
    boardId: string,
    queryArgs?: {
      idList?: string,
    } = {},
  ): Promise<*> {
    return this.httpPut('/idBoard', { value: boardId, ...queryArgs });
  }

  moveToList(listId: string): Promise<*> {
    return this.httpPut('/idList', { value: listId });
  }

  associateMembers(memberIds: Array<string>): Promise<*> {
    return this.httpPut('/idMembers', { value: memberIds });
  }

  updateName(value: string): Promise<*> {
    return this.httpPut('/name', { value });
  }

  updatePosition(value: PositionNumbered): Promise<*> {
    return this.httpPut('/pos', { value });
  }

  updateSubscribed(value: boolean): Promise<*> {
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
  ): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  associateLabel(labelId: string): Promise<*> {
    return this.httpPost('/idLabels', { value: labelId });
  }

  associateMember(memberId: string): Promise<*> {
    return this.httpPost('/idMembers', { value: memberId });
  }

  markAssociatedNotificationsRead(): Promise<*> {
    return this.httpPost('/markAssociatedNotificationsRead');
  }

  deleteCard(): Promise<*> {
    return this.httpDelete('/');
  }

  dissociateMember(memberId: string): Promise<*> {
    return this.httpDelete(`/idMembers/${memberId}`);
  }

  dissociateLabel(labelId: string): Promise<*> {
    return this.httpDelete(`/idLabels/${labelId}`);
  }
}
