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
  public getBoardBackgrounds(
    options?:
      | {
      // boardBackgrounds:
      filter?: BoardBackgroundFilter;
    }
      | {
      // customBoardBackgrounds:
      filter?: AllOrNone;
    },
  ): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public getBoardBackground(options?: {
    fields?: ArgumentGroup<BoardBackgroundField>;
  }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public updateBoardBackground(options?: {
    tile?: boolean;
    brightness?: BoardBackgroundBrightness;
  }): Promise<unknown> {
    return this.httpPut("/", options);
  }

  public uploadBoardBackground(file: any): Promise<unknown> {
    return this.httpPost("/", { file });
  }

  public deleteBoardBackground(): Promise<unknown> {
    return this.httpDelete("/");
  }
}
