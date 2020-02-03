import { BaseResource } from "./BaseResource";
import { BoardMyPrefsRecord, EmailPosition, TypedFetch } from "../typeDefs";

export class BoardMyPrefs extends BaseResource {
  public getMyPrefs(): TypedFetch<BoardMyPrefsRecord> {
    return this.apiGet("/");
  }

  public updateEmailPosition(
    value: EmailPosition,
  ): TypedFetch<BoardMyPrefsRecord> {
    return this.apiPut("/emailPosition", { value });
  }

  public moveToEmailList(value: string): TypedFetch<BoardMyPrefsRecord> {
    return this.apiPut("/idEmailList", { value });
  }

  public updateShowListGuide(value: boolean): TypedFetch<BoardMyPrefsRecord> {
    return this.apiPut("/showListGuide", { value });
  }

  public updateShowSidebar(value: boolean): TypedFetch<BoardMyPrefsRecord> {
    return this.apiPut("/showSidebar", { value });
  }

  public updateShowSidebarActivity(
    value: boolean,
  ): TypedFetch<BoardMyPrefsRecord> {
    return this.apiPut("/showSidebarActivity", { value });
  }

  public updateShowSidebarBoardActions(
    value: boolean,
  ): TypedFetch<BoardMyPrefsRecord> {
    return this.apiPut("/showSidebarBoardActions", { value });
  }

  public updateShowSidebarMembers(
    value: boolean,
  ): TypedFetch<BoardMyPrefsRecord> {
    return this.apiPut("/showSidebarMembers", { value });
  }
}
