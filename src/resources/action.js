// @flow
import BaseResource from './baseResource';
import Board from './board';
import Card from './card';
import List from './list';
import Member from './member';
import Organization from './organization';
import type { ArgumentGroup, FilterDate, Format, MemberField } from '../types';

export type ActionField = 'data' | 'date' | 'idMemberCreator' | 'type';

// These actions only apply to List resources:
export type ActionListFilter =
  | 'commentCard'
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

export type ActionFilter =
  | ActionListFilter
  | 'addAttachmentToCard'
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
  getActions(queryArgs?: {
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
  }): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getAction(queryArgs?: {
    display?: boolean,
    entities?: boolean,
    fields?: ArgumentGroup<ActionField>,
    member?: boolean,
    memberFields?: ArgumentGroup<MemberField>,
    memberCreator?: boolean,
    memberCreatorFields?: ArgumentGroup<MemberField>,
  }): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: ActionField): Promise<any> {
    return this.httpGet(`/${field}`);
  }

  board() {
    return new Board(this.config, `${this.routePath}/board`);
  }

  card() {
    return new Card(this.config, `${this.routePath}/card`);
  }

  getDisplay(): Promise<any> {
    return this.httpGet('/display');
  }

  getEntities(): Promise<any> {
    return this.httpGet('/entities');
  }

  list() {
    return new List(this.config, `${this.routePath}/list`);
  }

  member() {
    return new Member(this.config, `${this.routePath}/member`);
  }

  memberCreator() {
    return new Member(this.config, `${this.routePath}/memberCreator`);
  }

  organization() {
    return new Organization(this.config, `${this.routePath}/organization`);
  }

  updateAction(queryArgs?: { text?: string }): Promise<any> {
    return this.httpPut('/', queryArgs);
  }

  updateText(value: string): Promise<any> {
    return this.httpPut('/text', { value });
  }

  deleteAction(): Promise<any> {
    return this.httpDelete('/');
  }
}
