import { BaseResource } from "./BaseResource";
import { Position, TypedFetch } from "../typeDefs";

export class BoardMyPref extends BaseResource {
  public getMyPrefs(): TypedFetch<unknown> {
    return this.apiGet("/");
  }

  public updateEmailPosition(value: Position): TypedFetch<unknown> {
    return this.apiPut("/emailPosition", { value });
  }

  /**
   * @example
   * PUT > .../boards/[boardId]/myPrefs/idEmailList?value=[emailListId]&key=...
   * @see https://developers.trello.com/advanced-reference/board#put-1-boards-board-id-myprefs-idemaillist
   */
  public moveToEmailList(emailListId: string): TypedFetch<unknown> {
    return this.apiPut("/idEmailList", { value: emailListId });
  }

  public updateShowListGuide(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/showListGuide", { value });
  }

  public updateShowSidebar(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/showSidebar", { value });
  }

  public updateShowSidebarActivity(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/showSidebarActivity", { value });
  }

  public updateShowSidebarBoardActions(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/showSidebarBoardActions", { value });
  }

  public updateShowSidebarMembers(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/showSidebarMembers", { value });
  }
}
