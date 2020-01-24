import { BaseResource } from "./BaseResource";
import { AllOfOrListOf, AllOrNone, TypedFetch } from "../typeDefs";

export type CustomEmojiField = "name" | "url";

export class CustomEmoji extends BaseResource {
  public getCustomEmojis(params?: { filter?: AllOrNone }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public getCustomEmoji(params?: {
    fields?: AllOfOrListOf<CustomEmojiField>;
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public uploadCustomEmoji(params: {
    name: string;
    file: Blob | File | FormData;
  }): TypedFetch<unknown> {
    return this.apiPost("/", params);
  }
}
