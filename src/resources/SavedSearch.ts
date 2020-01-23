import { BaseResource } from "./BaseResource";
import { PositionNumbered } from "../typeDefs";

export class SavedSearch extends BaseResource {
  public getSavedSearches(): Promise<unknown> {
    return this.apiGet("/");
  }

  public getSavedSearch(): Promise<unknown> {
    return this.apiGet("/");
  }

  public addSavedSearch(params: {
    name: string;
    query: string;
    pos: PositionNumbered;
  }): Promise<unknown> {
    return this.apiPost("/", params);
  }

  public updateSavedSearch(params?: {
    name?: string;
    query?: string;
    pos?: PositionNumbered;
  }): Promise<unknown> {
    return this.apiPut("/", params);
  }

  public updateName(value: string): Promise<unknown> {
    return this.apiPut("/name", { value });
  }

  public updatePosition(value: PositionNumbered): Promise<unknown> {
    return this.apiPut("/pos", { value });
  }

  public updateQuery(value: string): Promise<unknown> {
    return this.apiPut("/query", { value });
  }

  public deleteSavedSearch(): Promise<unknown> {
    return this.apiDelete("/");
  }
}
