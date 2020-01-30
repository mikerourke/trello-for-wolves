import { BaseResource } from "./BaseResource";
import { DisplayRecord, EntityRecord } from "./Action";
import { Board, BoardField } from "./Board";
import { Card, CardField } from "./Card";
import { List } from "./List";
import { Member, MemberField, MemberRecord } from "./Member";
import { Organization, OrganizationField } from "./Organization";
import { ReactionRecord } from "./Reaction";
import { AllOrFieldOrListOf, TypedFetch, ValueResponse } from "../typeDefs";

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
 * The data corresponding to a notification. The fields that are present in the
 * record are contingent on the `fields`/`notificationFields` param passed to
 * the method used to retrieve the notification data.
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

export type NotificationField =
  | "id"
  | "data"
  | "date"
  | "idMemberCreator"
  | "type"
  | "unread";

export class Notification extends BaseResource {
  public getNotification(params?: {
    board?: boolean;
    boardFields?: AllOrFieldOrListOf<BoardField>;
    card?: boolean;
    cardFields?: AllOrFieldOrListOf<CardField>;
    display?: boolean;
    entities?: boolean;
    fields?: AllOrFieldOrListOf<NotificationField>;
    list?: boolean;
    member?: boolean;
    memberFields?: AllOrFieldOrListOf<MemberField>;
    memberCreator?: boolean;
    memberCreatorFields?: AllOrFieldOrListOf<MemberField>;
    organization?: boolean;
    organizationFields?: AllOrFieldOrListOf<OrganizationField>;
  }): TypedFetch<NotificationRecord> {
    return this.apiGet("/", params);
  }

  public getNotifications(params?: {
    entities?: boolean;
    display?: boolean;
    filter?: AllOrFieldOrListOf<NotificationType>;
    readFilter?: ReadFilter;
    fields?: AllOrFieldOrListOf<NotificationField>;
    limit?: number;
    page?: number;
    before?: string | null;
    since?: string | null;
    memberCreator?: boolean;
    memberCreatorFields?: AllOrFieldOrListOf<MemberField>;
  }): TypedFetch<NotificationRecord[]> {
    return this.apiGet("/", params);
  }

  public getNestedNotifications<TPayload extends object>(params?: {
    notifications?: AllOrFieldOrListOf<NotificationType>;
    notificationsEntities?: boolean;
    notificationsDisplay?: boolean;
    notificationsLimit?: number;
    notificationFields?: AllOrFieldOrListOf<NotificationField>;
    notificationMemberCreator?: boolean;
    notificationMemberCreatorFields?: AllOrFieldOrListOf<MemberField>;
    notificationBefore?: string | null;
    notificationSince?: string | null;
  }): TypedFetch<TPayload & { notifications: NotificationRecord[] }> {
    return this.apiGetNested(params);
  }

  public getNotificationsFilteredBy(
    filter: AllOrFieldOrListOf<NotificationType>,
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
    return new Board(this.config, this.pathElements, "board", {
      isReturnUrl: this.isReturnUrl,
    });
  }

  public card(): Card {
    return new Card(this.config, this.pathElements, "card", {
      isReturnUrl: this.isReturnUrl,
    });
  }

  public list(): List {
    return new List(this.config, this.pathElements, "list", {
      isReturnUrl: this.isReturnUrl,
    });
  }

  public member(): Member {
    return new Member(this.config, this.pathElements, "member", {
      isReturnUrl: this.isReturnUrl,
    });
  }

  public memberCreator(): Member {
    return new Member(this.config, this.pathElements, "memberCreator", {
      isReturnUrl: this.isReturnUrl,
    });
  }

  public organization(): Organization {
    return new Organization(this.config, this.pathElements, "organization", {
      isReturnUrl: this.isReturnUrl,
    });
  }
}
