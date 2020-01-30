import { BaseResource } from "./BaseResource";
import { ActionField, EntityRecord } from "./Action";
import { MemberCreatorRecord, MemberInvitedField } from "./Member";
import {
  AllOrFieldOrListOf,
  FilterDate,
  Format,
  Limits,
  TypedFetch,
} from "../typeDefs";

export interface CommentRecord {
  id: string;
  idMemberCreator: string;
  data: {
    text: string;
    textData?: {
      emoji?: Record<string, string>;
    };
  };
  card: EntityRecord;
  board: EntityRecord;
  list: EntityRecord;
  type: string;
  date: string | null;
  memberCreator?: MemberCreatorRecord;
  limits?: Limits;
}

/**
 * Comments are Action records with a "type" of "commentCard". They are the
 * only type of action that can be added, updated, and deleted. They're also
 * only available on a `Card` resource.
 * @see https://developers.trello.com/reference#actionsid
 * @class
 */
export class Comment extends BaseResource {
  public getComment(params?: {
    display?: boolean;
    entities?: boolean;
    fields?: AllOrFieldOrListOf<ActionField>;
    member?: boolean;
    memberFields?: AllOrFieldOrListOf<MemberInvitedField>;
    memberCreator?: boolean;
    memberCreatorFields?: AllOrFieldOrListOf<MemberInvitedField>;
  }): TypedFetch<CommentRecord[]> {
    return this.apiGet("/", { ...params, filter: "commentCard" });
  }

  public getComments(params?: {
    display?: boolean;
    entities?: boolean;
    fields?: AllOrFieldOrListOf<ActionField>;
    format?: Format;
    before?: FilterDate;
    since?: FilterDate;
    idModels?: string;
    limit?: number;
    member?: boolean;
    memberFields?: AllOrFieldOrListOf<MemberInvitedField>;
    memberCreator?: boolean;
    memberCreatorFields?: AllOrFieldOrListOf<MemberInvitedField>;
  }): TypedFetch<CommentRecord[]> {
    return this.apiGet("/", { ...params, filter: "commentCard" });
  }

  public addComment(text: string): TypedFetch<CommentRecord> {
    return this.apiPost("/", { text });
  }

  public updateComment(text: string): TypedFetch<CommentRecord> {
    return this.apiPut("/", { text });
  }

  public updateText(value: string): TypedFetch<CommentRecord> {
    return this.apiPut("/text", { value });
  }

  public deleteComment(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}
