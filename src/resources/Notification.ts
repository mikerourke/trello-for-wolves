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

export interface NotificationRecord {
  /** The ID of the notification. */
  id: string;
  /** Relevant data regarding the notification. */
  data: unknown;
  /** The datetime the notification was triggered. */
  date: string;
  /** The ID of the member who triggered the notification. */
  idMemberCreator: string;
  /** The type of the notification. */
  type: NotificationType;
  /** Whether the notification hasn't been read yet. */
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

export interface GetNotificationsViaQueryParams {
  notifications?: AllOfOrListOf<NotificationType>;
  notificationsEntities?: boolean;
  notificationsDisplay?: boolean;
  notificationsLimit?: number;
  notificationFields?: AllOfOrListOf<NotificationField>;
  notificationMemberCreator?: boolean;
  notificationMemberCreatorFields?: AllOfOrListOf<MemberField>;
  notificationBefore?: string | null;
  notificationSince?: string | null;
}

export interface GetNotificationsViaUrlParams {
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
}

export type GetNotificationsReturnType<
  TParams,
  TPayload
> = TParams extends GetNotificationsViaUrlParams
  ? NotificationRecord[]
  : TPayload & { notifications: NotificationRecord[] };

export type AnyGetNotificationsParams =
  | GetNotificationsViaQueryParams
  | GetNotificationsViaUrlParams;

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
    return this.apiGet("/", params);
  }

  public getNotifications<
    TPayload extends object,
    TParams extends AnyGetNotificationsParams = {}
  >(
    params?: TParams,
  ): TypedFetch<GetNotificationsReturnType<TParams, TPayload>> {
    return this.apiGet("/", params);
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

  public updateNotification(params?: {
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
