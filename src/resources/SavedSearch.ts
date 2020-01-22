import { BaseResource } from "./BaseResource";
import { PositionNumbered } from "../typeDefs";

export class SavedSearch extends BaseResource {
  public getSavedSearches(): Promise<unknown> {
    return this.httpGet("/");
  }

  public getSavedSearch(): Promise<unknown> {
    return this.httpGet("/");
  }

  public updateSavedSearch(options?: {
    name?: string;
    query?: string;
    pos?: PositionNumbered;
  }): Promise<unknown> {
    return this.httpPut("/", options);
  }

  public updateName(value: string): Promise<unknown> {
    return this.httpPut("/name", { value });
  }

  public updatePosition(value: PositionNumbered): Promise<unknown> {
    return this.httpPut("/pos", { value });
  }

  public updateQuery(value: string): Promise<unknown> {
    return this.httpPut("/query", { value });
  }

  public addSavedSearch(options: {
    name: string;
    query: string;
    pos: PositionNumbered;
  }): Promise<unknown> {
    return this.httpPost("/", options);
  }

  public deleteSavedSearch(): Promise<unknown> {
    return this.httpDelete("/");
  }
}
