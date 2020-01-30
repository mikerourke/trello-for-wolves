import { BaseResource } from "./BaseResource";
import {
  AllOrFieldOrListOf,
  ColorName,
  FileUpload,
  TypedFetch,
} from "../typeDefs";

export type BoardBackgroundBrightness = "dark" | "light" | "unknown";

export type BoardBackgroundType = "custom" | "default" | "premium";

export type BoardBackgroundFilter = BoardBackgroundType | "all" | "none";

/**
 * The data corresponding to a board background. The fields that are present in
 * the record are contingent on the `fields` param passed to the method used to
 * retrieve the board background data.
 * @typedef {Object} BoardBackgroundRecord
 * @property id The ID of the board background.
 * @property brightness The brightness value for the text/other elements.
 * @property color Color of the board background.
 * @property tile Whether the background should be tiled.
 * @property type Type of board background.
 */
export interface BoardBackgroundRecord {
  id: string;
  brightness: BoardBackgroundBrightness;
  color: ColorName;
  tile: boolean;
  type: BoardBackgroundType;
}

export interface BoardBackgroundImageScaledRecord {
  id: string;
  _id: string;
  scaled: boolean;
  url: string;
  bytes: number;
  height: number;
  width: number;
}

export interface BoardBackgroundImageRecord
  extends Omit<BoardBackgroundRecord, "color"> {
  bottomColor: string | null;
  topColor: string | null;
  fullSizeUrl: string;
  scaled: BoardBackgroundImageScaledRecord[];
}

export type CustomBoardBackgroundRecord = BoardBackgroundImageRecord;

export type AnyBoardBackgroundRecord =
  | BoardBackgroundRecord
  | CustomBoardBackgroundRecord;

export type BoardBackgroundField =
  | "brightness"
  | "fullSizeUrl"
  | "scaled"
  | "tile";

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

  public uploadCustomBoardBackground(
    file: FileUpload,
  ): TypedFetch<CustomBoardBackgroundRecord> {
    return this.apiPost("/", { file });
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
