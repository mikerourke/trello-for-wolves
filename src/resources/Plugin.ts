import { BaseResource } from "./BaseResource";
import { TypedFetch, ValueResponse } from "../typeDefs";

export type PluginFilter = "enabled" | "available";

export type PluginCapability =
  | "attachment-sections"
  | "attachment-thumbnail"
  | "authorization-status"
  | "board-buttons"
  | "card-back-section"
  | "card-badges"
  | "card-buttons"
  | "card-detail-badges"
  | "card-from-url"
  | "format-url"
  | "list-actions"
  | "list-sorters"
  | "on-enable"
  | "on-disable"
  | "remove-data"
  | "show-authorization"
  | "show-settings";

/**
 * Listings are what users see when they view your Power-Up in the Power-Up directory.
 * @property name Display name of the plugin.
 * @property locale Associated locale for the plugin.
 * @property description This will be shown to your user when they view more information
 *                       about your Power-Up in the directory. Your description should include
 *                       what the Power-Up does, links to more information, and images of the
 *                       Power-Up in action.
 * @property overview A short description to intro your Power-Up and its features. This will
 *                    be shown when users search for Power-ups and when we need a short
 *                    one-liner about your Power-Up.
 */
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

/**
 * The plugin object is used to represent Power-Ups in Trello's API.
 * @property id The ID of the plugin.
 * @property capabilities Actions the plugin is allowed to perform.
 * @property iframeConnectorUrl The URL for the iframe connector that will be loaded when the Power-Up is enabled.
 * @property name Display name of the plugin.
 * @property public Indicates if the plugin is publicly available.
 * @property listings
 * @property compliance
 */
export interface PluginRecord {
  id: string;
  capabilities: PluginCapability[];
  iframeConnectorUrl: string;
  name: string;
  public: boolean;
  icon: {
    url: string;
  };
  listings: PluginListingRecord[];
  compliance: PluginComplianceRecord;
}

export interface VendorPluginRecord extends Omit<PluginRecord, "listings"> {
  idOrganizationOwner?: string;
  author?: string;
  categories?: string[];
  privacyUrl?: string;
  moderatedState?: string | null;
  supportEmail?: string;
  url?: string;
  tags?: string[];
  heroImageUrl?: {
    _id: string;
    "@2x": string;
    "12x": string;
  };
  isCompliantWithPrivacyStandards?: string | null;
  usageBrackets?: Record<string, number>;
  claimedDomains?: string[];
  listing?: PluginListingRecord;
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

  public getNestedPlugins<TPayload extends object>(params?: {
    plugins?: PluginFilter;
  }): TypedFetch<
    TPayload & { plugins: PluginRecord[] | VendorPluginRecord[] }
  > {
    return this.apiGetNested(params);
  }

  public getMemberPrivacy(): TypedFetch<ValueResponse<string>> {
    return this.apiGet(`/compliance/memberPrivacy`);
  }

  public addListing(
    params: PluginListingRecord,
  ): TypedFetch<PluginListingRecord> {
    return this.apiPost("/listing", {}, params);
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
