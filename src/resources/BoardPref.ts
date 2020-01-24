import { BaseResource } from "./BaseResource";
import { CardAging } from "./Card";
import { PermissionLevel, TypedFetch } from "../typeDefs";

export type BoardPermissionLevel = PermissionLevel | "org";

export type GroupPermission =
  | "disabled"
  | "members"
  | "observers"
  | "org"
  | "public";

export type Invitation = "admins" | "members";

export class BoardPref extends BaseResource {
  public updateBackground(value: string): TypedFetch<unknown> {
    return this.apiPut("/background", { value });
  }

  public updateCalendarFeedEnabled(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/calendarFeedEnabled", { value });
  }

  public updateCardAging(value: CardAging): TypedFetch<unknown> {
    return this.apiPut("/cardAging", { value });
  }

  public updateCardCovers(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/cardCovers", { value });
  }

  public updateComments(value: GroupPermission): TypedFetch<unknown> {
    return this.apiPut("/comments", { value });
  }

  public updateInvitations(value: Invitation): TypedFetch<unknown> {
    return this.apiPut("/invitations", { value });
  }

  public updatePermissionLevel(
    value: BoardPermissionLevel,
  ): TypedFetch<unknown> {
    return this.apiPut("/permissionLevel", { value });
  }

  public updateSelfJoin(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/selfJoin", { value });
  }

  public updateVoting(value: GroupPermission): TypedFetch<unknown> {
    return this.apiPut("/voting", { value });
  }
}
