import { BaseResource } from "./BaseResource";
import { TypedFetch, ValueResponse } from "../typeDefs";

export type WebhookRecord = {
  /** ID of the webhook. */
  id: string;
  /** Description provided when creating webhook. */
  description: string;
  /**
   * ID of the Trello object the webhook is watching. This can be any Trello
   * object ID (list, board, card, member, etc.).
   */
  idModel: string;
  /** The URL that the webhook will POST information to. */
  callbackURL: string;
  /** Determines whether the webhook is active or not. */
  active: boolean;
};

export type WebhookField = "active" | "callbackURL" | "description" | "idModel";

export class Webhook extends BaseResource {
  public getWebhook(): TypedFetch<WebhookRecord> {
    return this.apiGet("/");
  }

  public getWebhooks(): TypedFetch<WebhookRecord[]> {
    return this.apiGet("/");
  }

  public getFieldValue(field: WebhookField): TypedFetch<unknown> {
    return this.apiGet(`/${field}`);
  }

  public addWebhook(params: {
    callbackURL: string;
    idModel: string;
    active?: boolean;
    description?: string;
  }): TypedFetch<WebhookRecord[]> {
    return this.apiPost("/", params);
  }

  public updateWebhook(params?: {
    active?: boolean;
    callbackURL?: string;
    description?: string;
    idModel?: string;
  }): TypedFetch<WebhookRecord[]> {
    return this.apiPut("/", params);
  }

  public deleteWebhook(): TypedFetch<ValueResponse<null>> {
    return this.apiDelete("/");
  }
}
