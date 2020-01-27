import { BaseResource } from "./BaseResource";
import {
  AllOfOrListOf,
  AllOrNone,
  FileUpload,
  TypedFetch,
  ValidResourceFields,
} from "../typeDefs";

export interface CustomEmojiRecord {
  id: string;
  name: string;
  url: string;
}

export type CustomEmojiField = ValidResourceFields<CustomEmojiRecord>;

export class CustomEmoji extends BaseResource {
  public getCustomEmoji(params?: {
    fields?: AllOfOrListOf<CustomEmojiField>;
  }): TypedFetch<CustomEmojiRecord> {
    return this.apiGet("/", params);
  }

  public getCustomEmojis(params?: {
    filter?: AllOrNone;
  }): TypedFetch<CustomEmojiRecord[]> {
    return this.apiGet("/", params);
  }

  public uploadCustomEmoji(params: {
    name: string;
    file: FileUpload;
  }): TypedFetch<CustomEmojiRecord> {
    return this.apiPost("/", params);
  }
}