/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';
import Board from './board';
import Card from './card';
import List from './list';
import Member from './member';
import Organization from './organization';

/* Types */
import type { ArgumentGroup } from '../types';

export type ActionListFilter =
  'commentCard'
  | 'convertToCardFromCheckItem'
  | 'copyCard'
  | 'createCard'
  | 'createList'
  | 'deleteCard'
  | 'emailCard'
  | 'updateCard'
  | 'updateCard:closed'
  | 'updateCard:desc'
  | 'updateCard:idList'
  | 'updateCard:name'
  | 'updateList'
  | 'updateList:closed'
  | 'updateList:name';

export type ActionCommonFilter =
  'addAttachmentToCard'
  | 'addChecklistToCard'
  | 'addMemberToBoard'
  | 'addMemberToCard'
  | 'addMemberToOrganization'
  | 'addToOrganizationBoard'
  | 'copyBoard'
  | 'copyCommentCard'
  | 'createBoard'
  | 'createList'
  | 'createOrganization'
  | 'deleteAttachmentFromCard'
  | 'deleteBoardInvitation'
  | 'deleteOrganizationInvitation'
  | 'disablePowerUp'
  | 'enablePowerUp'
  | 'makeAdminOfBoard'
  | 'makeNormalMemberOfBoard'
  | 'makeNormalMemberOfOrganization'
  | 'makeObserverOfBoard'
  | 'memberJoinedTrello'
  | 'moveCardFromBoard'
  | 'moveCardToBoard'
  | 'moveListFromBoard'
  | 'moveListToBoard'
  | 'removeChecklistFromCard'
  | 'removeFromOrganizationBoard'
  | 'removeMemberFromCard'
  | 'unconfirmedBoardInvitation'
  | 'unconfirmedOrganizationInvitation'
  | 'updateBoard'
  | 'updateCheckItemStateOnCard'
  | 'updateChecklist'
  | 'updateMember'
  | 'updateOrganization';

export type ActionFilter = ActionListFilter & ActionCommonFilter;

export type ActionField =
  'data'
  | 'date'
  | 'idMemberCreator'
  | 'type';

export type ExcludedActionFilter =
  'addAdminToBoard'
  | 'addAdminToOrganization'
  | 'addBoardsPinnedToMember'
  | 'addLabelToCard'
  | 'copyChecklist'
  | 'createBoardInvitation'
  | 'createBoardPreference'
  | 'createCheckItem'
  | 'createChecklist'
  | 'createLabel'
  | 'createOrganizationInvitation'
  | 'deleteCheckItem'
  | 'deleteComment'
  | 'deleteLabel'
  | 'makeAdminOfOrganization'
  | 'removeAdminFromBoard'
  | 'removeAdminFromOrganization'
  | 'removeBoardsPinnedFromMember'
  | 'removeLabelFromCard'
  | 'removeMemberFromBoard'
  | 'removeMemberFromOrganization'
  | 'updateCheckItem'
  | 'updateComment'
  | 'updateLabel'
  | 'voteOnCard';

import type {
  Auth,
  FilterDate,
  Format,
  MemberField,
  ResourceConstructorOptions,
} from '../types';

export default class Action extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'action', options);
  }

  getAction(
    queryArgs?: {
      display?: boolean,
      entities?: boolean,
      fields?: ArgumentGroup<ActionField>,
      member?: boolean,
      memberFields?: ArgumentGroup<MemberField>,
      memberCreator?: boolean,
      memberCreatorFields?: ArgumentGroup<MemberField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getActions(
    queryArgs?: {
      entities?: boolean,
      display?: boolean,
      filter?: ArgumentGroup<ActionFilter>,
      fields?: ArgumentGroup<ActionField>,
      limit?: number,
      format?: Format,
      since?: FilterDate,
      before?: FilterDate,
      page?: number, // Not allowed for Card resources
      idModels?: string,
      member?: boolean,
      memberFields?: ArgumentGroup<MemberField>,
      memberCreator?: boolean,
      memberCreatorFields?: ArgumentGroup<MemberField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: ActionField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  getDisplay(): Promise<*> {
    return this.httpGet('/display');
  }

  getEntities(): Promise<*> {
    return this.httpGet('/entities');
  }

  board() {
    return new Board(this.auth, {
      parentPath: `actions/${this.instanceId}`,
      resourcePath: '/board',
    });
  }

  card() {
    return new Card(this.auth, {
      parentPath: `actions/${this.instanceId}`,
      resourcePath: '/card',
    });
  }

  list() {
    return new List(this.auth, {
      parentPath: `actions/${this.instanceId}`,
      resourcePath: '/list',
    });
  }

  _getMember(resourcePath: string) {
    return new Member(this.auth, {
      parentPath: `actions/${this.instanceId}`,
      resourcePath,
    });
  }

  member() {
    return this._getMember('/member');
  }

  memberCreator() {
    return this._getMember('/memberCreator');
  }

  organization() {
    return new Organization(this.auth, {
      parentPath: `actions/${this.instanceId}`,
      resourcePath: '/organization',
    });
  }

  addComment(text: string): Promise<*> {
    return this.httpPost('/comments', { text });
  }

  updateAction(
    queryArgs?: {
      text?: string,
    } = {},
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateText(value: string) {
    return this.httpPut('/text', { value });
  }

  updateComment(text: string): Promise<*> {
    return this.httpPut('/comments', { text });
  }

  deleteAction() {
    return this.httpDelete('/');
  }

  deleteComment() {
    return this.httpDelete('/comments');
  }
}
