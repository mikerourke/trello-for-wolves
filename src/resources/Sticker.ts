import { BaseResource } from "./BaseResource";
import { AllOfOrListOf, TypedFetch } from "../typeDefs";

export type ImageScaledRecord = {
  _id: string;
  url: string;
  scaled: boolean;
  width: number;
  height: number;
};

export type StickerRecord = {
  /** The ID of the sticker. */
  id: string;
  /**
   * The name of the sticker if it is a default sticker or a generated id if it
   * is a custom sticker. See section below for the names of the default stickers.
   */
  image: string;
  /** An array of scaled versions of the sticker image. */
  imageScaled: ImageScaledRecord[];
  /** Direct URL to the image. */
  imageUrl: string;
  /** How far to the left of the card the sticker is placed. */
  left: number;
  /** How far from the top of the card the sticker is placed. */
  top: number;
  /** How much the sticker has been rotated. */
  rotate: number;
  /**
   * The ordering for display which tells you which sticker would show on top
   * of another.
   */
  zIndex: number;
};

export type StickerField = Omit<keyof StickerRecord, "id">;

export class Sticker extends BaseResource {
  public getSticker(params?: {
    fields?: AllOfOrListOf<StickerField>;
  }): TypedFetch<StickerRecord> {
    return this.apiGet("/", params);
  }

  public getStickers(params?: {
    fields?: AllOfOrListOf<StickerField>;
  }): TypedFetch<StickerRecord[]> {
    return this.apiGet("/", params);
  }

  public addSticker(params: {
    image: string;
    left: number;
    top: number;
    zIndex: number;
    rotate?: number;
  }): TypedFetch<unknown> {
    return this.apiPost("/", params);
  }

  public uploadSticker(file: Blob | File | FormData): TypedFetch<unknown> {
    return this.apiPost("/", { file });
  }

  public updateSticker(params?: {
    left?: number;
    rotate?: number;
    top?: number;
    zIndex?: number;
  }): TypedFetch<unknown> {
    return this.apiPut("/", params);
  }

  public deleteSticker(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}
