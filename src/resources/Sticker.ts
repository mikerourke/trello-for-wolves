import { BaseResource } from "./BaseResource";
import {
  AllOfOrListOf,
  FileUpload,
  TypedFetch,
  ValidResourceFields,
} from "../typeDefs";

export interface ImageScaledRecord {
  url: string;
  height: number;
  width: number;
  scaled: boolean;
  _id: string;
}

/**
 * The data corresponding to a Sticker associated with a Card.
 * @typedef {Object} StickerRecord
 * @property id The ID of the sticker.
 * @property image The name of the sticker if it is a default sticker or a generated id if it is
 *                 a custom sticker.
 * @property imageScaled An array of scaled versions of the sticker image.
 * @property imageUrl Direct URL to the image.
 * @property left How far to the left of the card the sticker is placed.
 * @property top How far from the top of the card the sticker is placed.
 * @property rotate How much the sticker has been rotated.
 * @property zIndex The ordering for display which tells you which sticker would show on top of
 *                  another.
 */
export interface StickerRecord {
  id: string;
  image: string;
  imageScaled: ImageScaledRecord[];
  imageUrl: string;
  left: number;
  top: number;
  rotate: number;
  zIndex: number;
}

export type StickerField = ValidResourceFields<StickerRecord>;

export class Sticker extends BaseResource {
  public getSticker(params?: {
    fields?: AllOfOrListOf<StickerField>;
  }): TypedFetch<StickerRecord> {
    this.validateGetSingle();
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
  }): TypedFetch<StickerRecord> {
    return this.apiPost("/", params);
  }

  public uploadSticker(file: FileUpload): TypedFetch<unknown> {
    return this.apiPost("/", { file });
  }

  public updateSticker(params: {
    left?: number;
    rotate?: number;
    top?: number;
    zIndex?: number;
  }): TypedFetch<StickerRecord> {
    return this.apiPut("/", params);
  }

  public deleteSticker(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}
