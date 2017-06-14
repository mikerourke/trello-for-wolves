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
  BoardField,
  CardField,
  MemberField,
  OrganizationField,
} from '../types';

export type NotificationField =
  'data'
  | 'date'
  | 'idMemberCreator'
  | 'type'
  | 'unread';

export type NotificationFilter =
  'addAdminToBoard'
  | 'addAdminToOrganization'
  | 'addedAttachmentToCard'
  | 'addedMemberToCard'
  | 'addedToBoard'
  | 'addedToCard'
  | 'addedToOrganization'
  | 'cardDueSoon'
  | 'changeCard'
  | 'closeBoard'
  | 'commentCard'
  | 'createdCard'
  | 'declinedInvitationToBoard'
  | 'declinedInvitationToOrganization'
  | 'invitedToBoard'
  | 'invitedToOrganization'
  | 'makeAdminOfBoard'
  | 'makeAdminOfOrganization'
  | 'memberJoinedTrello'
  | 'mentionedOnCard'
  | 'removedFromBoard'
  | 'removedFromCard'
  | 'removedFromOrganization'
  | 'removedMemberFromCard'
  | 'unconfirmedInvitedToBoard'
  | 'unconfirmedInvitedToOrganization'
  | 'updateCheckItemStateOnCard';

type ReadFilter = 'all' | 'read' | 'unread';

/**
 * @namespace Notification
 */
export default class Notification extends BaseResource {
  getNotifications(
    queryArgs?: {
      entities?: boolean,
      display?: boolean,
      filter?: ArgumentGroup<NotificationFilter>,
      readFilter?: ReadFilter,
      fields?: ArgumentGroup<NotificationField>,
      limit?: number,
      page?: number,
      before?: ?string,
      since?: ?string,
      memberCreator?: boolean,
      memberCreatorFields?: ArgumentGroup<MemberField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getNotification(
    queryArgs?: {
      display?: boolean,
      entities?: boolean,
      fields?: ArgumentGroup<NotificationField>,
      memberCreator?: boolean,
      memberCreatorFields?: ArgumentGroup<MemberField>,
      board?: boolean,
      boardFields?: ArgumentGroup<BoardField>,
      list?: boolean,
      card?: boolean,
      cardFields?: ArgumentGroup<CardField>,
      organization?: boolean,
      organizationFields?: ArgumentGroup<OrganizationField>,
      member?: boolean,
      memberFields?: ArgumentGroup<MemberField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: NotificationField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  board() {
    return new Board(this.auth, `${this.routePath}/board`);
  }

  card() {
    return new Card(this.auth, `${this.routePath}/card`);
  }

  getDisplay(): Promise<*> {
    return this.httpGet('/display');
  }

  getEntities(): Promise<*> {
    return this.httpGet('/entities');
  }

  list() {
    return new List(this.auth, `${this.routePath}/list`);
  }

  member() {
    return new Member(this.auth, `${this.routePath}/member`);
  }

  memberCreator() {
    return new Member(this.auth, `${this.routePath}/memberCreator`);
  }

  organization() {
    return new Organization(this.auth, `${this.routePath}/organization`);
  }

  updateNotification(
    queryArgs?: {
      unread?: boolean,
    } = {},
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateUnreadStatus(value: boolean): Promise<*> {
    return this.httpPut('/unread', { value });
  }

  markAllAsRead(): Promise<*> {
    return this.httpPost('/all/read');
  }
}
