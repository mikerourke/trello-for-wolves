import { PositionOrFloat, SavedSearchRecord, TypedFetch } from "../typeDefs";

import { BaseResource } from "./BaseResource";

export class SavedSearch extends BaseResource {
  public getSavedSearch(): TypedFetch<SavedSearchRecord> {
    return this.apiGet("/");
  }

  public getSavedSearches(): TypedFetch<SavedSearchRecord[]> {
    return this.apiGet("/");
  }

  public addSavedSearch(params: {
    name: string;
    pos: PositionOrFloat;
    query: string;
  }): TypedFetch<SavedSearchRecord> {
    return this.apiPost("/", params);
  }

  public updateSavedSearch(params: {
    name?: string;
    pos?: PositionOrFloat;
    query?: string;
  }): TypedFetch<SavedSearchRecord> {
    return this.apiPut("/", params);
  }

  public updateName(value: string): TypedFetch<SavedSearchRecord> {
    return this.apiPut("/name", { value });
  }

  public updatePosition(value: PositionOrFloat): TypedFetch<SavedSearchRecord> {
    return this.apiPut("/pos", { value });
  }

  public updateQuery(value: string): TypedFetch<SavedSearchRecord> {
    return this.apiPut("/query", { value });
  }

  public deleteSavedSearch(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}
