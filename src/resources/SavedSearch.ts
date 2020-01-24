import { BaseResource } from "./BaseResource";
import { PositionNumbered, TypedFetch } from "../typeDefs";

export class SavedSearch extends BaseResource {
  public getSavedSearches(): TypedFetch<unknown> {
    return this.apiGet("/");
  }

  public getSavedSearch(): TypedFetch<unknown> {
    return this.apiGet("/");
  }

  public addSavedSearch(params: {
    name: string;
    pos: PositionNumbered;
    query: string;
  }): TypedFetch<unknown> {
    return this.apiPost("/", params);
  }

  public updateSavedSearch(params?: {
    name?: string;
    pos?: PositionNumbered;
    query?: string;
  }): TypedFetch<unknown> {
    return this.apiPut("/", params);
  }

  public updateName(value: string): TypedFetch<unknown> {
    return this.apiPut("/name", { value });
  }

  public updatePosition(value: PositionNumbered): TypedFetch<unknown> {
    return this.apiPut("/pos", { value });
  }

  public updateQuery(value: string): TypedFetch<unknown> {
    return this.apiPut("/query", { value });
  }

  public deleteSavedSearch(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}
