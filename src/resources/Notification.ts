import { BaseResource } from "./BaseResource";
import { Board, BoardField } from "./Board";
import { Card, CardField } from "./Card";
import { List } from "./List";
import { Member, MemberField } from "./Member";
import { Organization, OrganizationField } from "./Organization";
import { ArgumentGroup } from "../typeDefs";

export type NotificationField =
  | "data"
  | "date"
  | "idMemberCreator"
  | "type"
  | "unread";

export type NotificationFilter =
  | "addAdminToBoard"
  | "addAdminToOrganization"
  | "addedAttachmentToCard"
  | "addedMemberToCard"
  | "addedToBoard"
  | "addedToCard"
  | "addedToOrganization"
  | "cardDueSoon"
  | "changeCard"
  | "closeBoard"
  | "commentCard"
  | "createdCard"
  | "declinedInvitationToBoard"
  | "declinedInvitationToOrganization"
  | "invitedToBoard"
  | "invitedToOrganization"
  | "makeAdminOfBoard"
  | "makeAdminOfOrganization"
  | "memberJoinedTrello"
  | "mentionedOnCard"
  | "removedFromBoard"
  | "removedFromCard"
  | "removedFromOrganization"
  | "removedMemberFromCard"
  | "unconfirmedInvitedToBoard"
  | "unconfirmedInvitedToOrganization"
  | "updateCheckItemStateOnCard";

export type ReadFilter = "all" | "read" | "unread";

export class Notification extends BaseResource {
  public getNotifications(params?: {
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
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getNotification(params?: {
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
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getNotificationsFilteredBy(
    filter: ArgumentGroup<NotificationFilter>,
  ): Promise<unknown> {
    return this.apiGet("/", { filter });
  }

  public getFieldValue(field: NotificationField): Promise<unknown> {
    return this.apiGet(`/${field}`);
  }

  public board(): Board {
    return new Board(this.config, `${this.baseEndpoint}/board`);
  }

  public card(): Card {
    return new Card(this.config, `${this.baseEndpoint}/card`);
  }

  public getDisplay(): Promise<unknown> {
    return this.apiGet("/display");
  }

  public getEntities(): Promise<unknown> {
    return this.apiGet("/entities");
  }

  public list(): List {
    return new List(this.config, `${this.baseEndpoint}/list`);
  }

  public member(): Member {
    return new Member(this.config, `${this.baseEndpoint}/member`);
  }

  public memberCreator(): Member {
    return new Member(this.config, `${this.baseEndpoint}/memberCreator`);
  }

  public organization(): Organization {
    return new Organization(this.config, `${this.baseEndpoint}/organization`);
  }

  public updateNotification(params?: { unread?: boolean }): Promise<unknown> {
    return this.apiPut("/", params);
  }

  public updateUnreadStatus(value: boolean): Promise<unknown> {
    return this.apiPut("/unread", { value });
  }

  public markAllAsRead(): Promise<unknown> {
    return this.apiPost("/all/read");
  }
}
