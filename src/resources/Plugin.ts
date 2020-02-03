import { BaseResource } from "./BaseResource";
import {
  PluginCapability,
  PluginFilter,
  PluginListingRecord,
  PluginRecord,
  TypedFetch,
  ValueResponse,
  VendorPluginRecord,
} from "../typeDefs";

export class PluginListing extends BaseResource {
  public addListing(
    params: PluginListingRecord,
  ): TypedFetch<PluginListingRecord> {
    return this.apiPost("/", {}, params);
  }

  public updateListing(params: {
    name?: string;
    locale?: string;
    description?: string;
    overview?: string;
  }): TypedFetch<PluginListingRecord> {
    return this.apiPut("/", {}, params);
  }
}

/**
 * Plugins are how Power-Ups are managed via the API.
 * @see https://developers.trello.com/reference#plugins
 * @class
 */
export class Plugin extends BaseResource {
  public getPlugin(): TypedFetch<PluginRecord> {
    return this.apiGet("/");
  }

  public getPlugins(params?: {
    filter?: PluginFilter;
  }): TypedFetch<PluginRecord[] | VendorPluginRecord[]> {
    return this.apiGet("/", params);
  }

  public getMemberPrivacy(): TypedFetch<ValueResponse<string>> {
    return this.apiGet(`/compliance/memberPrivacy`);
  }

  public updatePlugin(params?: {
    capabilities?: PluginCapability[];
    iframeConnectorUrl?: string;
    name?: string;
    public?: boolean;
    icon: {
      url: string;
    };
    listings?: PluginListingRecord[];
    compliance?: {
      lastPolled?: {
        memberPrivacy?: string;
      };
      dateUpdatedStoresPersonalData?: string;
      storesPersonalData?: boolean;
    };
  }): TypedFetch<PluginRecord> {
    return this.apiPut("/", {}, params);
  }

  public listings(idListing: string = ""): PluginListing {
    return new PluginListing(this.config, this.pathElements, "listings", {
      identifier: idListing,
    });
  }
}
