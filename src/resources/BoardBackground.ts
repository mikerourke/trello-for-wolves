import { BaseResource } from "./BaseResource";
import { AllOfOrListOf, AllOrNone, FileUpload, TypedFetch } from "../typeDefs";

export type BoardBackgroundBrightness = "dark" | "light" | "unknown";

export type BoardBackgroundFilter =
  | "all"
  | "custom"
  | "default"
  | "none"
  | "premium";

export interface BoardBackgroundScaledRecord {
  id?: string;
  _id?: string;
  bytes: number;
  height: number;
  scaled: boolean;
  url: string;
  width: number;
}

export interface BoardBackgroundRecord {
  id: string;
  brightness: BoardBackgroundBrightness;
  color: string;
  tile: boolean;
  type: string;
}

export interface CustomBoardBackgroundRecord
  extends Omit<BoardBackgroundRecord, "color"> {
  bottomColor: string | null;
  topColor: string | null;
  fullSizeUrl: string;
  scaled: BoardBackgroundScaledRecord[];
}

export type AnyBoardBackgroundRecord = BoardBackgroundRecord &
  CustomBoardBackgroundRecord;

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
    fields?: AllOfOrListOf<BoardBackgroundField | CustomBoardBackgroundRecord>;
  }): TypedFetch<AnyBoardBackgroundRecord> {
    return this.apiGet("/", params);
  }

  public getBoardBackgrounds(params?: {
    filter?: AllOrNone | BoardBackgroundFilter;
  }): TypedFetch<AnyBoardBackgroundRecord[]> {
    return this.apiGet("/", params);
  }

  public uploadBoardBackground(
    file: FileUpload,
  ): TypedFetch<AnyBoardBackgroundRecord> {
    return this.apiPost("/", { file });
  }

  public updateBoardBackground(params?: {
    brightness?: BoardBackgroundBrightness;
    tile?: boolean;
  }): TypedFetch<AnyBoardBackgroundRecord> {
    return this.apiPut("/", params);
  }

  public deleteBoardBackground(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}
