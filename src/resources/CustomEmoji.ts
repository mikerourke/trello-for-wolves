import { BaseResource } from "./BaseResource";
import { AllOrNone, ArgumentGroup } from "../typeDefs";

export type CustomEmojiField = "name" | "url";

export class CustomEmoji extends BaseResource {
  public getCustomEmojis(options?: { filter?: AllOrNone }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public getCustomEmoji(options?: {
    fields?: ArgumentGroup<CustomEmojiField>;
  }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public uploadCustomEmoji(options: {
    name: string;
    file: any;
  }): Promise<unknown> {
    return this.httpPost("/", options);
  }
}
