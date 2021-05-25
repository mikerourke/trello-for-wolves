import {
  AllOrFieldOrListOf,
  AllOrNone,
  CustomEmojiField,
  CustomEmojiRecord,
  FileUpload,
  TypedFetch,
} from "../typeDefs";

import { BaseResource } from "./BaseResource";

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
