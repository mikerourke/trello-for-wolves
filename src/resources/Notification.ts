import { BaseResource } from "./BaseResource";
import { Board, BoardField } from "./Board";
import { Card, CardField } from "./Card";
import { List } from "./List";
import { Member, MemberField } from "./Member";
import { Organization, OrganizationField } from "./Organization";
import { AllOfOrListOf, TypedFetch } from "../typeDefs";

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
    before?: string | null;
    display?: boolean;
    entities?: boolean;
    fields?: AllOfOrListOf<NotificationField>;
    filter?: AllOfOrListOf<NotificationFilter>;
    limit?: number;
    memberCreator?: boolean;
    memberCreatorFields?: AllOfOrListOf<MemberField>;
    page?: number;
    readFilter?: ReadFilter;
    since?: string | null;
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public getNotification(params?: {
    board?: boolean;
    boardFields?: AllOfOrListOf<BoardField>;
    card?: boolean;
    cardFields?: AllOfOrListOf<CardField>;
    display?: boolean;
    entities?: boolean;
    fields?: AllOfOrListOf<NotificationField>;
    list?: boolean;
    member?: boolean;
    memberCreator?: boolean;
    memberCreatorFields?: AllOfOrListOf<MemberField>;
    memberFields?: AllOfOrListOf<MemberField>;
    organization?: boolean;
    organizationFields?: AllOfOrListOf<OrganizationField>;
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public getNotificationsFilteredBy(
    filter: AllOfOrListOf<NotificationFilter>,
  ): TypedFetch<unknown> {
    return this.apiGet("/", { filter });
  }

  public getFieldValue(field: NotificationField): TypedFetch<unknown> {
    return this.apiGet(`/${field}`);
  }

  public getDisplay(): TypedFetch<unknown> {
    return this.apiGet("/display");
  }

  public getEntities(): TypedFetch<unknown> {
    return this.apiGet("/entities");
  }

  public updateNotification(params?: {
    unread?: boolean;
  }): TypedFetch<unknown> {
    return this.apiPut("/", params);
  }

  public updateUnreadStatus(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/unread", { value });
  }

  public markAllAsRead(): TypedFetch<unknown> {
    return this.apiPost("/all/read");
  }

  public board(): Board {
    return new Board(this.config, `${this.baseEndpoint}/board`);
  }

  public card(): Card {
    return new Card(this.config, `${this.baseEndpoint}/card`);
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
}
