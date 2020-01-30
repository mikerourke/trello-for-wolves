import { BaseResource } from "./BaseResource";
import {
  BoardPermissionLevel,
  BoardRecord,
  GroupPermission,
  Invitation,
} from "./Board";
import { CardAging } from "./Card";
import { TypedFetch } from "../typeDefs";

export class BoardPref extends BaseResource {
  public updateBackground(value: string): TypedFetch<BoardRecord> {
    return this.apiPut("/background", { value });
  }

  public updateCalendarFeedEnabled(value: boolean): TypedFetch<BoardRecord> {
    return this.apiPut("/calendarFeedEnabled", { value });
  }

  public updateCardAging(value: CardAging): TypedFetch<BoardRecord> {
    return this.apiPut("/cardAging", { value });
  }

  public updateCardCovers(value: boolean): TypedFetch<BoardRecord> {
    return this.apiPut("/cardCovers", { value });
  }

  public updateComments(value: GroupPermission): TypedFetch<BoardRecord> {
    return this.apiPut("/comments", { value });
  }

  public updateInvitations(value: Invitation): TypedFetch<BoardRecord> {
    return this.apiPut("/invitations", { value });
  }

  public updatePermissionLevel(
    value: BoardPermissionLevel,
  ): TypedFetch<BoardRecord> {
    return this.apiPut("/permissionLevel", { value });
  }

  public updateSelfJoin(value: boolean): TypedFetch<BoardRecord> {
    return this.apiPut("/selfJoin", { value });
  }

  public updateVoting(value: GroupPermission): TypedFetch<BoardRecord> {
    return this.apiPut("/voting", { value });
  }
}
