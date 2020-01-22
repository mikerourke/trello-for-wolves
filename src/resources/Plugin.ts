import { BaseResource } from "./BaseResource";

export type PluginFilter = "enabled" | "available";

export interface PluginListingOptions {
  description: string;
  locale: string;
  overview: string;
  name: string;
}

export class Plugin extends BaseResource {
  public getPlugins(params?: { filter?: PluginFilter }): Promise<unknown> {
    return this.httpGet("/", params);
  }

  public getPlugin(): Promise<unknown> {
    return this.httpGet("/");
  }

  public getMemberPrivacy(): Promise<unknown> {
    return this.httpGet(`/compliance/memberPrivacy`);
  }

  public addListing(params: PluginListingOptions): Promise<unknown> {
    return this.httpPost("/listing/", {}, params);
  }

  public updatePlugin(): Promise<unknown> {
    return this.httpPut("/");
  }

  public updateListing(
    idListing: string,
    params: PluginListingOptions,
  ): Promise<unknown> {
    return this.httpPut(`/listing/${idListing}`, {}, params);
  }
}
