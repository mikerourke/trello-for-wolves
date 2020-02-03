import { BaseResource } from "./BaseResource";
import {
  ActionField,
  AllOrFieldOrListOf,
  CommentRecord,
  FilterDate,
  Format,
  NestedMemberCreatorParams,
  NestedMemberParams,
  NestedReactionsParams,
  TypedFetch,
} from "../typeDefs";

/**
 * Comments are Action records with a "type" of "commentCard". They are the
 * only type of action that can be added, updated, and deleted. They're also
 * only available on a `Card` resource.
 * @see https://developers.trello.com/reference#actionsid
 * @class
 */
export class Comment extends BaseResource {
  public getComment(
    params?: {
      display?: boolean;
      entities?: boolean;
      fields?: AllOrFieldOrListOf<ActionField>;
    } & NestedMemberParams &
      NestedMemberCreatorParams &
      NestedReactionsParams,
  ): TypedFetch<CommentRecord[]> {
    return this.apiGet("/", params);
  }

  public getComments(
    params?: {
      display?: boolean;
      entities?: boolean;
      fields?: AllOrFieldOrListOf<ActionField>;
      format?: Format;
      before?: FilterDate;
      since?: FilterDate;
      idModels?: string;
      limit?: number;
    } & NestedMemberParams &
      NestedMemberCreatorParams &
      NestedReactionsParams,
  ): TypedFetch<CommentRecord[]> {
    return this.apiGet("/", { ...params, filter: "commentCard" });
  }

  public addComment(text: string): TypedFetch<CommentRecord> {
    return this.apiPost("/comments", { text });
  }

  public updateComment(text: string): TypedFetch<CommentRecord> {
    return this.apiPut("/comments", { text });
  }

  public updateText(value: string): TypedFetch<CommentRecord> {
    return this.apiPut("/text", { value });
  }

  public deleteComment(): TypedFetch<unknown> {
    return this.apiDelete("/comments");
  }
}
