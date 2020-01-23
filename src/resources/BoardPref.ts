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
    return this.apiPut("/background", { value });
  }

  public updateCalendarFeedEnabled(value: boolean): Promise<unknown> {
    return this.apiPut("/calendarFeedEnabled", { value });
  }

  public updateCardAging(value: CardAging): Promise<unknown> {
    return this.apiPut("/cardAging", { value });
  }

  public updateCardCovers(value: boolean): Promise<unknown> {
    return this.apiPut("/cardCovers", { value });
  }

  public updateComments(value: GroupPermission): Promise<unknown> {
    return this.apiPut("/comments", { value });
  }

  public updateInvitations(value: Invitation): Promise<unknown> {
    return this.apiPut("/invitations", { value });
  }

  public updatePermissionLevel(value: BoardPermissionLevel): Promise<unknown> {
    return this.apiPut("/permissionLevel", { value });
  }

  public updateSelfJoin(value: boolean): Promise<unknown> {
    return this.apiPut("/selfJoin", { value });
  }

  public updateVoting(value: GroupPermission): Promise<unknown> {
    return this.apiPut("/voting", { value });
  }
}
