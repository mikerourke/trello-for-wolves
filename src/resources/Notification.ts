import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import { Card } from "./Card";
import { List } from "./List";
import { Member } from "./Member";
import { Organization } from "./Organization";
import {
  AllOrFieldOrListOf,
  DisplayRecord,
  EntityRecord,
  NestedBoardParams,
  NestedCardParams,
  NestedMemberCreatorParams,
  NestedMemberParams,
  NestedOrganizationParams,
  NotificationField,
  NotificationRecord,
  NotificationType,
  ReadFilter,
  TypedFetch,
  ValueResponse,
} from "../typeDefs";

export class Notification extends BaseResource {
  public getNotification(
    params?: {
      display?: boolean;
      entities?: boolean;
      fields?: AllOrFieldOrListOf<NotificationField>;
      list?: boolean;
    } & NestedBoardParams &
      NestedCardParams &
      NestedMemberParams &
      NestedMemberCreatorParams &
      NestedOrganizationParams,
  ): TypedFetch<NotificationRecord> {
    return this.apiGet("/", params as Record<string, unknown>);
  }

  public getNotifications(
    params?: {
      entities?: boolean;
      display?: boolean;
      filter?: AllOrFieldOrListOf<NotificationType>;
      readFilter?: ReadFilter;
      fields?: AllOrFieldOrListOf<NotificationField>;
      limit?: number;
      page?: number;
      before?: string | null;
      since?: string | null;
    } & NestedMemberCreatorParams,
  ): TypedFetch<NotificationRecord[]> {
    return this.apiGet("/", params as Record<string, unknown>);
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
