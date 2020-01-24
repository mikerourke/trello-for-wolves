import { BaseResource } from "./BaseResource";
import { TypedFetch } from "../typeDefs";

export class Batch extends BaseResource {
  public makeRequests(urls: string[]): TypedFetch<unknown> {
    const validUrls = urls.map(url => url.replace(/,/gi, "%2C"));

    return this.apiGet("/", { urls: validUrls });
  }
}
