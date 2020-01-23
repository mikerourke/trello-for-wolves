import { BaseResource } from "./BaseResource";
import { AllOrNone, ArgumentGroup } from "../typeDefs";

export type BoardBackgroundBrightness = "dark" | "light" | "unknown";

export type BoardBackgroundField =
  | "brightness"
  | "fullSizeUrl"
  | "scaled"
  | "tile";

export type BoardBackgroundFilter =
  | "all"
  | "custom"
  | "default"
  | "none"
  | "premium";

/**
 * This class handles both the "boardBackground" and "customBoardBackground"
 * resources.  For "customBoardBackgrounds", the resource path is overridden
 * when an instance is created in the Member class.
 */
export class BoardBackground extends BaseResource {
  public getBoardBackgrounds(params?: {
    filter?: AllOrNone | BoardBackgroundFilter;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getBoardBackground(params?: {
    fields?: ArgumentGroup<BoardBackgroundField>;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public uploadBoardBackground(file: any): Promise<unknown> {
    return this.apiPost("/", { file });
  }

  public updateBoardBackground(params?: {
    brightness?: BoardBackgroundBrightness;
    tile?: boolean;
  }): Promise<unknown> {
    return this.apiPut("/", params);
  }

  public deleteBoardBackground(): Promise<unknown> {
    return this.apiDelete("/");
  }
}
