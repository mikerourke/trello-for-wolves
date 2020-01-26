import { BaseResource } from "./BaseResource";
import { TypedFetch } from "../typeDefs";
import { MemberRecord } from "./Member";

export interface EmojiRecord {
  unified: string;
  native: string;
  name: string;
  skinVariation: string;
  shortName: string;
}

export interface ReactionRecord {
  id: string;
  idMember: string;
  idModel: string;
  idEmoji: string;
  member?: MemberRecord;
  emoji?: EmojiRecord;
}

export class Reaction extends BaseResource {
  public getEmoji(params?: {
    locale: string;
    spritesheets?: boolean;
  }): TypedFetch<unknown> {
    return this.apiGet("/emoji", params);
  }

  public getReactions(params?: {
    emoji?: boolean;
    member?: boolean;
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public getReaction(params?: {
    emoji?: boolean;
    member?: boolean;
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public getReactionsSummary(): TypedFetch<unknown> {
    return this.apiGet("/reactionsSummary");
  }

  public addReaction(params: EmojiRecord): TypedFetch<unknown> {
    return this.apiPost("/", {}, params);
  }

  public deleteReaction(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}
