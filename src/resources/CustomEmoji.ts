import { BaseResource } from "./BaseResource";
import { AllOrNone, ArgumentGroup } from "../typeDefs";

export type CustomEmojiField = "name" | "url";

export class CustomEmoji extends BaseResource {
  public getCustomEmojis(params?: { filter?: AllOrNone }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getCustomEmoji(params?: {
    fields?: ArgumentGroup<CustomEmojiField>;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public uploadCustomEmoji(params: {
    name: string;
    file: any;
  }): Promise<unknown> {
    return this.apiPost("/", params);
  }
}
