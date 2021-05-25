import {
  AllOrFieldOrListOf,
  AnyBoardBackgroundRecord,
  BoardBackgroundBrightness,
  BoardBackgroundField,
  BoardBackgroundFilter,
  CustomBoardBackgroundRecord,
  FileUpload,
  TypedFetch,
} from "../typeDefs";

import { BaseResource } from "./BaseResource";

/**
 * This class handles both the "boardBackground" and "customBoardBackground"
 * resources.  For "customBoardBackgrounds", the resource path is overridden
 * when an instance is created in the Member class.
 * @class
 */
export class BoardBackground extends BaseResource {
  public getBoardBackground(params?: {
    fields?: AllOrFieldOrListOf<BoardBackgroundField>;
  }): TypedFetch<AnyBoardBackgroundRecord> {
    return this.apiGet("/", params);
  }

  public getBoardBackgrounds(params?: {
    filter?: BoardBackgroundFilter;
  }): TypedFetch<AnyBoardBackgroundRecord[]> {
    return this.apiGet("/", params);
  }

  public uploadBoardBackground(
    file: FileUpload,
  ): TypedFetch<CustomBoardBackgroundRecord> {
    return this.apiPost("/", { file });
  }

  public updateBoardBackground(params: {
    brightness?: BoardBackgroundBrightness;
    tile?: boolean;
  }): TypedFetch<CustomBoardBackgroundRecord> {
    return this.apiPut("/", params);
  }

  public deleteBoardBackground(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}

export class CustomBoardBackground extends BaseResource {
  public getCustomBoardBackground(params?: {
    fields?: AllOrFieldOrListOf<BoardBackgroundField>;
  }): TypedFetch<CustomBoardBackgroundRecord> {
    return this.apiGet("/", params);
  }

  public getCustomBoardBackgrounds(): TypedFetch<
    CustomBoardBackgroundRecord[]
  > {
    return this.apiGet("/");
  }

  public uploadCustomBoardBackground(params: {
    file: FileUpload;
    name: string;
  }): TypedFetch<CustomBoardBackgroundRecord> {
    return this.apiPost("/", params);
  }

  public updateCustomBoardBackground(params: {
    brightness?: BoardBackgroundBrightness;
    tile?: boolean;
  }): TypedFetch<CustomBoardBackgroundRecord> {
    return this.apiPut("/", params);
  }

  public deleteCustomBoardBackground(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}
