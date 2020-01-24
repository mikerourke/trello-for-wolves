import { BaseResource } from "./BaseResource";
import { TypedFetch } from "../typeDefs";

export interface ReactionOptions {
  shortName: string;
  skinVariation: string;
  native: string;
  unified: string;
}

export interface CommentReactionRecord {
  status: string;
  disableAt: number;
  warnAt: number;
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

  public addReaction(params: ReactionOptions): TypedFetch<unknown> {
    return this.apiPost("/", {}, params);
  }

  public deleteReaction(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}
