import { BaseResource } from "./BaseResource";

export class Batch extends BaseResource {
  public makeRequests(urls: string[]): Promise<unknown> {
    return this.httpGet("/", { urls });
  }
}
