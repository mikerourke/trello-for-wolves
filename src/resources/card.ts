import BaseResource from './baseResource';
import Action, { ActionField, ActionFilter } from './action';
import Attachment, { AttachmentFilter, AttachmentField } from './attachment';
import Board, { BoardField } from './board';
import CheckItem, { CheckItemStateField } from './checkItem';
import Checklist, { ChecklistField } from './checklist';
import Comment from './comment';
import Label, { LabelColor } from './label';
import List, { ListField } from './list';
import Member, { MemberField } from './member';
import Sticker, { StickerField } from './sticker';
import {
  AllOrNone,
  ArgumentGroup,
  FilterDate,
  KeepFromSourceField,
  PositionNumbered,
} from '../types';

export type CardAging = 'pirate' | 'regular';

export type CardField =
  | 'badges'
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
  public getCards = (queryArgs?: {
    actions?: ArgumentGroup<ActionFilter>;
    attachments?: AttachmentFilter;
    attachmentFields?: ArgumentGroup<AttachmentField>;
    stickers?: boolean;
    members?: boolean;
    memberFields?: ArgumentGroup<MemberField>;
    checkItemStates?: boolean;
    checklists?: AllOrNone;
    limit?: number;
    since?: FilterDate;
    before?: FilterDate;
    filter?: CardFilter;
    fields?: ArgumentGroup<CardField>;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getCard = (queryArgs?: {
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
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getCardsFilteredBy = (filter: CardFilter): Promise<any> =>
    this.httpGet(`/${filter}`);

  public getFieldValue = (field: CardField): Promise<any> =>
    this.httpGet(`/${field}`);

  public actions = () => new Action(this.config, `${this.routePath}/actions`);

  public attachments = (attachmentId: string = '') =>
    new Attachment(
      this.config,
      `${this.routePath}/attachments/${attachmentId}`,
    );

  public board = () => new Board(this.config, `${this.routePath}/board`);

  public checkItemStates = () =>
    new CheckItem(this.config, `${this.routePath}/checkItemStates`);

  public checklist = (checklistId: string) =>
    new Checklist(this.config, `${this.routePath}/checklist/${checklistId}`);

  public checklists = (checklistId: string = '') =>
    new Checklist(this.config, `${this.routePath}/checklists/${checklistId}`);

  public checkItem = (checkItemId: string) =>
    new CheckItem(this.config, `${this.routePath}/checkItem/${checkItemId}`);

  public comments = (commentId: string = '') =>
    new Comment(this.config, `${this.routePath}/actions/${commentId}`);

  public labels = () => new Label(this.config, `${this.routePath}/labels`);

  public list = () => new List(this.config, `${this.routePath}/list`);

  public members = () => new Member(this.config, `${this.routePath}/members`);

  public membersVoted = (memberId: string = '') =>
    new Member(this.config, `${this.routePath}/membersVoted`, memberId);

  public getPluginData = (): Promise<any> => this.httpGet('/pluginData');

  public stickers = (stickerId: string = '') =>
    new Sticker(this.config, `${this.routePath}/stickers/${stickerId}`);

  public updateCard = (queryArgs?: {
    name?: string;
    desc?: string;
    closed?: boolean;
    idMembers?: Array<string>;
    idAttachmentCover?: string;
    idList?: string;
    idLabels?: Array<string>;
    idBoard?: string;
    pos?: PositionNumbered;
    due?: FilterDate;
    dueComplete?: boolean;
    subscribed?: boolean;
  }): Promise<any> => this.httpPut('/', queryArgs);

  public updateClosedStatus = (value: boolean): Promise<any> =>
    this.httpPut('/closed', { value });

  public updateDescription = (value: string): Promise<any> =>
    this.httpPut('/desc', { value });

  public updateDueDate = (value: Date | null): Promise<any> =>
    this.httpPut('/due', { value });

  public updateDueComplete = (value: boolean): Promise<any> =>
    this.httpPut('/dueComplete', { value });

  public updateAttachmentCoverImage = (
    idAttachmentCover: string,
  ): Promise<any> =>
    this.httpPut('/idAttachmentCover', { value: idAttachmentCover });

  public moveToBoard = (
    boardId: string,
    queryArgs?: {
      idList?: string;
    },
  ): Promise<any> => this.httpPut('/idBoard', { value: boardId, ...queryArgs });

  public moveToList = (listId: string): Promise<any> =>
    this.httpPut('/idList', { value: listId });

  public associateMembers = (memberIds: Array<string>): Promise<any> =>
    this.httpPut('/idMembers', { value: memberIds });

  public updateName = (value: string): Promise<any> =>
    this.httpPut('/name', { value });

  public updatePosition = (value: PositionNumbered): Promise<any> =>
    this.httpPut('/pos', { value });

  public updateSubscribed = (value: boolean): Promise<any> =>
    this.httpPut('/subscribed', { value });

  public addCard = (
    queryArgs:
      | {
          idList: string;
          name?: string;
          desc?: string;
          pos?: PositionNumbered;
          due?: Date | null;
          dueComplete?: boolean;
          idMembers?: Array<string>;
          idLabels?: Array<string>;
          urlSource?: string | null;
          fileSource?: Object;
          idCardSource?: string;
          keepFromSource?: KeepFromSourceField | Array<KeepFromSourceField>;
        }
      | {
          // These are for adding a card from a List.
          name: string;
          desc?: string;
          labels?: ArgumentGroup<LabelColor>;
          idMembers?: Array<string>;
          due?: Date | null;
        },
  ): Promise<any> => this.httpPost('/', { ...queryArgs, separator: '/' });

  public associateLabel = (labelId: string): Promise<any> =>
    this.httpPost('/idLabels', { value: labelId });

  public associateMember = (memberId: string): Promise<any> =>
    this.httpPost('/idMembers', { value: memberId });

  public markAssociatedNotificationsRead = (): Promise<any> =>
    this.httpPost('/markAssociatedNotificationsRead');

  public deleteCard = (): Promise<any> => this.httpDelete('/');

  public dissociateMember = (memberId: string): Promise<any> =>
    this.httpDelete(`/idMembers/${memberId}`);

  public dissociateLabel = (labelId: string): Promise<any> =>
    this.httpDelete(`/idLabels/${labelId}`);
}
