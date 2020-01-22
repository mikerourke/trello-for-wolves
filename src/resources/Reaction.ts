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
    return this.httpGet("/emoji", params);
  }

  public getReactions(params?: {
    member?: boolean;
    emoji?: boolean;
  }): Promise<unknown> {
    return this.httpGet("/", params);
  }

  public getReaction(params?: {
    member?: boolean;
    emoji?: boolean;
  }): Promise<unknown> {
    return this.httpGet("/", params);
  }

  public getReactionsSummary(): Promise<unknown> {
    return this.httpGet("/reactionsSummary");
  }

  public addReaction(params: ReactionOptions): Promise<unknown> {
    return this.httpPost("/", params);
  }

  public deleteReaction(): Promise<unknown> {
    return this.httpDelete("/");
  }
}
