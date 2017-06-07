/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';
import Action from './action';
import Attachment from './attachment';
import Board from './board';
import CheckItem from './check-item';
import Checklist from './checklist';
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
  Auth,
  BoardField,
  CardField,
  CardFilter,
  CheckItemStateField,
  ChecklistField,
  KeepFromSourceField,
  ListField,
  MemberField,
  PositionNumbered,
  ResourceConstructorOptions,
  StickerField,
} from '../types';

export type CardAging = 'pirate' | 'regular';

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

export default class Card extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'card', options);
  }

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

  getFilteredCards(filter: CardFilter): Promise<*> {
    return this.httpGet(`/${filter}`);
  }

  getFieldValue(field: CardField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  // TODO: Check if the ID is needed for Actions in Cards.
  actions(actionId?: string = '') {
    return new Action(this.auth, this.getOptionsForChild(actionId));
  }

  attachments(attachmentId?: string = '') {
    return new Attachment(this.auth, this.getOptionsForChild(attachmentId));
  }

  board(boardId?: string = '') {
    return new Board(this.auth, this.getOptionsForChild(boardId, '/board'));
  }

  checkItemStates() {
    return new CheckItem(
      this.auth, this.getOptionsForChild('', '/checkItemStates'));
  }

  checklist(checklistId: string) {
    return new Checklist(
      this.auth, this.getOptionsForChild(checklistId, '/checklist'));
  }

  checklists() {
    return new Checklist(this.auth, this.getOptionsForChild());
  }

  checkItem(checkItemId: string) {
    return new CheckItem(
      this.auth, this.getOptionsForChild(checkItemId, '/checkItem'));
  }

  // TODO: Check if the ID is needed for Lists in Cards.
  list(listId?: string = '') {
    return new List(
      this.auth, this.getOptionsForChild(listId, '/list'));
  }

  members() {
    return new Member(this.auth, this.getOptionsForChild());
  }

  membersVoted() {
    return new Member(this.auth, this.getOptionsForChild('', '/membersVoted'));
  }

  getPluginData(): Promise<*> {
    return this.httpGet('/pluginData');
  }

  stickers(stickerId?: string = '') {
    return new Sticker(this.auth, this.getOptionsForChild(stickerId));
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

  updateIdAttachmentCover(value: string): Promise<*> {
    return this.httpPut('/idAttachmentCover', { value });
  }

  updateIdBoard(
    queryArgs: {
      value: string,
      idList?: string,
    },
  ): Promise<*> {
    return this.httpPut('/idBoard', queryArgs);
  }

  updateIdList(value: string): Promise<*> {
    return this.httpPut('/idList', { value });
  }

  updateIdMembers(value: Array<string>): Promise<*> {
    return this.httpPut('/idMembers', { value });
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
    },
  ): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  addIdLabel(value: string): Promise<*> {
    return this.httpPost('/idLabels', { value });
  }

  addIdMember(value: string): Promise<*> {
    return this.httpPost('/idMembers', { value });
  }

  markAssociatedNotificationsRead(): Promise<*> {
    return this.httpPost('/markAssociatedNotificationsRead');
  }

  deleteCard(): Promise<*> {
    return this.httpDelete('/');
  }

  deleteIdLabel(idLabel: string): Promise<*> {
    return this.httpDelete(`/idLabels/${idLabel}`);
  }

  deleteIdMember(idMember: string): Promise<*> {
    return this.httpDelete(`/idMembers/${idMember}`);
  }
}
