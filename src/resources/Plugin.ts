import { BaseResource } from "./BaseResource";
import { TypedFetch, ValueResponse } from "../typeDefs";

export type PluginFilter = "enabled" | "available";

export interface PluginListingRecord {
  name: string;
  locale: string;
  description: string;
  overview: string;
}

export interface PluginComplianceRecord {
  lastPolled: {
    memberPrivacy: string;
  };
  dateUpdatedStoresPersonalData: string;
  storesPersonalData: boolean;
}

export interface PluginRecord {
  id: string;
  capabilities: string[];
  iframeConnectorUrl: string;
  name: string;
  public: boolean;
  icon: {
    url: string;
  };
  listings: PluginListingRecord[];
  compliance: PluginComplianceRecord;
}

export class Plugin extends BaseResource {
  public getPlugin(): TypedFetch<PluginRecord> {
    this.validateGetSingle();
    return this.apiGet("/");
  }

  public getPlugins(params?: {
    filter?: PluginFilter;
  }): TypedFetch<PluginRecord[]> {
    return this.apiGet("/", params);
  }

  public getMemberPrivacy(): TypedFetch<ValueResponse<string>> {
    return this.apiGet(`/compliance/memberPrivacy`);
  }

  public addListing(
    params: PluginListingRecord,
  ): TypedFetch<PluginListingRecord> {
    return this.apiPost("/listing/", {}, params);
  }

  public updatePlugin(): TypedFetch<PluginRecord> {
    return this.apiPut("/");
  }

  public updateListing(
    idListing: string,
    params: PluginListingRecord,
  ): TypedFetch<PluginListingRecord> {
    return this.apiPut(`/listing/${idListing}`, {}, params);
  }
}
