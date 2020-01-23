import { BaseResource } from "./BaseResource";
import { Position } from "../typeDefs";

export class BoardMyPref extends BaseResource {
  public getMyPrefs(): Promise<unknown> {
    return this.apiGet("/");
  }

  public updateEmailPosition(value: Position): Promise<unknown> {
    return this.apiPut("/emailPosition", { value });
  }

  /**
   * @example
   * PUT > .../boards/[boardId]/myPrefs/idEmailList?value=[emailListId]&key=...
   * @see https://developers.trello.com/advanced-reference/board#put-1-boards-board-id-myprefs-idemaillist
   */
  public moveToEmailList(emailListId: string): Promise<unknown> {
    return this.apiPut("/idEmailList", { value: emailListId });
  }

  public updateShowListGuide(value: boolean): Promise<unknown> {
    return this.apiPut("/showListGuide", { value });
  }

  public updateShowSidebar(value: boolean): Promise<unknown> {
    return this.apiPut("/showSidebar", { value });
  }

  public updateShowSidebarActivity(value: boolean): Promise<unknown> {
    return this.apiPut("/showSidebarActivity", { value });
  }

  public updateShowSidebarBoardActions(value: boolean): Promise<unknown> {
    return this.apiPut("/showSidebarBoardActions", { value });
  }

  public updateShowSidebarMembers(value: boolean): Promise<unknown> {
    return this.apiPut("/showSidebarMembers", { value });
  }
}
