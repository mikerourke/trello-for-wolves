/* @flow */

/* Internal dependencies */
import { generateTypeMap } from '../utils/type-mapper';
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

export const notificationFieldMap = generateTypeMap(
  'data',
  'date',
  'idMemberCreator',
  'type',
  'unread',
);
export type NotificationField = $Keys<typeof notificationFieldMap>;

export const notificationFilterMap = generateTypeMap(
  'addAdminToBoard',
  'addAdminToOrganization',
  'addedAttachmentToCard',
  'addedMemberToCard',
  'addedToBoard',
  'addedToCard',
  'addedToOrganization',
  'cardDueSoon',
  'changeCard',
  'closeBoard',
  'commentCard',
  'createdCard',
  'declinedInvitationToBoard',
  'declinedInvitationToOrganization',
  'invitedToBoard',
  'invitedToOrganization',
  'makeAdminOfBoard',
  'makeAdminOfOrganization',
  'memberJoinedTrello',
  'mentionedOnCard',
  'removedFromBoard',
  'removedFromCard',
  'removedFromOrganization',
  'removedMemberFromCard',
  'unconfirmedInvitedToBoard',
  'unconfirmedInvitedToOrganization',
  'updateCheckItemStateOnCard',
);
export type NotificationFilter = $Keys<typeof notificationFilterMap>;

export const readFilterMap = generateTypeMap('all', 'read', 'unread');
type ReadFilter = $Keys<typeof readFilterMap>;

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
    },
  ): Promise<any> {
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
    },
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getNotificationsFilteredBy(
    filter: ArgumentGroup<NotificationFilter>,
  ): Promise<any> {
    return this.httpGet('/', { filter });
  }

  getFieldValue(field: NotificationField): Promise<any> {
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

  updateNotification(
    queryArgs?: {
      unread?: boolean,
    },
  ): Promise<any> {
    return this.httpPut('/', queryArgs);
  }

  updateUnreadStatus(value: boolean): Promise<any> {
    return this.httpPut('/unread', { value });
  }

  markAllAsRead(): Promise<any> {
    return this.httpPost('/all/read');
  }
}
