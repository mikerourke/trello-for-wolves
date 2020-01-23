import { BaseResource } from "./BaseResource";
import { ActionField } from "./Action";
import { MemberField } from "./Member";
import { ArgumentGroup, FilterDate, Format } from "../typeDefs";

export class Comment extends BaseResource {
  /**
   * This is the same as calling ...cards('cardId').actions().getActions({ filter: 'commentCard' }).
   * It's just a nice shortcut if you only need Comment actions.
   */
  public getComments(params?: {
    entities?: boolean;
    display?: boolean;
    fields?: ArgumentGroup<ActionField>;
    limit?: number;
    format?: Format;
    since?: FilterDate;
    before?: FilterDate;
    idModels?: string;
    member?: boolean;
    memberFields?: ArgumentGroup<MemberField>;
    memberCreator?: boolean;
    memberCreatorFields?: ArgumentGroup<MemberField>;
  }): Promise<unknown> {
    return this.apiGet("/", { ...params, filter: "commentCard" });
  }

  public addComment(text: string): Promise<unknown> {
    return this.apiPost("/comments", { text });
  }

  public updateComment(text: string): Promise<unknown> {
    return this.apiPut("/comments", { text });
  }

  public deleteComment(): Promise<unknown> {
    return this.apiDelete("/comments");
  }
}
