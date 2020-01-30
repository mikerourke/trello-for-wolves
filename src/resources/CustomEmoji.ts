import { BaseResource } from "./BaseResource";
import {
  AllOrFieldOrListOf,
  AllOrNone,
  FileUpload,
  TypedFetch,
} from "../typeDefs";

export interface CustomEmojiRecord {
  id: string;
  name: string;
  url: string;
}

export type CustomEmojiField = keyof CustomEmojiRecord;

export class CustomEmoji extends BaseResource {
  public getCustomEmoji(params?: {
    fields?: AllOrFieldOrListOf<CustomEmojiField>;
  }): TypedFetch<CustomEmojiRecord> {
    return this.apiGet("/", params);
  }

  public getCustomEmojis(params?: {
    filter?: AllOrNone;
  }): TypedFetch<CustomEmojiRecord[]> {
    return this.apiGet("/", params);
  }

  public uploadCustomEmoji(params: {
    file: FileUpload;
    name: string;
  }): TypedFetch<CustomEmojiRecord> {
    return this.apiPost("/", params);
  }
}
