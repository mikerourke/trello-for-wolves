import { BaseResource } from "./BaseResource";

export interface ReactionOptions {
  shortName: string;
  skinVariation: string;
  native: string;
  unified: string;
}

export class Reaction extends BaseResource {
  public getEmoji(params?: {
    locale: string;
    spritesheets?: boolean;
  }): Promise<unknown> {
    return this.apiGet("/emoji", params);
  }

  public getReactions(params?: {
    emoji?: boolean;
    member?: boolean;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getReaction(params?: {
    emoji?: boolean;
    member?: boolean;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getReactionsSummary(): Promise<unknown> {
    return this.apiGet("/reactionsSummary");
  }

  public addReaction(params: ReactionOptions): Promise<unknown> {
    return this.apiPost("/", {}, params);
  }

  public deleteReaction(): Promise<unknown> {
    return this.apiDelete("/");
  }
}
