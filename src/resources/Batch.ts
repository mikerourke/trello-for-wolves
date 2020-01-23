import { BaseResource } from "./BaseResource";

export class Batch extends BaseResource {
  public makeRequests(urls: string[]): Promise<unknown> {
    const validUrls = urls.map(url => url.replace(/,/gi, "%2C"));

    return this.apiGet("/", { urls: validUrls });
  }
}
