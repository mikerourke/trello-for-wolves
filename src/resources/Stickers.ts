import { BaseResource } from "./BaseResource";
import {
  AllOrFieldOrListOf,
  CustomStickerRecord,
  DefaultStickerName,
  FileUpload,
  StickerField,
  StickerRecord,
  TypedFetch,
} from "../typeDefs";

export class Sticker extends BaseResource {
  public getSticker(params?: {
    fields?: AllOrFieldOrListOf<StickerField>;
  }): TypedFetch<StickerRecord> {
    return this.apiGet("/", params);
  }

  public getStickers(params?: {
    fields?: AllOrFieldOrListOf<StickerField>;
  }): TypedFetch<StickerRecord[]> {
    return this.apiGet("/", params);
  }

  public addSticker(params: {
    image: DefaultStickerName | string;
    left: number;
    top: number;
    zIndex: number;
    rotate?: number;
  }): TypedFetch<StickerRecord> {
    return this.apiPost("/", params);
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
}

export class CustomSticker extends BaseResource {
  public getCustomSticker(params?: {
    fields?: AllOrFieldOrListOf<StickerField>;
  }): TypedFetch<CustomStickerRecord> {
    return this.apiGet("/", params);
  }

  public getCustomStickers(params?: {
    fields?: AllOrFieldOrListOf<StickerField>;
  }): TypedFetch<CustomStickerRecord[]> {
    return this.apiGet("/", params);
  }

  public uploadCustomSticker(
    file: FileUpload,
  ): TypedFetch<CustomStickerRecord> {
    return this.apiPost("/", { file });
  }

  public deleteCustomSticker(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}
