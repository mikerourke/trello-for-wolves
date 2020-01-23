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
    return this.apiGet("/", params);
  }

  public getPlugin(): Promise<unknown> {
    return this.apiGet("/");
  }

  public getMemberPrivacy(): Promise<unknown> {
    return this.apiGet(`/compliance/memberPrivacy`);
  }

  public addListing(params: PluginListingOptions): Promise<unknown> {
    return this.apiPost("/listing/", {}, params);
  }

  public updatePlugin(): Promise<unknown> {
    return this.apiPut("/");
  }

  public updateListing(
    idListing: string,
    params: PluginListingOptions,
  ): Promise<unknown> {
    return this.apiPut(`/listing/${idListing}`, {}, params);
  }
}
