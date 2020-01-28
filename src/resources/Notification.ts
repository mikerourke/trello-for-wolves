import { BaseResource } from "./BaseResource";
import { DisplayRecord, EntityRecord } from "./Action";
import { Board, BoardField } from "./Board";
import { Card, CardField } from "./Card";
import { List } from "./List";
import { Member, MemberField, MemberRecord } from "./Member";
import { Organization, OrganizationField } from "./Organization";
import { ReactionRecord } from "./Reaction";
import {
  AllOfOrListOf,
  TypedFetch,
  ValidResourceFields,
  ValueResponse,
} from "../typeDefs";

export type NotificationType =
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

/**
 * @typedef {Object} NotificationRecord
 * @property id The ID of the notification.
 * @property data Relevant data regarding the notification.
 * @property date The datetime the notification was triggered.
 * @property idMemberCreator The ID of the member who triggered the notification.
 * @property type The type of the notification.
 * @property unread Whether the notification hasn't been read yet.
 * @property [memberCreator] Member creator data associated with the notification.
 * @property [dateRead] Date the notification was read.
 * @property [idAction] Action ID associated with the notification.
 * @property [reactions] Reactions data associated with the notification.
 */
export interface NotificationRecord {
  id: string;
  data: unknown;
  date: string;
  idMemberCreator: string;
  type: NotificationType;
  unread: boolean;
  memberCreator?: MemberRecord;
  dateRead?: string;
  idAction?: string | null;
  reactions?: ReactionRecord[];
}

export type NotificationField = Omit<
  ValidResourceFields<NotificationRecord>,
  "dateRead" | "idAction" | "reactions"
>;

export class Notification extends BaseResource {
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
    memberFields?: AllOfOrListOf<MemberField>;
    memberCreator?: boolean;
    memberCreatorFields?: AllOfOrListOf<MemberField>;
    organization?: boolean;
    organizationFields?: AllOfOrListOf<OrganizationField>;
  }): TypedFetch<NotificationRecord> {
    this.validateGetSingle();
    return this.apiGet("/", params);
  }

  public getNotifications(params?: {
    entities?: boolean;
    display?: boolean;
    filter?: AllOfOrListOf<NotificationType>;
    readFilter?: ReadFilter;
    fields?: AllOfOrListOf<NotificationField>;
    limit?: number;
    page?: number;
    before?: string | null;
    since?: string | null;
    memberCreator?: boolean;
    memberCreatorFields?: AllOfOrListOf<MemberField>;
  }): TypedFetch<NotificationRecord[]> {
    return this.apiGet("/", params);
  }

  public getNestedNotifications<TPayload extends object>(params?: {
    notifications?: AllOfOrListOf<NotificationType>;
    notificationsEntities?: boolean;
    notificationsDisplay?: boolean;
    notificationsLimit?: number;
    notificationFields?: AllOfOrListOf<NotificationField>;
    notificationMemberCreator?: boolean;
    notificationMemberCreatorFields?: AllOfOrListOf<MemberField>;
    notificationBefore?: string | null;
    notificationSince?: string | null;
  }): TypedFetch<TPayload & { notifications: NotificationRecord[] }> {
    return this.apiGetNested(params);
  }

  public getNotificationsFilteredBy(
    filter: AllOfOrListOf<NotificationType>,
  ): TypedFetch<NotificationRecord[]> {
    return this.apiGet("/", { filter });
  }

  public getFieldValue<T>(
    field: NotificationField,
  ): TypedFetch<ValueResponse<T>> {
    return this.apiGet(`/${field}`);
  }

  public getDisplay(): TypedFetch<DisplayRecord> {
    return this.apiGet("/display");
  }

  public getEntities(): TypedFetch<EntityRecord[]> {
    return this.apiGet("/entities");
  }

  public updateNotification(params: {
    unread?: boolean;
  }): TypedFetch<NotificationRecord> {
    return this.apiPut("/", params);
  }

  public updateUnreadStatus(value: boolean): TypedFetch<NotificationRecord> {
    return this.apiPut("/unread", { value });
  }

  public markAllAsRead(): TypedFetch<unknown> {
    return this.apiPost("/all/read");
  }

  public board(): Board {
    return new Board(this.config, this.pathElements, "board");
  }

  public card(): Card {
    return new Card(this.config, this.pathElements, "card");
  }

  public list(): List {
    return new List(this.config, this.pathElements, "list");
  }

  public member(): Member {
    return new Member(this.config, this.pathElements, "member");
  }

  public memberCreator(): Member {
    return new Member(this.config, this.pathElements, "memberCreator");
  }

  public organization(): Organization {
    return new Organization(this.config, this.pathElements, "organization");
  }
}
