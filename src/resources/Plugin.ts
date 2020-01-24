import { BaseResource } from "./BaseResource";
import { TypedFetch } from "../typeDefs";

export type PluginFilter = "enabled" | "available";

export interface PluginListingOptions {
  description: string;
  locale: string;
  overview: string;
  name: string;
}

export class Plugin extends BaseResource {
  public getPlugins(params?: { filter?: PluginFilter }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public getPlugin(): TypedFetch<unknown> {
    return this.apiGet("/");
  }

  public getMemberPrivacy(): TypedFetch<unknown> {
    return this.apiGet(`/compliance/memberPrivacy`);
  }

  public addListing(params: PluginListingOptions): TypedFetch<unknown> {
    return this.apiPost("/listing/", {}, params);
  }

  public updatePlugin(): TypedFetch<unknown> {
    return this.apiPut("/");
  }

  public updateListing(
    idListing: string,
    params: PluginListingOptions,
  ): TypedFetch<unknown> {
    return this.apiPut(`/listing/${idListing}`, {}, params);
  }
}
