import BaseResource from './baseResource';
import Board, { BoardField } from './board';
import Card, { CardField } from './card';
import List from './list';
import Member, { MemberField } from './member';
import Organization, { OrganizationField } from './organization';
import { ArgumentGroup } from '../types';

export type NotificationField =
  | 'data'
  | 'date'
  | 'idMemberCreator'
  | 'type'
  | 'unread';

export type NotificationFilter =
  | 'addAdminToBoard'
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
  public getNotifications = (queryArgs?: {
    entities?: boolean;
    display?: boolean;
    filter?: ArgumentGroup<NotificationFilter>;
    readFilter?: ReadFilter;
    fields?: ArgumentGroup<NotificationField>;
    limit?: number;
    page?: number;
    before?: string | null;
    since?: string | null;
    memberCreator?: boolean;
    memberCreatorFields?: ArgumentGroup<MemberField>;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getNotification = (queryArgs?: {
    display?: boolean;
    entities?: boolean;
    fields?: ArgumentGroup<NotificationField>;
    memberCreator?: boolean;
    memberCreatorFields?: ArgumentGroup<MemberField>;
    board?: boolean;
    boardFields?: ArgumentGroup<BoardField>;
    list?: boolean;
    card?: boolean;
    cardFields?: ArgumentGroup<CardField>;
    organization?: boolean;
    organizationFields?: ArgumentGroup<OrganizationField>;
    member?: boolean;
    memberFields?: ArgumentGroup<MemberField>;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getNotificationsFilteredBy = (
    filter: ArgumentGroup<NotificationFilter>,
  ): Promise<any> => this.httpGet('/', { filter });

  public getFieldValue = (field: NotificationField): Promise<any> =>
    this.httpGet(`/${field}`);

  public board = () => new Board(this.config, `${this.routePath}/board`);

  public card = () => new Card(this.config, `${this.routePath}/card`);

  public getDisplay = (): Promise<any> => this.httpGet('/display');

  public getEntities = (): Promise<any> => this.httpGet('/entities');

  public list = () => new List(this.config, `${this.routePath}/list`);

  public member = () => new Member(this.config, `${this.routePath}/member`);

  public memberCreator = () =>
    new Member(this.config, `${this.routePath}/memberCreator`);

  public organization = () =>
    new Organization(this.config, `${this.routePath}/organization`);

  public updateNotification = (queryArgs?: {
    unread?: boolean;
  }): Promise<any> => this.httpPut('/', queryArgs);

  public updateUnreadStatus = (value: boolean): Promise<any> =>
    this.httpPut('/unread', { value });

  public markAllAsRead = (): Promise<any> => this.httpPost('/all/read');
}
