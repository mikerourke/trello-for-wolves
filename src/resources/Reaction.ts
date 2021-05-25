import { EmojiRecord, ReactionRecord, TypedFetch } from "../typeDefs";

import { BaseResource } from "./BaseResource";

export class Emoji extends BaseResource {
  public getEmoji(params?: {
    locale: string;
    spritesheets?: boolean;
  }): TypedFetch<Record<string, EmojiRecord[]>> {
    return this.apiGet("/", params);
  }
}

/**
 * Reactions give users the option to add an emoji to an action.
 * @see https://developers.trello.com/reference#reactions
 * @class
 */
export class Reaction extends BaseResource {
  public getReaction(params?: {
    member?: boolean;
    emoji?: boolean;
  }): TypedFetch<ReactionRecord> {
    return this.apiGet("/", params);
  }

  public getReactions(params?: {
    member?: boolean;
    emoji?: boolean;
  }): TypedFetch<ReactionRecord[]> {
    return this.apiGet("/", params);
  }

  public addReaction(params: {
    shortName?: string;
    skinVariation?: string;
    native?: string;
    unified?: string;
  }): TypedFetch<ReactionRecord> {
    return this.apiPost("/", {}, params);
  }

  public deleteReaction(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}
