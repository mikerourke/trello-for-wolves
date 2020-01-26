import { BaseResource } from "./BaseResource";
import { ActionField } from "./Action";
import { MemberCreatorRecord, MemberInvitedField } from "./Member";
import {
  AllOfOrListOf,
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
  card: {
    id: string;
    name: string;
    idShort: number;
    shortLink: string;
  };
  board: {
    id: string;
    name: string;
    shortLink: string;
  };
  list: {
    id: string;
    name: string;
  };
  type: string;
  date: string;
  limits: Limits;
  memberCreator?: MemberCreatorRecord;
}

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
    memberCreatorFields?: AllOfOrListOf<MemberInvitedField>;
    memberFields?: AllOfOrListOf<MemberInvitedField>;
    since?: FilterDate;
  }): TypedFetch<CommentRecord[]> {
    return this.apiGet("/", { ...params, filter: "commentCard" });
  }

  public addComment(text: string): TypedFetch<CommentRecord> {
    return this.apiPost("/comments", { text });
  }

  public updateComment(text: string): TypedFetch<CommentRecord> {
    return this.apiPut("/comments", { text });
  }

  public deleteComment(): TypedFetch<unknown> {
    return this.apiDelete("/comments");
  }
}
