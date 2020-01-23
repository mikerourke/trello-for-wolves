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
  public getStickers(params?: {
    fields?: ArgumentGroup<StickerField>;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getCustomStickers(params?: { filter?: AllOrNone }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getSticker(params?: {
    fields?: ArgumentGroup<StickerField>;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getCustomSticker(params?: {
    fields?: ArgumentGroup<CustomStickerField>;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public addSticker(params: {
    image: string;
    top: number;
    left: number;
    zIndex: number;
    rotate?: number;
  }): Promise<unknown> {
    return this.apiPost("/", params);
  }

  public uploadSticker(file: File): Promise<unknown> {
    return this.apiPost("/", { file });
  }

  public updateSticker(params?: {
    top?: number;
    left?: number;
    zIndex?: number;
    rotate?: number;
  }): Promise<unknown> {
    return this.apiPut("/", params);
  }

  public deleteSticker(): Promise<unknown> {
    return this.apiDelete("/");
  }
}
