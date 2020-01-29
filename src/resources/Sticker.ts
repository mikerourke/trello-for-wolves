import { BaseResource } from "./BaseResource";
import {
  AllOfOrListOf,
  FileUpload,
  TypedFetch,
  ValidResourceFields,
} from "../typeDefs";

export interface StickerScaledRecord {
  _id: string;
  url: string;
  height: number;
  width: number;
  scaled: boolean;
}

/**
 * The data corresponding to a Sticker associated with a Card.
 * @typedef {Object} StickerRecord
 * @property id The ID of the sticker.
 * @property image The name of the sticker if it is a default sticker or a
 *                 generated id if it is a custom sticker.
 * @property imageScaled An array of scaled versions of the sticker image.
 * @property imageUrl Direct URL to the image.
 * @property left How far to the left of the card the sticker is placed.
 * @property top How far from the top of the card the sticker is placed.
 * @property rotate How much the sticker has been rotated.
 * @property zIndex The ordering for display which tells you which sticker would
 *                  show on top of another.
 */
export interface StickerRecord {
  id: string;
  image: string;
  imageScaled: StickerScaledRecord[];
  imageUrl: string;
  left: number;
  top: number;
  rotate: number;
  zIndex: number;
}

export interface CustomStickerRecord {
  id: string;
  url: string;
  scaled: StickerScaledRecord[];
}

export type StickerField = ValidResourceFields<StickerRecord>;

export type AnyStickerRecord = StickerRecord & CustomStickerRecord;

/**
 * This class handles both the "stickers" and "customStickers" resources.
 * Stickers are associated with cards while custom stickers are associated
 * with a member.
 * @class
 */
export class Sticker extends BaseResource {
  public getSticker(params?: {
    fields?: AllOfOrListOf<StickerField>;
  }): TypedFetch<AnyStickerRecord> {
    return this.apiGet("/", params);
  }

  public getStickers(params?: {
    fields?: AllOfOrListOf<StickerField>;
  }): TypedFetch<AnyStickerRecord[]> {
    return this.apiGet("/", params);
  }

  public getNestedStickers<TPayload extends object>(params?: {
    stickers?: AllOfOrListOf<StickerField>;
  }): TypedFetch<TPayload & { stickers: AnyStickerRecord[] }> {
    return this.apiGetNested(params);
  }

  public addSticker(params: {
    image: string;
    left: number;
    top: number;
    zIndex: number;
    rotate?: number;
  }): TypedFetch<AnyStickerRecord> {
    return this.apiPost("/", params);
  }

  public uploadCustomSticker(
    file: FileUpload,
  ): TypedFetch<CustomStickerRecord> {
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

  public removeSticker(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }

  public deleteCustomSticker(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}
