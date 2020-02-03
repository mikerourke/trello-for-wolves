import { BaseResource } from "./BaseResource";
import { TypedFetch } from "../typeDefs";

/**
 * The batch endpoint allows you to make multiple GET requests to the Trello
 * API in a single request. By batching GET requests together, you can reduce
 * the volume of calls you are making to the API and more easily stay within
 * your API rate limit. The batch endpoint can not be called recursively;
 * requests containing the batch url will be ignored.
 * @class
 */
export class Batch extends BaseResource {
  public makeRequests(urls: string[]): TypedFetch<unknown> {
    const validUrls = urls.map(url => url.replace(/,/gi, "%2C"));
    const urlString = validUrls.join(",");

    return this.apiGet("/", { urls: urlString });
  }
}
