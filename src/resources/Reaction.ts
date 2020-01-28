import { BaseResource } from "./BaseResource";
import { AllOfOrListOf, TypedFetch } from "../typeDefs";
import { MemberField, MemberRecord } from "./Member";

export interface EmojiSkinVariationRecord {
  unified: string;
  native: string;
  sheetX: number;
  sheetY: number;
}

export interface ReactionEmojiRecord {
  unified: string;
  native: string;
  name: string;
  skinVariation: string;
  shortName: string;
}

export interface EmojiRecord extends ReactionEmojiRecord {
  shortNames: string[];
  text: string | null;
  texts: string[] | null;
  category: string;
  sheetX: number;
  sheetY: number;
  skinVariations: Record<string, EmojiSkinVariationRecord>;
  tts: string;
  keywords: string[];
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
  }): TypedFetch<Record<string, EmojiRecord[]>> {
    this.validateGetSingle();
    return this.apiGet("/emoji", params);
  }

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

  public getNestedReactions<TPayload extends object>(params?: {
    reactions?: boolean;
    reactionsSummary?: boolean;
    reactionsMember?: boolean;
    reactionsMemberFields?: AllOfOrListOf<MemberField>;
    reactionsEmoji?: boolean;
  }): TypedFetch<TPayload & { reactions: ReactionRecord[] }> {
    return this.apiGetNested(params);
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
