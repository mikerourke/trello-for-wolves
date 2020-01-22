import { BaseResource } from "./BaseResource";
import { AllOrNone, ArgumentGroup } from "../typeDefs";

export type StickerField =
  | "image"
  | "imageScaled"
  | "imageUrl"
  | "left"
  | "rotate"
  | "top"
  | "zIndex";

export type CustomStickerField = "scaled" | "url";

export class Sticker extends BaseResource {
  public getStickers(
    options?:
      | {
          // Arguments for "/stickers":
          fields?: ArgumentGroup<StickerField>;
        }
      | {
          // Arguments for "/customStickers":
          filter?: AllOrNone;
        },
  ): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public getSticker(
    options?:
      | {
          // Arguments for "/stickers":
          fields?: ArgumentGroup<StickerField>;
        }
      | {
          // Arguments for "/customStickers":
          fields?: ArgumentGroup<CustomStickerField>;
        },
  ): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public updateSticker(options?: {
    top?: number;
    left?: number;
    zIndex?: number;
    rotate?: number;
  }): Promise<unknown> {
    return this.httpPut("/", options);
  }

  public addSticker(options: {
    image: string;
    top: number;
    left: number;
    zIndex: number;
    rotate?: number;
  }): Promise<unknown> {
    return this.httpPost("/", options);
  }

  public uploadSticker(file: File): Promise<unknown> {
    return this.httpPost("/", { file });
  }

  public deleteSticker(): Promise<unknown> {
    return this.httpDelete("/");
  }
}
