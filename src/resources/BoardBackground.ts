import { BaseResource } from "./BaseResource";
import { AllOfOrListOf, ColorName, FileUpload, TypedFetch } from "../typeDefs";

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
    fields?: AllOfOrListOf<BoardBackgroundField>;
  }): TypedFetch<BoardBackgroundRecord | BoardBackgroundImageRecord> {
    this.validateGetSingle();
    return this.apiGet("/", params);
  }

  public getBoardBackgrounds(params?: {
    filter?: BoardBackgroundFilter;
  }): TypedFetch<BoardBackgroundRecord[] | BoardBackgroundImageRecord[]> {
    return this.apiGet("/", params);
  }

  public uploadBoardBackground(
    file: FileUpload,
  ): TypedFetch<BoardBackgroundRecord | BoardBackgroundImageRecord> {
    return this.apiPost("/", { file });
  }

  public updateBoardBackground(params: {
    brightness?: BoardBackgroundBrightness;
    tile?: boolean;
  }): TypedFetch<BoardBackgroundRecord | BoardBackgroundImageRecord> {
    this.validateUpdate(params);
    return this.apiPut("/", params);
  }

  public deleteBoardBackground(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}
