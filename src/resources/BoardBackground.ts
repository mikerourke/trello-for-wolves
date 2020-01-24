import { BaseResource } from "./BaseResource";
import { AllOfOrListOf, AllOrNone, TypedFetch } from "../typeDefs";

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
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public getBoardBackground(params?: {
    fields?: AllOfOrListOf<BoardBackgroundField>;
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public uploadBoardBackground(
    file: Blob | File | FormData,
  ): TypedFetch<unknown> {
    return this.apiPost("/", { file });
  }

  public updateBoardBackground(params?: {
    brightness?: BoardBackgroundBrightness;
    tile?: boolean;
  }): TypedFetch<unknown> {
    return this.apiPut("/", params);
  }

  public deleteBoardBackground(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}
