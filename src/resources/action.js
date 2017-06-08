/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';
import Board from './board';
import Card from './card';
import List from './list';
import Member from './member';
import Organization from './organization';

/* Types */
import type {
  ArgumentGroup,
  Auth,
  FilterDate,
  Format,
  MemberField,
  ResourceConstructorOptions,
} from '../types';

export type ActionField =
  'data'
  | 'date'
  | 'idMemberCreator'
  | 'type';

// These actions only apply to List resources:
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

export type ActionFilter = ActionListFilter &
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

/**
 * @namespace Action
 */
export default class Action extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'action', options);
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

  getFieldValue(field: ActionField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  board() {
    return new Board(this.auth, this.getOptionsForChild('', '/board'));
  }

  card() {
    return new Card(this.auth, this.getOptionsForChild('', '/card'));
  }

  getDisplay(): Promise<*> {
    return this.httpGet('/display');
  }

  getEntities(): Promise<*> {
    return this.httpGet('/entities');
  }

  list() {
    return new List(this.auth, this.getOptionsForChild('', '/list'));
  }

  member() {
    return new Member(this.auth, this.getOptionsForChild('', '/member'));
  }

  memberCreator() {
    return new Member(this.auth, this.getOptionsForChild('', '/memberCreator'));
  }

  organization() {
    return new Organization(
      this.auth, this.getOptionsForChild('', '/organization'));
  }

  updateAction(
    queryArgs?: {
      text?: string,
    } = {},
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateText(value: string): Promise<*> {
    return this.httpPut('/text', { value });
  }

  deleteAction(): Promise<*> {
    return this.httpDelete('/');
  }
}
