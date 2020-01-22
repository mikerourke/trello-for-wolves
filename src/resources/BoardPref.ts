import { BaseResource } from "./BaseResource";
import { CardAging } from "./Card";
import { PermissionLevel } from "../typeDefs";

export type BoardPermissionLevel = PermissionLevel | "org";

export type GroupPermission =
  | "disabled"
  | "members"
  | "observers"
  | "org"
  | "public";

export type Invitation = "admins" | "members";

export class BoardPref extends BaseResource {
  public updateBackground(value: string): Promise<unknown> {
    return this.httpPut("/background", { value });
  }

  public updateCalendarFeedEnabled(value: boolean): Promise<unknown> {
    return this.httpPut("/calendarFeedEnabled", { value });
  }

  public updateCardAging(value: CardAging): Promise<unknown> {
    return this.httpPut("/cardAging", { value });
  }

  public updateCardCovers(value: boolean): Promise<unknown> {
    return this.httpPut("/cardCovers", { value });
  }

  public updateComments(value: GroupPermission): Promise<unknown> {
    return this.httpPut("/comments", { value });
  }

  public updateInvitations(value: Invitation): Promise<unknown> {
    return this.httpPut("/invitations", { value });
  }

  public updatePermissionLevel(value: BoardPermissionLevel): Promise<unknown> {
    return this.httpPut("/permissionLevel", { value });
  }

  public updateSelfJoin(value: boolean): Promise<unknown> {
    return this.httpPut("/selfJoin", { value });
  }

  public updateVoting(value: GroupPermission): Promise<unknown> {
    return this.httpPut("/voting", { value });
  }
}
