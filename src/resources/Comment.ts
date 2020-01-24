import { BaseResource } from "./BaseResource";
import { ActionField } from "./Action";
import { MemberField } from "./Member";
import { AllOfOrListOf, FilterDate, Format, TypedFetch } from "../typeDefs";

export class Comment extends BaseResource {
  /**
   * This is the same as calling ...cards('cardId').actions().getActions({ filter: 'commentCard' }).
   * It's just a nice shortcut if you only need Comment actions.
   */
  public getComments(params?: {
    before?: FilterDate;
    display?: boolean;
    entities?: boolean;
    fields?: AllOfOrListOf<ActionField>;
    format?: Format;
    idModels?: string;
    limit?: number;
    member?: boolean;
    memberCreator?: boolean;
    memberCreatorFields?: AllOfOrListOf<MemberField>;
    memberFields?: AllOfOrListOf<MemberField>;
    since?: FilterDate;
  }): TypedFetch<unknown> {
    return this.apiGet("/", { ...params, filter: "commentCard" });
  }

  public addComment(text: string): TypedFetch<unknown> {
    return this.apiPost("/comments", { text });
  }

  public updateComment(text: string): TypedFetch<unknown> {
    return this.apiPut("/comments", { text });
  }

  public deleteComment(): TypedFetch<unknown> {
    return this.apiDelete("/comments");
  }
}
